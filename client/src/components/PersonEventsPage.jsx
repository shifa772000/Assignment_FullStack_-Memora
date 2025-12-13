import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, CardBody, Button, Table, Spinner } from "reactstrap";
import { fetchEventsByPersonThunk } from "../slices/eventsSlice";
import { fetchPeopleThunk } from "../slices/peopleSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const colors = {
  pageBg: "#b896cc",
  cardBg: "#e9d7f3",
  title: "#3b1e5b",
  textDark: "#3b1e5b",
  textMuted: "#6e5278",
  purpleBtn: "#4b1f74",
};

export default function PersonEventsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get("personId");

  const { list: eventsList, loading: eventsLoading } = useSelector(
    (state) => state.events
  );
  const { list: peopleList, loading: peopleLoading } = useSelector(
    (state) => state.people
  );

  const currentPerson = peopleList.find((p) => p._id === personId);

  // Fetch people first
  useEffect(() => {
    if (!peopleList.length) dispatch(fetchPeopleThunk());
  }, [dispatch, peopleList.length]);

  // Fetch events for this person
  useEffect(() => {
    if (personId) dispatch(fetchEventsByPersonThunk(personId));
  }, [dispatch, personId]);

  const handleAddEvent = () => {
    navigate(`/event/new?personId=${personId}`);
  };

  const handleEdit = (eventId) => {
    navigate(`/event/${eventId}?personId=${personId}`);
  };

  const handleDelete = (eventId) => {
    alert("Delete functionality not implemented yet.");
  };

  if (!currentPerson || peopleLoading) {
    return (
      <div
        style={{
          backgroundColor: colors.pageBg,
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Spinner color="primary" style={{ display: "block", margin: "auto" }} />
        <p className="text-center mt-3" style={{ color: colors.textMuted }}>
          Loading person...
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.pageBg, minHeight: "100vh" }}>
      <Navbar />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ color: colors.title }}>{currentPerson.name}</h2>
            <small style={{ color: colors.textMuted }}>
              {currentPerson.relation} | {eventsList.length} Events
            </small>
          </div>
          <Button
            style={{
              backgroundColor: colors.purpleBtn,
              border: "none",
              borderRadius: 30,
              padding: "8px 20px",
            }}
            onClick={handleAddEvent}
          >
            + Add New Event
          </Button>
        </div>

        <Card
          style={{
            backgroundColor: colors.cardBg,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <CardBody>
            {eventsLoading ? (
              <div className="text-center my-3">
                <Spinner color="primary" />
              </div>
            ) : (
              <Table borderless responsive>
                <thead>
                  <tr style={{ color: colors.textDark }}>
                    <th>Event Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsList.map((event) => (
                    <tr key={event._id} style={{ color: colors.textDark }}>
                      <td>{event.name || event.type}</td>
                      <td>{event.type}</td>
                      <td>{event.date}</td>
                      <td>{event.status || "Pending"}</td>
                      <td>
                        <Button
                          color="link"
                          onClick={() => handleEdit(event._id)}
                          style={{ padding: "0 5px", color: colors.title }}
                        >
                          ✏️
                        </Button>
                        <Button
                          color="link"
                          onClick={() => handleDelete(event._id)}
                          style={{ padding: "0 5px", color: "#e0343f" }}
                        >
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, CardBody, Button, Table, Spinner, Alert } from "reactstrap";
import { fetchEventsByPersonThunk } from "../slices/eventsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { fetchPeopleThunk } from "../slices/peopleSlice";
//import EventForm from "./EventForm";

const colors = {
  pageBg: "#b896cc",
  cardBg: "#e9d7f3",
  title: "#3b1e5b",
  textDark: "#3b1e5b",
  textMuted: "#6e5278",
  purpleBtn: "#4b1f74",
  tableHeader: "#4b1f74",
};

export default function EventDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get("personId");

  const { list: eventsList, loading: eventsLoading } = useSelector((state) => state.events);
  const { list: peopleList } = useSelector((state) => state.people);
  const currentPerson = peopleList.find((p) => p._id === personId);


  useEffect(() => {
    if (personId) {
      dispatch(fetchEventsByPersonThunk(personId));
    }
  }, [dispatch, personId]);

  useEffect(() => {
    if (!peopleList || peopleList.length === 0) {
      dispatch(fetchPeopleThunk());
    }
  }, [dispatch, peopleList]);

  
  return (
    <div style={{ backgroundColor: colors.pageBg, minHeight: "100vh" }}>
      <Navbar />
      <Container className="py-5">
        {!currentPerson ? (
          <Alert color="warning" className="text-center">
            Person not found.
          </Alert>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
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
                onClick={() => navigate(`/event-details?personId=${personId}`)}
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
                ) : eventsList.length === 0 ? (
                  <div className="text-center py-4" style={{ color: colors.textMuted }}>
                    No events found for this person.
                  </div>
                ) : (
                  <Table borderless responsive className="mb-0">
                    <thead>
                      <tr style={{ color: colors.tableHeader }}>
                        <th>Event Name</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventsList.map((event, idx) => (
                        <tr key={idx} style={{ color: colors.textDark }}>
                          <td>{event.eventName || event.type}</td>
                          <td>{event.type}</td>
                          <td>{event.date}</td>
                          <td>{event.status || "Pending"}</td>
                          <td>
                            <Button
                              color="link"
                              onClick={() => alert("Edit not implemented yet")}
                              style={{ padding: "0 5px", color: colors.title }}
                            >
                              ✏️
                            </Button>
                            <Button
                              color="link"
                              onClick={() => alert("Delete not implemented yet")}
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
          </>
        )}
      </Container>
    </div>
  );
}

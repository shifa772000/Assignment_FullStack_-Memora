
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { saveEventThunk, setCurrentEvent } from "../slices/eventsSlice";

export default function EventForm() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // نقرأ personId من الرابط: /event/new?personId=xxxx
  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get("personId");

  const { currentEvent } = useSelector((state) => state.events);

  // نبحث عن الشخص حسب الـ _id
  const person = useSelector((state) =>
    state.people.list.find((p) => String(p._id) === String(personId))
  );

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    location: "",
    notes: "",
  });

  // عند فتح الصفحة
  useEffect(() => {
    if (eventId === "new") {
      dispatch(setCurrentEvent(null));
    }
  }, [eventId, dispatch]);

  // إذا كنا نعدّل Event موجود مسبقًا
  useEffect(() => {
    if (currentEvent) {
      setFormData({
        name: currentEvent.name || "",
        type: currentEvent.type || "",
        date: currentEvent.date || "",
        location: currentEvent.location || "",
        notes: currentEvent.notes || "",
      });
    }
  }, [currentEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // حفظ الحدث
  const handleSave = async (e) => {
    e.preventDefault();
    if (!personId) return;

    // الحدث يذهب للـ backend بصيغة:
    const eventData = {
      type: formData.type || formData.name, // fallback
      date: formData.date,
      location: formData.location,
      note: formData.notes,
    };

    try {
      await dispatch(saveEventThunk({ personId, eventData })).unwrap();
      navigate(`/eventDetailsPage?personId=${personId}`);
    } catch (err) {
      console.log("Error saving event:", err);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <h2>Events</h2>
        <p className="text-muted mb-0">
          {person?.name}{" "}
          {person?.relation && <span>| {person.relation}</span>}
        </p>
      </Row>

      <Row className="justify-content-center">
        <Col md="8">
          <Form onSubmit={handleSave} className="bg-light p-4 rounded-4">
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Event Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alaa's Birthday"
                    required
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Event Type</Label>
                  <Input
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Birthday, Graduation..."
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Home, Restaurant..."
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>Notes / Details</Label>
              <Input
                type="textarea"
                rows="3"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="She likes flowers and books..."
              />
            </FormGroup>

            <div className="d-flex justify-content-end gap-2">
              <Button type="button" color="secondary" outline onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

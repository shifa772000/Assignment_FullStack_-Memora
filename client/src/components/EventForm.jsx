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
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import {
  saveEventThunk,
  setCurrentEvent,
  deleteEventThunk,
} from "../slices/eventsSlice";

// ================== ألوان التصميم ==================
const memoraColors = {
  pageBg: "#B69BCF",
  cardBg: "#F7F0FF",
  title: "#4C1B6F",
  textMuted: "#8A7A9A",
  primaryBtn: "#4C1B6F",
  inputBg: "#FFFFFF",
  inputBorder: "#D0C2DE",
  giftBtnBg: "#E0F7FA",
  giftBtnText: "#2F6FD8",
  deleteBtnRed: "#D72638",
};

// ================== أنواع الأحداث ==================
const EVENT_TYPES = [
  "Birthday",
  "Graduation",
  "Anniversary",
  "Marriage",
  "Other",
];

// ================== تنسيق التاريخ ==================
function formatInputDate(dateStr) {
  if (!dateStr) return "";
  return dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
}

export default function EventForm() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get("personId");

  const { loading: eventLoading } = useSelector((state) => state.events);
  const { currentEvent } = useSelector((state) => state.events || {});
  const peopleList = useSelector((state) => state.people.list || []);

  // ================== الشخص ==================
  const person = peopleList.find((p) => p._id === personId);

  // ================== حالة الفورم ==================
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    location: "",
    notes: "",
  });

  const isEditMode = eventId && eventId !== "new";

  // ================== إعادة تعيين عند الإضافة ==================
  useEffect(() => {
    if (!isEditMode) {
      dispatch(setCurrentEvent(null));
      setFormData({
        name: "",
        type: "",
        date: "",
        location: "",
        notes: "",
      });
    }
  }, [isEditMode, dispatch]);

  // ================== تعبئة البيانات عند التعديل ==================
  useEffect(() => {
    if (currentEvent) {
      setFormData({
        name: currentEvent.name || "",
        type: currentEvent.type || "",
        date: formatInputDate(currentEvent.date),
        location: currentEvent.location || "",
        notes: currentEvent.note || "",
      });
    }
  }, [currentEvent]);

  // ================== التغيير ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================== الحفظ ==================
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("SAVE CLICKED");

    const eventData = {
      name: formData.name,
      type: formData.type,
      date: formData.date,
      location: formData.location,
      note: formData.notes,
      icon: "🎉",
    };

    const payload = isEditMode
      ? { personId, eventId, eventData }
      : { personId, eventData };

    try {
      const result = await dispatch(saveEventThunk(payload)).unwrap();
      console.log("RESULT FROM API:", result);

      navigate(`/eventDetailsPage?personId=${personId}`);
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Save failed ❌");
    }
  };



// ================== الحذف ==================
const handleDelete = async () => {
  if (!isEditMode) return;
  if (!window.confirm("Are you sure you want to delete this event?")) return;

  try {
    await dispatch(deleteEventThunk({ personId, eventId })).unwrap();
    navigate(`/eventDetailsPage?personId=${personId}`);
  } catch (err) {
    console.error("Error deleting event:", err);
  }
};

const handleCancel = () => navigate(-1);




// ================== تحميل الشخص ==================
if (!person) {
  return (
    <div
      style={{ backgroundColor: memoraColors.pageBg, minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner />
    </div>
  );
}

// ================== العرض ==================
return (
  <div
    style={{
      backgroundColor: memoraColors.pageBg,
      minHeight: "100vh",
      paddingTop: "50px",
    }}
  >
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <h2
            className="text-center mb-5 fw-bold"
            style={{ color: memoraColors.title }}
          >
            {isEditMode ? "Edit Event" : "Add New Event"}
          </h2>

          <Card
            className="shadow-lg"
            style={{
              borderRadius: 20,
              backgroundColor: memoraColors.cardBg,
            }}
          >
            <CardBody className="p-5">
              <div className="mb-4 pb-3 border-bottom">
                <h4
                  className="fw-bold mb-0"
                  style={{ color: memoraColors.title }}
                >
                  {person.name}
                </h4>
                <small style={{ color: memoraColors.textMuted }}>
                  {person.relation}
                </small>
              </div>

              <Form onSubmit={handleSave}>
                <Row className="g-3">
                  <Col md="6">
                    <FormGroup>
                      <Label>Event Name</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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

                <Row className="g-3 mt-1">
                  <Col md="6">
                    <FormGroup>
                      <Label>Event Type</Label>
                      <Input
                        type="select"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="">Select type...</option>
                        {EVENT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label>Location</Label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mt-3">
                  <Label>Notes</Label>
                  <Input
                    type="textarea"
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </FormGroup>

                <div className="d-flex justify-content-between mt-4">
                  {isEditMode && (
                    <Button
                      type="button"
                      onClick={handleDelete}
                      outline
                      color="danger"
                    >
                      Delete
                    </Button>
                  )}

                  <Button type="button" onClick={handleCancel} outline>
                    Cancel
                  </Button>

                  <Button type="submit" color="primary" disabled={eventLoading}>
                    {eventLoading ? <Spinner size="sm" /> : "Save"}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);
}

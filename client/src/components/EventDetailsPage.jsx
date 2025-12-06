import Navbar from "./Navbar";
import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
  Alert,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEventsByPersonThunk,
  saveEventThunk,
} from "../slices/eventsSlice";
import { fetchPeopleThunk } from "../slices/peopleSlice";

const colors = {
  pageBg: "#b896cc",
  cardBg: "#e9d7f3",
  title: "#5a2a86",
  textDark: "#4b275f",
  textMuted: "#8b739a",
  inputBg: "#f9f0ff",
  purpleBtn: "#4b1f74",
  cancelBtnBg: "#f5edf9",
  cancelBorder: "#c9b2de",
  deleteBorder: "#f3a3ac",
  deleteText: "#e0343f",
  giftBorder: "#1b8cff",
  giftText: "#1b8cff",
};

function EventDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // قراءة personId و eventIndex من الـ URL
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const personId = searchParams.get("personId");
  const eventIndex = searchParams.get("eventIndex");

  // بيانات من Redux
  const { list: peopleList } = useSelector((state) => state.people);
  const {
    list: eventsList,
    loading: eventsLoading,
    msg: eventsMsg,
  } = useSelector((state) => state.events);

  // جلب الأشخاص مرة واحدة (إذا القائمة فارغة)
  useEffect(() => {
    if (peopleList.length === 0) {
      dispatch(fetchPeopleThunk());
    }
  }, [dispatch, peopleList.length]);

  // جلب أحداث الشخص
  useEffect(() => {
    if (personId) {
      dispatch(fetchEventsByPersonThunk(personId));
    }
  }, [dispatch, personId]);

  // الشخص الحالي (لإظهار اسمه وعلاقته)
  const currentPerson = useMemo(
    () => peopleList.find((p) => p._id === personId),
    [peopleList, personId]
  );

  // حالة النموذج
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    location: "",
    notes: "",
  });

  // تعبئة النموذج من حدث موجود (لو eventIndex موجود) أو تركه فارغًا لإضافة حدث جديد
  useEffect(() => {
    if (!eventsList || eventsList.length === 0) return;

    const idx = eventIndex ? parseInt(eventIndex, 10) : 0;
    const ev = eventsList[idx];

    if (!ev) return;

    setFormData({
      eventName: ev.type || "",
      eventType: ev.type || "",
      eventDate: ev.date || "",
      location: ev.location || "",
      notes: ev.note || "",
    });
  }, [eventsList, eventIndex]);

  // التعامل مع تغيّر الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // حفظ الحدث (إضافة/تعديل)
  const handleSave = () => {
    if (!personId) return;

    const eventData = {
      type: formData.eventType || formData.eventName,
      date: formData.eventDate,
      location: formData.location,
      note: formData.notes,
      // يمكن إضافة icon أو days لاحقًا
    };

    dispatch(saveEventThunk({ personId, eventData }))
      .unwrap()
      .then(() => {
        navigate("/people"); // بعد الحفظ يعود لقائمة الأشخاص
      })
      .catch(() => {
        // الخطأ يتم تخزينه في eventsSlice.msg مسبقًا
      });
  };

  const handleCancel = () => {
    navigate(-1); // رجوع خطوة للخلف
  };

  const handleDelete = () => {
    // يمكن لاحقًا إضافة deleteEventThunk
    alert("Delete event is not implemented yet.");
  };

  return (
    <div style={{ backgroundColor: colors.lightBg, minHeight: "100vh" }}>
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: colors.pageBg }}
      >
        <div>
        <Navbar />
        <Container>
          <Card
            className="mx-auto shadow-lg rounded-4"
            style={{
              maxWidth: "950px",
              backgroundColor: colors.cardBg,
              borderRadius: "40px",
            }}
          >
            <CardBody className="p-5">
              {/* Title */}
              <h1
                className="fw-bold text-center mb-4"
                style={{ color: colors.title }}
              >
                {eventIndex ? "Edit Event" : "Add Event"}
              </h1>

              {/* Person name */}
              {currentPerson && (
                <div className="mb-2">
                  <div
                    className="fw-bold"
                    style={{ fontSize: 26, color: colors.textDark }}
                  >
                    {currentPerson.name}
                  </div>
                  <div
                    className="text-uppercase"
                    style={{
                      fontSize: 11,
                      letterSpacing: 0.5,
                      color: colors.textMuted,
                    }}
                  >
                    {currentPerson.relation}
                  </div>
                </div>
              )}

              {/* رسائل */}
              {eventsMsg && (
                <Alert color="info" className="mt-3 mb-4">
                  {eventsMsg}
                </Alert>
              )}

              {eventsLoading && (
                <div className="text-center my-3">
                  <Spinner color="primary" />
                </div>
              )}

              <Form>
                {/* Row 1: Event Name / Date */}
                <Row className="mt-4 g-4">
                  <Col md="6">
                    <FormGroup>
                      <Label
                        className="fw-semibold mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Event Name
                      </Label>
                      <Input
                        name="eventName"
                        placeholder="Birthday"
                        value={formData.eventName}
                        onChange={handleChange}
                        style={{
                          backgroundColor: colors.inputBg,
                          borderRadius: 9999,
                          border: "none",
                          padding: "14px 20px",
                          color: colors.textDark,
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label
                        className="fw-semibold mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Date
                      </Label>
                      <Input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        style={{
                          backgroundColor: colors.inputBg,
                          borderRadius: 9999,
                          border: "none",
                          padding: "14px 20px",
                          color: colors.textDark,
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* Row 2: Event Type / Location */}
                <Row className="mt-3 g-4">
                  <Col md="6">
                    <FormGroup>
                      <Label
                        className="fw-semibold mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Event Type
                      </Label>
                      <Input
                        name="eventType"
                        placeholder="Birthday"
                        value={formData.eventType}
                        onChange={handleChange}
                        style={{
                          backgroundColor: colors.inputBg,
                          borderRadius: 9999,
                          border: "none",
                          padding: "14px 20px",
                          color: colors.textDark,
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label
                        className="fw-semibold mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Location
                      </Label>
                      <Input
                        name="location"
                        placeholder="Home, Restaurant..."
                        value={formData.location}
                        onChange={handleChange}
                        style={{
                          backgroundColor: colors.inputBg,
                          borderRadius: 9999,
                          border: "none",
                          padding: "14px 20px",
                          color: colors.textDark,
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* Divider */}
                <hr
                  className="my-4"
                  style={{
                    borderTop: "1px solid rgba(158, 132, 190, 0.6)",
                  }}
                />

                {/* Notes + Gift button */}
                <Row className="g-4">
                  <Col md="7">
                    <FormGroup>
                      <Label
                        className="fw-semibold mb-1"
                        style={{ color: colors.textDark }}
                      >
                        Notes / Details
                      </Label>
                      <Input
                        type="textarea"
                        name="notes"
                        placeholder="She likes flowers and books .."
                        value={formData.notes}
                        onChange={handleChange}
                        style={{
                          backgroundColor: colors.inputBg,
                          borderRadius: 26,
                          border: "none",
                          padding: "16px 20px",
                          minHeight: 120,
                          color: colors.textDark,
                          resize: "none",
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col
                    md="5"
                    className="d-flex justify-content-center align-items-start"
                  >
                    <Button
                      type="button"
                      className="d-inline-flex align-items-center gap-2 rounded-pill"
                      style={{
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderColor: colors.giftBorder,
                        backgroundColor: "#fff",
                        color: colors.giftText,
                        padding: "10px 24px",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                      onClick={() =>
                        alert("Gift suggestions integration will go here.")
                      }
                    >
                      <span
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: 26,
                          height: 26,
                          borderWidth: 2,
                          borderStyle: "solid",
                          borderColor: colors.giftBorder,
                          fontSize: 16,
                        }}
                      >
                        🎁
                      </span>
                      <span>View Gift Suggestions</span>
                    </Button>
                  </Col>
                </Row>

                {/* Action buttons */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button
                    type="button"
                    className="rounded-3"
                    style={{
                      minWidth: 110,
                      backgroundColor: "#ffe7ea",
                      borderColor: colors.deleteBorder,
                      color: colors.deleteText,
                      fontWeight: 600,
                    }}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>

                  <Button
                    type="button"
                    className="rounded-3"
                    style={{
                      minWidth: 110,
                      backgroundColor: colors.cancelBtnBg,
                      borderColor: colors.cancelBorder,
                      color: colors.textDark,
                      fontWeight: 600,
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    className="rounded-3"
                    style={{
                      minWidth: 110,
                      backgroundColor: colors.purpleBtn,
                      borderColor: colors.purpleBtn,
                      color: "#fff",
                      fontWeight: 600,
                    }}
                    onClick={handleSave}
                    disabled={eventsLoading}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;

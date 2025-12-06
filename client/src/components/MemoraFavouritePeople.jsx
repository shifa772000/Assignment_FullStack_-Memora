
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert,
} from "reactstrap";
import Navbar from "./Navbar";

const API_URL = "http://localhost:5000/api/people";

const memoraColors = {
  pageBg: "#B69BCF",
  cardBg: "#EEDFF7",
  primary: "#4C1B6F",
  inputBg: "#FFFFFF",
  placeholder: "#D0C2DE",
  textMain: "#3B2349",
  textMuted: "#8A7A9A",
  linkBlue: "#2F6FD8",
  lightBg: "#E6DBED",
  heroCardBg: "#F7F0FF",
};

function MemoraFavouritePeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formPerson, setFormPerson] = useState({
    name: "",
    relation: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Failed to load people");
      }
      const data = await res.json();
      setPeople(data || []);
    } catch (err) {
      console.error("Fetch error", err);
      setErrorMsg("Could not load people. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    setErrorMsg("");

    if (!formPerson.name || !formPerson.relation) {
      setErrorMsg("Please enter both name and relation.");
      return;
    }

    const payload = { ...formPerson, events: formPerson.events || [] };

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Failed to update person");
        }
        const updated = await res.json();
        setPeople((prev) =>
          prev.map((p) => (p._id === editingId ? updated : p))
        );
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Failed to add person");
        }
        const created = await res.json();
        setPeople((prev) => [...prev, created]);
      }

      // Reset form
      setFormPerson({ name: "", relation: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Save error", err);
      setErrorMsg("Could not save person. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this person?")) return;
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete person");
      }
      setPeople((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      setErrorMsg("Could not delete person. Please try again.");
    }
  };

  const startEdit = (person) => {
    setFormPerson({ name: person.name, relation: person.relation });
    setEditingId(person._id);
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: memoraColors.pageBg, color: memoraColors.textMain }}
    >
      <Navbar />

      {/* Content */}
      <Container className="py-5 flex-grow-1">
        <Row className="align-items-center mb-4">
          <Col md="6">
            <h1 className="fw-bold" style={{ color: memoraColors.primary }}>
              My Favourite People
            </h1>
          </Col>

          <Col md="6">
            <Form
              className="d-flex flex-wrap gap-2 justify-content-md-end"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdate();
              }}
            >
              <FormGroup className="mb-0">
                <Input
                  name="name"
                  value={formPerson.name}
                  placeholder="Name"
                  onChange={handleFormChange}
                  className="rounded-pill"
                  style={{
                    backgroundColor: memoraColors.inputBg,
                    borderColor: memoraColors.placeholder,
                    color: memoraColors.textMain,
                  }}
                />
              </FormGroup>

              <FormGroup className="mb-0">
                <Input
                  name="relation"
                  value={formPerson.relation}
                  placeholder="Relation"
                  onChange={handleFormChange}
                  className="rounded-pill"
                  style={{
                    backgroundColor: memoraColors.inputBg,
                    borderColor: memoraColors.placeholder,
                    color: memoraColors.textMain,
                  }}
                />
              </FormGroup>

              <Button
                type="submit"
                className="rounded-pill d-flex align-items-center gap-2 px-3 shadow"
                style={{
                  backgroundColor: memoraColors.primary,
                  borderColor: memoraColors.primary,
                }}
              >
                <span
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 26,
                    height: 26,
                    backgroundColor: memoraColors.inputBg,
                    color: memoraColors.primary,
                  }}
                >
                  +
                </span>
                {editingId ? "Update" : "Add Person"}
              </Button>
            </Form>
          </Col>
        </Row>

        {loading && (
          <div className="d-flex align-items-center gap-2 mb-3">
            <Spinner size="sm" style={{ color: memoraColors.primary }} />
            <span>Loading...</span>
          </div>
        )}

        {errorMsg && (
          <Alert color="danger" className="py-2">
            {errorMsg}
          </Alert>
        )}

        {/* Cards Grid */}
        <Row className="g-4 mt-2">
          {people.map((person) => (
            <Col key={person._id} sm="6" md="4" lg="3">
              <Card
                className="border-0 shadow-lg rounded-4 h-100"
                style={{ backgroundColor: memoraColors.cardBg }}
              >
                <CardHeader
                  className="text-center border-0 rounded-top-4"
                  style={{ backgroundColor: memoraColors.cardBg }}
                >
                  <div className="d-flex justify-content-center mb-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 64,
                        height: 64,
                        fontSize: 28,
                        backgroundColor: memoraColors.primary,
                        color: memoraColors.cardBg,
                      }}
                    >
                      👤
                    </div>
                  </div>
                  <h5 className="fw-bold" style={{ color: memoraColors.primary }}>
                    {person.name}
                  </h5>
                  <small style={{ color: memoraColors.textMuted }}>
                    {person.relation}
                  </small>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                  <ListGroup flush className="flex-grow-1">
                    {(person.events || []).map((ev, i) => (
                      <ListGroupItem
                        key={i}
                        className="d-flex justify-content-between align-items-center px-0"
                        style={{
                          backgroundColor: memoraColors.cardBg,
                          borderColor: memoraColors.placeholder,
                          color: memoraColors.textMain,
                        }}
                      >
                        <span>{ev.type}</span>
                        <small style={{ color: memoraColors.textMuted }}>
                          {ev.date}
                        </small>
                      </ListGroupItem>
                    ))}
                  </ListGroup>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      size="sm"
                      outline
                      className="rounded-3"
                      style={{
                        borderColor: memoraColors.primary,
                        color: memoraColors.primary,
                      }}
                      onClick={() => startEdit(person)}
                    >
                      ✏️
                    </Button>

                    <Button
                      size="sm"
                      outline
                      className="rounded-3"
                      style={{
                        borderColor: memoraColors.primary,
                        color: memoraColors.primary,
                      }}
                      onClick={() => handleDelete(person._id)}
                    >
                      🗑
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer
        className="text-center py-3 small"
        style={{
          backgroundColor: memoraColors.heroCardBg,
          color: memoraColors.textMuted,
        }}
      >
        © 2024 Memora. All rights reserved.
      </footer>
    </div>
  );
}

export default MemoraFavouritePeople;

import { useSelector } from "react-redux";
import PersonCard from "./PersonCard";

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

  const authState = useSelector(state => state.auth);
  const userId = authState.user?._id;
  const token = authState.token;

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("You are not authorized.");
        throw new Error("Failed to load people");
      }

      const data = await res.json();
      setPeople(data || []);
    } catch (err) {
      console.error("Fetch error", err);
      setErrorMsg(err.message || "Could not load people.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPeople();
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormPerson(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    setErrorMsg("");

    if (!formPerson.name || !formPerson.relation) {
      setErrorMsg("Please enter both name and relation.");
      return;
    }

    if (!userId || !token) {
      setErrorMsg("You must be logged in to add people.");
      return;
    }

    const payload = { ...formPerson, user: userId, events: formPerson.events || [] };

    const authHeaders = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update person");

        const updated = await res.json();
        setPeople(prev => prev.map(p => (p._id === editingId ? updated : p)));
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to add person");

        const created = await res.json();
        setPeople(prev => [...prev, created]);
      }

      setFormPerson({ name: "", relation: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Save error", err);
      setErrorMsg("Could not save person.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this person?")) return;
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete person");

      setPeople(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Delete error", err);
      setErrorMsg("Could not delete person.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: memoraColors.pageBg, color: memoraColors.textMain }}
    >
      <Navbar />

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
                />
              </FormGroup>

              <FormGroup className="mb-0">
                <Input
                  name="relation"
                  value={formPerson.relation}
                  placeholder="Relation"
                  onChange={handleFormChange}
                  className="rounded-pill"
                />
              </FormGroup>

              <Button
                type="submit"
                className="rounded-pill px-3 shadow"
                style={{ backgroundColor: memoraColors.primary }}
              >
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

        {errorMsg && <Alert color="danger">{errorMsg}</Alert>}

        {/* 🎉 هنا يتم عرض الكروت الصحيحة */}
        <Row className="g-4 mt-2">
          {people.map((person) => (
            <Col md={4} sm={6} xs={12} key={person._id}>
              <PersonCard person={person} />
            </Col>
          ))}
        </Row>
      </Container>

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

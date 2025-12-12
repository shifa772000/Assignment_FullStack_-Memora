
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Alert } from "reactstrap";
import PersonCard from "./PersonCard";
import { fetchPeopleThunk } from "../slices/peopleSlice";

export default function PeopleList() {
  const dispatch = useDispatch();

  const { list, loading, msg } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(fetchPeopleThunk());
  }, [dispatch]);

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Your People</h2>

      {msg && (
        <Alert color="danger" className="text-center">
          {msg}
        </Alert>
      )}

      {loading && (
        <div className="text-center my-4">
          <Spinner color="primary" />
        </div>
      )}

      {!loading && list.length === 0 && (
        <p className="text-center text-muted">No people found. Add someone!</p>
      )}

      <Row className="justify-content-center">
        <Col md="8">
          {list.map((p) => (
            <PersonCard key={p._id} person={p} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

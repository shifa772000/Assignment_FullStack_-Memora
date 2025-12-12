
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

export default function PersonCard({ person }) {
  
  const events = person.events || [];

  return (
    <Card className="rounded-4 mb-3 shadow-sm">
      <CardBody>
        <CardTitle tag="h4" className="mb-1">
          {person.name}
        </CardTitle>

        <CardSubtitle className="mb-3 text-muted">
          {person.relation}
        </CardSubtitle>

        <p className="fw-bold mb-1">Upcoming Events:</p>

        {events.length === 0 ? (
          <p className="text-muted mb-3">No events added yet.</p>
        ) : (
          <ul className="list-unstyled mb-3">
            {events.slice(0, 3).map((ev, index) => (
              <li
                key={ev._id || index}
                className="d-flex justify-content-between"
              >
                <span>
                  {ev.icon && <span className="me-1">{ev.icon}</span>}
                  {ev.type}
                </span>
                <span className="text-muted small">
                  {ev.days || ev.date}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`/eventDetailsPage?personId=${person._id}`}
            className="btn btn-sm btn-primary rounded-pill"
          >
            View Events
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

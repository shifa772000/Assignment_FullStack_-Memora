import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

export default function PersonCard({ person, colors = {} }) {
  const events = person.events || [];

  return (
    <Card
      className="rounded-4 mb-3 shadow-sm"
      style={{ backgroundColor: colors.cardBg || "#EEDFF7" }}
    >
      <CardBody>
        <div className="d-flex justify-content-center mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: 64,
              height: 64,
              backgroundColor: "#F7F0FF",
              border: `2px solid ${colors.primary || "#4C1B6F"}`,
            }}
          >
            <i
              className="bi bi-person-fill"
              style={{
                fontSize: 32,
                color: colors.primary || "#4C1B6F",
              }}
            ></i>
          </div>
        </div>

        <CardTitle tag="h5" className="text-center fw-bold mb-1">
          {person.name}
        </CardTitle>

        <CardSubtitle className="text-center mb-3 text-muted">
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

        <div className="d-flex justify-content-center">
          <Link
            to={`/eventDetailsPage?personId=${person._id}`}
            className="btn btn-sm btn-primary rounded-pill px-4"
          >
            View Events
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

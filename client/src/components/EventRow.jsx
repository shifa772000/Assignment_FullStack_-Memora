
export default function EventRow({ event, onEdit, onDelete }) {
  return (
    <tr>
      <td>{event.name}</td>
      <td>{event.type}</td>
      <td>{event.date}</td>
      <td>{event.status}</td>
      <td className="text-end">
        <button className="btn btn-sm btn-link" onClick={() => onEdit(event)}>
          ✏️
        </button>
        <button className="btn btn-sm btn-link text-danger" onClick={() => onDelete(event)}>
          🗑
        </button>
      </td>
    </tr>
  );
}

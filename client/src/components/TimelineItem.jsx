export default function TimelineItem({ date, title, org, cgpa, location, description }) {
  return (
    <div className="timeline-item">
      <p className="timeline-date">{date}{location ? ` — ${location}` : ''}</p>
      <p className="timeline-title">{title}</p>
      {org && <p className="timeline-org">{org}</p>}
      {cgpa && <p className="timeline-cgpa">CGPA: {cgpa}</p>}
      {description && <p className="timeline-body">{description}</p>}
    </div>
  );
}

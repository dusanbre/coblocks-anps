export default function save({ attributes }) {
	const listFields = attributes.text.map((values, index) => {
		return (
			<div className="timeline-item">
				<div className="timeline-year">{values.year}</div>
				<div className="timeline-content">
					<div className="timeline-title">{values.title}</div>
					<div className="timeline-text">{values.content}</div>
				</div>
			</div>
		);
	});

	return <div className="timeline">{listFields}</div>;
}

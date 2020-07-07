export default function save({ attributes }) {
	const listFields = attributes.text.map((values, index) => {
		return <li key={index}>{values.content}</li>;
	});

	return (
		<div>
			<ul className={"list list-" + attributes.icon}>{listFields}</ul>
		</div>
	);
}
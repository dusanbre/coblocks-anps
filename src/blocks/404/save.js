export default function save(props) {
	const { attributes } = props;

	return (
		<div className="text-center">
			<h2 className="title fs30">{attributes.title}</h2>
			<br />
			<span>{attributes.subtitle}</span>
			<br />
			{attributes.image ? (
				<img className="error404" src={attributes.image.sizes.full.url} />
			) : (
				""
			)}
		</div>
	);
}

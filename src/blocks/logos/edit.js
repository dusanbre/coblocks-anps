import Inspector from "./inspector";

export default function edit(props) {
	const { attributes } = props;

	const logosFields = attributes.logos.map((values, index) => {
		return (
			<li className="client" key={index}>
				<a
					href={values.url ? values.url : ""}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={values.media ? values.media.sizes.full.url : ""}
						alt={values.alt ? values.alt : ""}
					/>
				</a>
			</li>
		);
	});
	return (
		<div>
			<Inspector {...props} />
			<div className={"logos-wrapper " + attributes.style}>
				<ul className={"clients clients-col-" + attributes.inRow}>
					{logosFields}
				</ul>
			</div>
		</div>
	);
}

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

	const owlFields = attributes.logos.map((values, index) => {
		return (
			<div className="owl-item">
				<li className="client" key={index} style={{ height: 46 }}>
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
			</div>
		);
	});

	const logosDisplay =
		attributes.style == "style-2" ? (
			<div className={"logos-wrapper " + attributes.style}>
				<ul className="clients owl-carousel general style-2 owl-loaded owl-drag clients-col-">
					<div className="owl-stage-outer">
						<div className="owl-stage">{owlFields}</div>
					</div>
					<div className="owl-nav disabled"></div>
					<div className="owl-dots"></div>
				</ul>
			</div>
		) : (
			<div className={"logos-wrapper " + attributes.style}>
				<ul className={"clients clients-col-" + attributes.inRow}>
					{logosFields}
				</ul>
			</div>
		);
	return (
		<div>
			<Inspector {...props} />
			{logosDisplay}
		</div>
	);
}

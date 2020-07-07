export default function save({ attributes }) {
	const { textColor, text, url, target, buttonType, buttonText } = attributes;
	return (
		<div className="anps_cta">
			<div className="cta-content font1" style={"color:" + textColor}>
				{text}
			</div>
			{url ? (
				<a
					href={url}
					target={target}
					className={"btn btn-lg " + buttonType}
					rel="noopener noreferrer"
				>
					{buttonText}
				</a>
			) : (
				""
			)}
		</div>
	);
}

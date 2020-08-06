function save(props) {
	const { attributes } = props;

	let iconContent, iconDownload;
	if (attributes.iconC) {
		iconContent = <i className={`fa ${attributes.iconC}`}></i>;
	}

	if (attributes.iconD) {
		iconDownload = <i className={`fa ${attributes.iconD}`}></i>;
	}

	return (
		<div className="download">
			<div
				className="download-content text-uppercase"
				style={{ color: attributes.colorText }}
			>
				{iconContent}
				{attributes.content}
			</div>
			{attributes.url ? (
				<a
					target={attributes.target}
					href={attributes.url}
					className="btn btn-md btn-dark btn-shadow"
				>
					{iconDownload}
					{attributes.downloadText}
				</a>
			) : (
				""
			)}
		</div>
	);
}

export default save;

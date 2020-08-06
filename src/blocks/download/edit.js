import { Fragment } from "@wordpress/element";

import Inspector from "./inspector";

function edit(props) {
	const { attributes } = props;

	let iconContent, iconDownload;
	if (attributes.iconC) {
		iconContent = <i className={`fa ${attributes.iconC}`}></i>;
	}

	if (attributes.iconD) {
		iconDownload = <i className={`fa ${attributes.iconD}`}></i>;
	}

	return (
		<Fragment>
			<Inspector {...props} />
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
		</Fragment>
	);
}

export default edit;

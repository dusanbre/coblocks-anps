import { Fragment } from "@wordpress/element";

export default function save(props) {
	const { attributes } = props;
	return (
		<Fragment>
			<div className={"icon " + attributes.position}>
				<div className="icon-header">
					{attributes.image ? (
						<div
							className="icon-media"
							style={{ width: attributes.iconSize + "px" }}
						>
							<img src={attributes.image.url} />
						</div>
					) : (
						<div
							className="icon-media"
							data-style={"width:" + attributes.iconSize + "px"}
							style={{ width: attributes.iconSize + "px" }}
						>
							<i
								className={"fa fa " + attributes.icon}
								style={"font-size:" + attributes.iconSize + "px"}
							></i>
						</div>
					)}
					<h3 className="icon-title text-uppercase">{attributes.title}</h3>
				</div>
				<p>{attributes.content}</p>
				{attributes.url ? (
					<a
						href={attributes.url}
						target={attributes.target}
						className="btn btn-md btn-minimal"
					>
						Read More
					</a>
				) : (
					""
				)}
			</div>
		</Fragment>
	);
}

import { Fragment } from "@wordpress/element";

export default function save(props) {
	const { attributes } = props;

	let icon,
		customIcon,
		hasIcon,
		mediaClass,
		largeClass,
		hasLink,
		pushToTop,
		hasContent,
		yt,
		styleClass,
		videoIcon;
	if (attributes.icon) {
		icon = <i className={`fa ${attributes.icon}`}></i>;
		hasIcon = " featured-has-icon";
	} else {
		hasIcon = "";
	}

	if (attributes.iconCustom) {
		customIcon = (
			<div className="featured-custom-icon">
				<img
					className="attachment-full size-full"
					src={attributes.iconCustom.sizes.full.url}
					alt={attributes.iconCustom.title}
				/>
				{attributes.iconCustomHover ? (
					<img
						src={attributes.iconCustomHover.sizes.full.url}
						className="featured-custom-icon-hover"
					/>
				) : (
					""
				)}
			</div>
		);
		hasIcon = " featured-has-icon";
	}

	if (attributes.video != "" && attributes.lightbox != false) {
		mediaClass = " featured-video";
	} else if (attributes.video == "" && attributes.lightbox != false) {
		mediaClass = " featured-image";
	} else {
		mediaClass = "";
	}

	if (attributes.exposed != false) {
		largeClass = " featured-large";
	} else {
		largeClass = "";
	}

	if (attributes.link != "") {
		hasLink = " featured-has-link";
	} else {
		hasLink = "";
	}

	if (attributes.content != "") {
		hasContent = " featured-has-content";
	} else {
		hasContent = "";
	}

	if (attributes.absoluteImg != false) {
		pushToTop = " featured-push-top";
	} else {
		pushToTop = "";
	}

	if (attributes.video != "") {
		const ytString = attributes.video.substring(32);
		yt = `https://img.youtube.com/vi/${ytString}/maxresdefault.jpg`;
		console.log(yt);
	}

	if (attributes.style != "") {
		styleClass = " simple-style";
	} else {
		styleClass = "";
	}

	if (attributes.imageU && attributes.lightbox == true) {
		videoIcon = (
			<a
				data-rel="youtube"
				href={attributes.video}
				className="featured-lightbox-link"
			>
				<svg>
					<use xlinkHref="#featured-video-dark" />
				</svg>
			</a>
		);
	}

	const displayFields = (
		<div
			className={`featured ${hasIcon}${mediaClass}${largeClass}${hasLink}${hasContent}${pushToTop}${styleClass}`}
		>
			<div className="featured-header">
				<a href={attributes.link} target={attributes.linkTarget}>
					<img
						src={attributes.imageU ? attributes.imageU.sizes.full.url : yt}
						alt=""
					/>
				</a>
			</div>
			<div className="featured-content">
				<h3 className="featured-title text-uppercase">
					<a href={attributes.link} target={attributes.linkTarget}>
						{attributes.iconCustom ? customIcon : icon}
						{attributes.title}
					</a>
				</h3>
				<p className="featured-desc">
					{attributes.content ? attributes.content : ""}
				</p>
				<a
					href={attributes.link}
					target={attributes.linkTarget}
					className="btn btn-md btn-minimal"
				>
					{attributes.buttonText}
				</a>
				{videoIcon}
			</div>
		</div>
	);
	return <Fragment>{displayFields}</Fragment>;
}

import { __ } from "@wordpress/i18n";

import StyleDefault from "./styleDefault";
import StyleMinimalLight from "./styleMinimalLight";
import StyleMinimalDark from "./styleMinimalDark";

export default function slider(props) {
	const { attributes } = props;
	const { title, slider, num_in_row, posts, style } = attributes;

	let styleClassSliderOn, styleClassSliderOff, styleNav, styleNavIcon;
	switch (style) {
		case "default":
			styleClassSliderOn = "recent-news recent-news-default";
			styleClassSliderOff = "recent-news row";
			styleNav = "owl-nav text-right";
			styleNavIcon = "fa fa-angle-";
			break;
		case "minimal-light":
			styleClassSliderOn =
				"recent-news recent-news-light recent-news-minimal-light";
			styleClassSliderOff = "recent-news recent-news-light row";
			styleNav = "owl-nav-style-2 text-right";
			styleNavIcon = "fa fa-chevron-";
			break;
		case "minimal-dark":
			styleClassSliderOn =
				"recent-news recent-news-dark recent-news-minimal-dark";
			styleClassSliderOff = "recent-news recent-news-dark row";
			styleNav = "owl-nav-style-2 text-right";
			styleNavIcon = "fa fa-chevron-";
		default:
			break;
	}

	let displayFieldsSlider;

	if (posts) {
		if (slider == 0) {
			displayFieldsSlider = (
				<div className={styleClassSliderOff}>
					{title ? (
						<div className="col-md-12">
							<h2 className="title">{title}</h2>
						</div>
					) : (
						""
					)}
					{posts.map(post => {
						return (
							<div className={"col-md-" + num_in_row}>
								{style == "default" ? (
									<StyleDefault post={post} attr={attributes} />
								) : (
									""
								)}
								{style == "minimal-light" ? (
									<StyleMinimalLight post={post} />
								) : (
									""
								)}
								{style == "minimal-dark" ? (
									<StyleMinimalDark post={post} />
								) : (
									""
								)}
							</div>
						);
					})}
				</div>
			);
		} else if (slider == 1) {
			displayFieldsSlider = (
				<div className={styleClassSliderOn}>
					{title ? (
						<div className="row">
							<div className="col-md-12">
								<h2 className="title">{title}</h2>
							</div>
						</div>
					) : (
						""
					)}
					<div className="owl-wrap">
						<div className="owl-carousel owl-loaded owl-drag">
							<div className="owl-stage-outer">
								<div className="owl-stage anps-stage">
									{posts.map(post => {
										return (
											<div className="owl-item anps-owl-item">
												{style == "default" ? (
													<StyleDefault post={post} attr={attributes} />
												) : (
													""
												)}
												{style == "minimal-light" ? (
													<StyleMinimalLight post={post} />
												) : (
													""
												)}
												{style == "minimal-dark" ? (
													<StyleMinimalDark post={post} />
												) : (
													""
												)}
											</div>
										);
									})}
								</div>
							</div>
							<div className="owl-nav disabled">
								<div className="owl-prev"></div>
								<div className="owl-next"></div>
							</div>
							<div className="owl-dots disabled"></div>
						</div>
					</div>
					<div className={styleNav}>
						<button className="owlprev">
							<i className={styleNavIcon + "left"} />
						</button>
						<button className="owlnext">
							<i className={styleNavIcon + "right"} />
						</button>
					</div>
				</div>
			);
		}
	}
	return <div>{displayFieldsSlider}</div>;
}

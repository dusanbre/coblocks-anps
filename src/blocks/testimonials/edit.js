import { Fragment } from "@wordpress/element";

import Inspector from "./inspector";

function edit(props) {
	const { attributes } = props;

	let displayFields, owlItem, simpleItem;

	if (attributes.testimonial) {
		owlItem = (
			<Fragment>
				<div className="owl-stage-outer" style={{ overflow: "hidden" }}>
					<div className="owl-stage anps__owl-stage">
						{attributes.testimonial.map(item => {
							return (
								<div
									className="owl-item active"
									// style={{ width: "20%", marginRight: 0 }}
								>
									<li className="clearfix row" style={{ listStyle: "none" }}>
										<div className="user pull-left" style={{ display: "flex" }}>
											<div className="user-image">
												<img
													src={item.media ? item.media.sizes.full.url : ""}
													className="user-photo"
												/>
											</div>
											<div className="content pull-left">
												<h3 className="name-user" style={{ margin: 0 }}>
													{item.user}
												</h3>
												<h4 className="jobtitle" style={{ margin: 0 }}>
													{item.job}
												</h4>
												<p style={{ margin: 0 }}>{item.text}</p>
											</div>
										</div>
									</li>
								</div>
							);
						})}
					</div>
				</div>
				<div className="owl-nav disabled"></div>
				<div className="owl-dots disabled"></div>
			</Fragment>
		);

		simpleItem = (
			<Fragment>
				{attributes.testimonial.map(item => {
					return (
						<li>
							<div className="user">
								<div className="user-image">
									<img
										src={item.media ? item.media.sizes.full.url : ""}
										alt=""
										className="user-photo"
									/>
								</div>
								<div className="content">
									<h3 className="name-user">{item.user}</h3>
									<h4 className="jobtitle">{item.job}</h4>
									<p>{item.text}</p>
								</div>
							</div>
						</li>
					);
				})}
			</Fragment>
		);
	}

	if (attributes.style == "style-1") {
		displayFields = (
			<div className="testimonials testimonials-style-1">
				<div className="testimonials-header">
					<h3 className="title">{attributes.title ? attributes.title : ""}</h3>
				</div>
				<div className="testimonials-outer-wrap">
					<ul
						className="testimonial-wrap owl-carousel owl-loaded owl-drag"
						data-autoplay={
							attributes.autoplay == true ? attributes.autoplayTimeout : ""
						}
						data-random={attributes.random == true ? "random" : ""}
					>
						{owlItem}
					</ul>
					<div className="owl-nav">
						<button className="owlprev">
							<i className="fa fa-angle-left"></i>
						</button>
						<button className="owlnext">
							<i className="fa fa-angle-right"></i>
						</button>
					</div>
				</div>
			</div>
		);
	} else if (attributes.style == "style-2") {
		displayFields = (
			<div className="testimonials testimonials-style-2">
				<div className="testimonials-header">
					<h3 className="title">{attributes.title ? attributes.title : ""}</h3>
				</div>
				<div className="testimonials-outer-wrap">
					<ul
						className="testimonial-wrap owl-carousel owl-loaded owl-drag"
						data-autoplay={
							attributes.autoplay == true ? attributes.autoplayTimeout : ""
						}
						data-random={attributes.random == true ? "random" : ""}
					>
						{owlItem}
					</ul>
					<div className="owl-nav-style-2">
						<button className="owlprev">
							<i className="fa fa-chevron-left"></i>
						</button>
						<button className="owlnext">
							<i className="fa fa-chevron-right"></i>
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		displayFields = (
			<div className="testimonials testimonials-style-3">
				<div className="testimonials-header">
					<h3 className="title">{attributes.title ? attributes.title : ""}</h3>
				</div>
				<ul className="testimonials-wrap clearfix">{simpleItem}</ul>
			</div>
		);
	}

	return (
		<Fragment>
			<Inspector {...props} />
			{displayFields}
		</Fragment>
	);
}

export default edit;

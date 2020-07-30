import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import { withSelect } from "@wordpress/data";

import ImageMedia from "../blog/media";

function edit(props) {
	const { attributes, setAttributes } = props;
	const {
		inRow,
		filter,
		mobileView,
		itemBgColor,
		itemTextColor,
		itemTitleColor,
		portfolioItems,
		perPage,
		selectedCategory,
		orderby,
		order,
		portfolioCategories
	} = attributes;

	//fetch portfolio data
	const query = {
		per_page: perPage,
		portfolio_category: selectedCategory,
		orderby: orderby,
		order: order,
		status: "publish"
	};
	const getPosts = wp.data
		.select("core")
		.getEntityRecords("postType", "portfolio", query);

	setAttributes({
		portfolioItems: getPosts
	});

	let displayFields, filters, xsClass;

	switch (mobileView) {
		case "1":
			xsClass = "col-xs-12";
			break;
		case "2":
			xsClass = "col-xs-6";
		default:
			break;
	}

	if (filter == "on") {
		if (!portfolioCategories) {
			filters = <ul className="filter"></ul>;
		} else {
			filters = (
				<ul className="filter">
					{portfolioCategories.map(cat => {
						return (
							<li style={{ height: 57 }}>
								{" "}
								<button data-filter={cat.slug}>{cat.name}</button>{" "}
							</li>
						);
					})}
				</ul>
			);
		}
	}

	if (portfolioItems) {
		displayFields = portfolioItems.map(item => {
			return inRow == "col-md-6" || inRow == "col-md-4" ? (
				<div
					className={`projects-item ${item.portfolio_categories.map(cat => {
						return cat.slug;
					})} ${inRow} ${xsClass}`}
				>
					<div className="projects-item-wrap">
						<ImageMedia imageId={item.featured_media} />

						<div
							className="project-hover-bg"
							style={itemBgColor ? { backgroundColor: itemBgColor } : {}}
						></div>
						<div className="project-hover">
							<h3
								className="project-title text-uppercase"
								style={itemTitleColor ? { color: itemTitleColor } : {}}
							>
								{item.title.rendered}
							</h3>
							<p
								style={itemTextColor ? { color: itemTextColor } : {}}
								className="project-desc"
								dangerouslySetInnerHTML={{
									__html: item.excerpt.rendered + "..."
								}}
							/>
							<a
								href={item.link}
								rel="noopener noreferrer"
								target="_blank"
								className="btn btn-md"
							>
								Read More
							</a>
						</div>
					</div>
				</div>
			) : (
				<div
					className={`projects-item ${item.portfolio_categories.map(cat => {
						return cat.slug;
					})} ${inRow} ${xsClass}`}
				>
					<div className="projects-item-wrap">
						<ImageMedia imageId={item.featured_media} />

						<a
							href={item.link}
							rel="noopener noreferrer"
							target="_blank"
							className="project-hover-small"
						>
							<i className="fa fa-link" />
						</a>
					</div>
				</div>
			);
		});
	}

	return (
		<Fragment>
			<Inspector {...props} />
			<div className="projects">
				{filters}
				<div className="row projects-content">{displayFields}</div>
			</div>
		</Fragment>
	);
}
export default withSelect((select, props) => {
	const query = {
		per_page: -1
	};
	return {
		getPosts: select("core").getEntityRecords("postType", "portfolio", query)
	};
})(edit);

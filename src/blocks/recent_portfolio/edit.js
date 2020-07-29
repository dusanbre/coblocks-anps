import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import { withSelect } from "@wordpress/data";

import ImageMedia from "../blog/media";

function edit(props) {
	const { attributes, setAttributes } = props;
	const {
		inRow,
		filter,
		title,
		titleColor,
		bgColor,
		itemBgColor,
		itemTextColor,
		itemTitleColor,
		portfolioItems,
		perPage,
		selectedCategory,
		portfolioCategories
	} = attributes;

	//fetch portfolio data
	const query = {
		per_page: perPage,
		portfolio_category: selectedCategory,
		status: "publish"
	};
	const getPosts = wp.data
		.select("core")
		.getEntityRecords("postType", "portfolio", query);

	setAttributes({
		portfolioItems: getPosts
	});

	console.log(attributes);

	let displayFields, filters;

	if (portfolioCategories) {
		filters = portfolioCategories.map(cat => {
			return (
				<li style={{ height: 116 }}>
					<button data-filter={cat.slug}>{cat.name}</button>
				</li>
			);
		});
	}

	if (portfolioItems) {
		displayFields = portfolioItems.map(item => {
			return (
				<div
					className={`projects-item col-xs-6 ${inRow} ${portfolioCategories.map(
						cat => {
							return cat.slug;
						}
					)}`}
				>
					<div className="projects-item-wrap">
						<ImageMedia imageId={item.featured_media} />
						<div
							className="project-hover-bg"
							style={itemBgColor ? { color: itemBgColor } : {}}
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
								dangerouslySetInnerHTML={{
									__html: item.content.rendered.slice(1, 150) + "..."
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
			);
		});
	}

	return (
		<Fragment>
			<Inspector {...props} />
			<div
				className="projects projects-recent"
				data-bg={bgColor ? bgColor : ""}
			>
				<div className="projects-header clearfix">
					{title ? (
						<h2
							className="title projects-title visible-lg pull-left"
							style={titleColor ? { color: titleColor } : {}}
						>
							{title}
						</h2>
					) : (
						<h2></h2>
					)}
					<ul
						className="filter filter-dark pull-right"
						style={filter === true ? { display: "none" } : {}}
					>
						{filters}
					</ul>
				</div>
				<div className="projects-content row">{displayFields}</div>
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

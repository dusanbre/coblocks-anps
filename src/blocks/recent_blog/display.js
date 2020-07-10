import { SelectControl, TextControl, PanelBody } from "@wordpress/components";
import { Fragment, Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { withSelect } from "@wordpress/data";

import ImageMedia from "../blog/media";
import Comment from "../blog/comment";

function display(props) {
	const { attributes, setAttributes } = props;
	const {
		title,
		slider,
		num_in_row,
		num_post,
		posts,
		cat_ids,
		content_length,
		style
	} = attributes;

	const query = {
		per_page: num_post,
		status: "publish",
		categories: cat_ids,
		orderby: "date",
		order: "desc"
	};

	const getPosts = wp.data
		.select("core")
		.getEntityRecords("postType", "post", query);

	setAttributes({
		posts: getPosts
	});
	console.log(posts);

	let displayFieldsEnableSlider, displayFieldsDisableSlider;

	if (posts) {
		if (slider == 0) {
			displayFieldsDisableSlider = (
				<div className="recent-news row">
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
								<article className="post">
									<header>
										<ImageMedia imageId={post.featured_media} />
									</header>
									<a href={post.link} target="_blank" rel="noopener noreferrer">
										<h3 className="post-title">{post.title.rendered}</h3>
									</a>
									<ul className="post-meta">
										<li>
											<i className="fa fa-calendar" />
											<time datetime={post.date}>{post.date}</time>
										</li>
										<li>
											<i className="fa fa-commenting-o" />
											<Comment postId={post.id} />
										</li>
									</ul>
									<div className="post-content">
										<div>
											<p
												dangerouslySetInnerHTML={{
													__html:
														post.content.rendered.slice(1, content_length) +
														"..."
												}}
											/>
										</div>
										<a
											href={post.link}
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-md btn-gradient btn-shadow recent-blog-gutenberg"
										>
											{__("Read More")}
										</a>
									</div>
								</article>
							</div>
						);
					})}
				</div>
			);
		} else if (slider == 1) {
		}
	}
	return <div>{displayFieldsDisableSlider}</div>;
}

export default withSelect((select, props) => {
	return {
		posts: select("core").getEntityRecords("postType", "post", {
			per_page: -1
		})
	};
})(display);

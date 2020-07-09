import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

import ImageMedia from "./media";
import Author from "./author";

class display extends Component {
	render() {
		const { setAttributes, attributes } = this.props;
		const {
			postPerPage,
			orderby,
			order,
			selectedCategory,
			columns,
			posts,
			media
		} = attributes;
		const dusan = {
			per_page: postPerPage,
			categories: selectedCategory,
			orderby: orderby,
			order: order,
			status: "publish"
		};
		const getPosts = wp.data
			.select("core")
			.getEntityRecords("postType", "post", dusan);

		setAttributes({
			posts: getPosts
		});

		console.log(attributes);
		let blogType, postText;
		switch (columns) {
			case "1":
				blogType = "col-md-12";
				break;
			case "2":
				blogType = "col-md-6";
				break;
			case "3":
				blogType = "col-md-4";
				break;
			case "4":
				blogType = "col-md-3";
				break;
			default:
				blogType = "col-md-12";
				break;
		}
		console.log(this.props);
		if (posts) {
			postText = (
				<div className="row anps-blog">
					{posts.map(post => {
						return (
							<div className={blogType}>
								<article
									id={"post-" + post.id}
									className={
										"post-" +
										post.id +
										" post-" +
										post.type +
										" status-" +
										post.status +
										" format-" +
										post.format
									}
								>
									<header className="entry-header">
										<ImageMedia imageId={post.featured_media} />
										<a
											href={post.link}
											target="_self"
											rel="noopener noreferrer"
										>
											<h3 className="post-title entry-title text-uppercase">
												{post.title.rendered}
											</h3>
										</a>
										<ul className="post-meta">
											<li className="author vcard">
												<i className="fa fa-user" />
												<span className="text-lowercase">posted by:</span>
												<Author authorId={post.author} />
											</li>
											<li>
												<i className="fa fa-calendar" />
												<time datetime={post.date}>{post.date}</time>
											</li>
										</ul>
									</header>
								</article>
							</div>
						);
					})}
				</div>
			);
		}
		return <div>{postText}</div>;
	}
}

export default withSelect((select, props) => {
	return {
		posts: select("core").getEntityRecords("postType", "post", {
			per_page: -1
		})
	};
})(display);

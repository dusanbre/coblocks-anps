import { Component, Fragment } from "@wordpress/element";
import { withSelect } from "@wordpress/data";

import ImageMedia from "./media";
import Author from "./author";
import Comment from "./comment";
import Category from "./category";

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
		// console.log(this.props);
		if (posts) {
			postText = (
				<div className="row anps-blog">
					{posts.map(post => {
						// const content = post.content.rendered.slice(1, 200);
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
											<li>
												<i className="fa fa-commenting-o" />
												<Comment postId={post.id} />
											</li>
											<li>
												<i className="fa fa-folder-o" />
												<Category postCat={post.post_categories} />
											</li>
										</ul>
									</header>
									<div className="post-content entry-content">
										<div className="post-desc clearfix">
											<p
												dangerouslySetInnerHTML={{
													__html: post.content.rendered.slice(1, 150) + "..."
												}}
											/>
										</div>
										<a
											href={post.link}
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-md btn-gradient btn-shadow"
										>
											Read More
										</a>
									</div>
								</article>
							</div>
						);
					})}
				</div>
			);
		}
		return <Fragment>{postText}</Fragment>;
	}
}

export default withSelect((select, props) => {
	return {
		posts: select("core").getEntityRecords("postType", "post", {
			per_page: -1
		})
	};
})(display);

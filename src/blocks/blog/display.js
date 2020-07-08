import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";

class display extends Component {
	render() {
		const { setAttributes, attributes } = this.props;
		const {
			postPerPage,
			orderby,
			order,
			selectedCategory,
			columns,
			posts
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

		if (posts) {
			postText = (
				<div className="row anps-blog">
					{posts.map(post => {
						return (
							<div className={columns}>
								<article
									id={post.id}
									className={
										post.id +
										"post-" +
										post.type +
										"status-" +
										post.status +
										"format-" +
										post.format
									}
								>
									<header className="entry-header"></header>
								</article>
							</div>
						);
					})}
				</div>
			);
		}
		console.log(attributes);
		return <div>{postText}</div>;
	}
}

export default withSelect(select => {
	return {
		post: select("core").getEntityRecords("postType", "post", { per_page: -1 })
	};
})(display);

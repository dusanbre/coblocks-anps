import { __ } from "@wordpress/i18n";

import ImageMedia from "../../blog/media";
import Comment from "../../blog/comment";

export default function styleDefault({ post, attr }) {
	return post && attr ? (
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
								post.content.rendered.slice(1, attr.content_length) + "..."
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
	) : (
		""
	);
}

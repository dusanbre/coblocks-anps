import { __ } from "@wordpress/i18n";

import ImageMedia from "../../blog/media";

export default function styleMinimalLight({ post }) {
	return post ? (
		<article className="post-minimal post-minimal-light">
			<header>
				<ImageMedia imageId={post.featured_media} />
			</header>
			<div className="post-minimal-wrap">
				<a href={post.link} target="_blank" rel="noopener noreferrer">
					<h3 className="post-minimal-title">{post.title.rendered}</h3>
				</a>
				<ul className="post-minimal-meta">
					<li>
						<i className="fa fa-calendar" />
						<time datetime={post.date}>{post.date}</time>
					</li>
				</ul>
			</div>
		</article>
	) : (
		""
	);
}

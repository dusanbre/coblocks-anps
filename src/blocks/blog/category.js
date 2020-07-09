export default function category({ postCat }) {
	return postCat.map(cat => {
		return cat ? <a href={cat.link}>{cat.name + "  "}</a> : "No Category";
	});
}

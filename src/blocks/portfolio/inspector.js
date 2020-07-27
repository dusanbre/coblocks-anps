import { FetchPortfolio } from "./fetchApi";

export default function inspector(props) {
	const { attributes, setAttributes } = props;

	const portfolioRes = FetchPortfolio();
	setAttributes({ portfolioItems: portfolioRes });

	console.log(attributes);

	return <div></div>;
}

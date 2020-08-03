import Inspector from "./inspector";

export default function edit(props) {
	console.log(props);
	return (
		<div>
			<Inspector {...props} />
		</div>
	);
}

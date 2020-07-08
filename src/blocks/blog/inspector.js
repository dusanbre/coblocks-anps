import { SelectControl, TextControl, PanelBody } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

function inspector(props) {
	const { attributes, setAttributes } = props;
	const { blogCategory, isLoadedCat } = attributes;

	if (!blogCategory) {
		apiFetch({
			path: addQueryArgs("/wp/v2/categories")
		})
			.then(res => {
				setAttributes({
					blogCategory: res,
					isLoadedCat: true
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	if (isLoadedCat == false) {
		return "Loading...";
	}

	if (blogCategory && blogCategory.lenght === 0) {
		return "No category found...";
	}

	let optionCategory;
	if (blogCategory) {
		optionCategory = blogCategory.map(cat => {
			return { label: cat.name, value: cat.id };
		});
	}
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Blog Options")} initialOpen={true}>
					<SelectControl
						label={__("Select Category")}
						value={attributes.selectedCategory}
						options={optionCategory}
						onChange={value => setAttributes({ selectedCategory: value })}
					/>
					<TextControl
						label={__("Post Per Page")}
						help={__("Enter number.Default is 10")}
						value={attributes.postPerPage}
						onChange={value => setAttributes({ postPerPage: value })}
					/>
					<SelectControl
						label={__("Order By")}
						value={attributes.orderby}
						options={[
							{ label: __("Date"), value: "date" },
							{ label: __("ID"), value: "id" },
							{ label: __("Name"), value: "title" },
							{ label: __("Author"), value: "author" }
						]}
						onChange={value => setAttributes({ orderby: value })}
					/>
					<SelectControl
						label={__("Order")}
						value={attributes.order}
						options={[
							{ label: __("ASC"), value: "asc" },
							{ label: __("DESC"), value: "desc" }
						]}
						onChange={value => setAttributes({ order: value })}
					/>
					<SelectControl
						label={__("Columns Layout")}
						value={attributes.columns}
						help={__("Select column number. Default is 1")}
						options={[
							{ label: __("Column 1"), value: "1" },
							{ label: __("Column 2"), value: "2" },
							{ label: __("Column 3"), value: "3" },
							{ label: __("Column 4"), value: "4" }
						]}
						onChange={value => setAttributes({ columns: value })}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default inspector;

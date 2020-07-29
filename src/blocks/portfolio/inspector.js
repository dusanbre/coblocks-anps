import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
	TextControl,
	SelectControl,
	PanelBody,
	Spinner
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { FetchCategories } from "./fetchApi";

export default function inspector(props) {
	const { attributes, setAttributes } = props;

	const porfolioCatRes = FetchCategories();
	setAttributes({
		portfolioCategories: porfolioCatRes
	});

	let category;
	if (attributes.portfolioCategories.length === 0) {
		category = [{ label: "Loading...", value: "" }];
	} else {
		category = attributes.portfolioCategories.map(cat => {
			return { label: cat.name, value: cat.id };
		});
		category.push({ label: "ALL", value: "" });
	}

	// console.log(category);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Portfolio Settings")} initialOpen={true}>
					<TextControl
						label={__("Number of portfolio posts")}
						help={__("Enter number of portfolio posts.")}
						value={attributes.perPage}
						onChange={value => setAttributes({ perPage: value })}
					/>
					<SelectControl
						label={__("Show in row")}
						value={attributes.inRow}
						options={[
							{ label: __("6"), value: "col-md-2" },
							{ label: __("4"), value: "col-md-3" },
							{ label: __("3"), value: "col-md-4" },
							{ label: __("2"), value: "col-md-6" }
						]}
						onChange={value => setAttributes({ inRow: value })}
					/>
					<SelectControl
						label={__("Show in row")}
						value={attributes.selectedCategory}
						options={category}
						onChange={value => setAttributes({ selectedCategory: value })}
						help={__("Select portfolio categories.")}
					/>
					<SelectControl
						label={__("Filter")}
						value={attributes.filter}
						options={[
							{ label: __("On"), value: "on" },
							{ label: __("Off"), value: "off" }
						]}
						onChange={value => setAttributes({ filter: value })}
					/>
					<SelectControl
						label={__("Order By")}
						value={attributes.orderby}
						options={[
							{ label: __("Date"), value: "date" },
							{ label: __("ID"), value: "id" },
							{ label: __("Title"), value: "title" },
							{ label: __("Name"), value: "name" }
						]}
						onChange={value => setAttributes({ orderby: value })}
						help={__("Enter order by.")}
					/>
					<SelectControl
						label={__("Order")}
						value={attributes.order}
						options={[
							{ label: __("ASC"), value: "asc" },
							{ label: __("DESC"), value: "desc" }
						]}
						onChange={value => setAttributes({ order: value })}
						help={__("Enter order by.")}
					/>
					<SelectControl
						label={__("Mobile view")}
						value={attributes.mobileView}
						options={[
							{ label: __("Column 2"), value: "2" },
							{ label: __("Column 1"), value: "1" }
						]}
						onChange={value => setAttributes({ mobileView: value })}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__("Colors Settings", "anpsblocks")}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.itemTextColor,
							onChange: value => {
								setAttributes({ itemTextColor: value });
							},
							label: __("Text Color", "anpsblocks")
						},
						{
							value: attributes.itemTitleColor,
							onChange: value => {
								setAttributes({ itemTitleColor: value });
							},
							label: __("Title Color", "anpsblocks")
						},
						{
							value: attributes.itemBgColor,
							onChange: value => {
								setAttributes({ itemBgColor: value });
							},
							label: __("Background Color", "anpsblocks")
						}
					]}
				></PanelColorSettings>
			</InspectorControls>
		</Fragment>
	);
}

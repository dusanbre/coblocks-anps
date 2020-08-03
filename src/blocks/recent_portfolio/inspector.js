import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
	TextControl,
	SelectControl,
	PanelBody,
	CheckboxControl
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { FetchCategories } from "../portfolio/fetchApi";

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
				<PanelBody title={__("Recent Portfolio Settings")} initialOpen={true}>
					<TextControl
						label={__("Recent Title")}
						help={__("Enter recent title")}
						value={attributes.title}
						onChange={value => setAttributes({ title: value })}
					/>
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
							{ label: __("4"), value: "col-md-3" },
							{ label: __("3"), value: "col-md-4" }
						]}
						onChange={value => setAttributes({ inRow: value })}
					/>
					<SelectControl
						label={__("Select Category")}
						value={attributes.selectedCategory}
						options={category}
						onChange={value => setAttributes({ selectedCategory: value })}
						help={__("Select portfolio categories.")}
					/>
					<CheckboxControl
						heading="Hide Filter"
						label="Yes"
						checked={attributes.filter}
						onChange={value => setAttributes({ filter: value })}
					/>
				</PanelBody>
				<PanelColorSettings
					title={__("Colors Settings", "anpsblocks")}
					initialOpen={false}
					colorSettings={[
						{
							value: attributes.titleColor,
							onChange: value => {
								setAttributes({ titleColor: value });
							},
							label: __("Title Color", "anpsblocks")
						},
						{
							value: attributes.bgColor,
							onChange: value => {
								setAttributes({ bgColor: value });
							},
							label: __("Background Color", "anpsblocks")
						},
						{
							value: attributes.itemTextColor,
							onChange: value => {
								setAttributes({ itemTextColor: value });
							},
							label: __("Item Text Color", "anpsblocks")
						},
						{
							value: attributes.itemTitleColor,
							onChange: value => {
								setAttributes({ itemTitleColor: value });
							},
							label: __("Item Title Color", "anpsblocks")
						},
						{
							value: attributes.itemBgColor,
							onChange: value => {
								setAttributes({ itemBgColor: value });
							},
							label: __("Item Background Color", "anpsblocks")
						}
					]}
				></PanelColorSettings>
			</InspectorControls>
		</Fragment>
	);
}

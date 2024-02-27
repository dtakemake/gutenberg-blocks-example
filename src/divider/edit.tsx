import React from 'react';
import { Attributes } from './@types';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import * as i18n from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const Edit = ( {
	attributes,
	setAttributes,
}: BlockEditProps< Attributes > ) => {
	/**
	 * Инлайн будем передавать только акцентный цвет ( default red )
	 */
	let style = null;

	if ( attributes.color ) {
		style = {
			'--herocode-divider--color': attributes.color,
		} as React.CSSProperties;
	}

	const blockProps = useBlockProps( { style } );

	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings
					// @ts-ignore
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					disableCustomColors={ false }
					title={ i18n.__( 'Colors', 'hcp-blocks' ) }
					enableAlpha={ true }
					colorSettings={ [
						// Input
						{
							value: attributes.color,
							onChange: ( color: string ) =>
								setAttributes( { color } ),
							label: i18n.__( 'Color', 'hcp-blocks' ),
						},
					] }
				/>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="herocode-divider"></div>
			</div>
		</Fragment>
	);
};

export default Edit;

import React from 'react';
import { Attributes } from './@types';

/**
 * WordPress dependencies
 */
import { BlockSaveProps } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes }: BlockSaveProps< Attributes > ) => {
	/**
	 * Инлайн будем передавать только акцентный цвет
	 */
	let style = null;

	if ( attributes.color ) {
		style = {
			'--herocode-divider--color': attributes.color,
		} as React.CSSProperties;
	}

	const blockProps = useBlockProps.save( { style } );

	return (
		<div { ...blockProps }>
			<div className="herocode-divider"></div>
		</div>
	);
};

export default Save;

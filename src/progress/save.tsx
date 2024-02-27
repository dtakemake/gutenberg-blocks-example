import React from 'react';
import { Attributes } from './@types';

/**
 * WordPress dependencies
 */
import { BlockSaveProps } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

const Save = ( { attributes }: BlockSaveProps< Attributes > ) => {
	const blockProps = useBlockProps.save( {
		className: `herocode-progress herocode-progress-${ attributes.clientId }`,
	} );

	return (
		<div { ...blockProps }>
			<div className={ `herocode-progress__bar` }></div>
		</div>
	);
};

export default Save;

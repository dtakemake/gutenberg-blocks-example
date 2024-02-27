import React from 'react';
import { Attributes } from './@types';

/**
 * WordPress dependencies
 */
import { BlockSaveProps } from '@wordpress/blocks';
import {
	useBlockProps,

	// @ts-ignore
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const Save = ( { attributes }: BlockSaveProps< Attributes > ) => {
	const blockProps = useBlockProps.save( {
		className: `herocode-backgrounds-${ attributes.clientId }`,
	} );

	const innerBlockProps = useInnerBlocksProps.save( {
		className: 'herocode-backgrounds-content',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlockProps }></div>
			<div
				className={ `herocode-backgrounds herocode-backgrounds-${ attributes.placement }` }
			>
				<div
					className={ `herocode-backgrounds-inner${
						attributes.turnOver ? ' is-turn-over' : ''
					}` }
				></div>
			</div>
		</div>
	);
};

export default Save;

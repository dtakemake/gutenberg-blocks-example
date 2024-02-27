import React from 'react';
import { Attributes } from './@types';
import RemixIcon from '../components/remixicon/RemixIcon';

/**
 * WordPress dependencies
 */
import { BlockSaveProps } from '@wordpress/blocks';
import {
	useBlockProps,

	// @ts-ignore
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

const Save = ( { attributes }: BlockSaveProps< Attributes > ) => {
	const blockProps = useBlockProps.save( {
		className: `herocode-offcanvas-${ attributes.clientId }`,
	} );

	const innerBlockProps = useInnerBlocksProps.save( {
		className: 'herocode-offcanvas-body',
	} );

	return (
		<div { ...blockProps }>
			<div
				className={ `herocode-offcanvas herocode-offcanvas-${ attributes.placement }` }
			>
				<div className="herocode-offcanvas-close">
					<span></span>
				</div>
				<div { ...innerBlockProps }></div>
			</div>
			<div className="herocode-offcanvas-overlay"></div>
			{ attributes.togglerType === 'text' && (
				<RichText.Content
					tagName="span"
					value={ attributes.togglerText }
					className="herocode-offcanvas-toggler herocode-offcanvas-toggler--type-text"
					data-herocode-client-id={ attributes.clientId }
				/>
			) }
			{ attributes.togglerType === 'icon' && (
				<span
					className="herocode-offcanvas-toggler herocode-offcanvas-toggler--type-icon"
					data-herocode-client-id={ attributes.clientId }
				>
					<RemixIcon path={ attributes.togglerIconPath } />
				</span>
			) }
		</div>
	);
};

export default Save;

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
import { BlockSaveProps } from '@wordpress/blocks';
import {
	useBlockProps,

	// @ts-ignore
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const Save = ( { attributes }: BlockSaveProps< Attributes > ) => {
	const blockProps = useBlockProps.save( {
		className: `herocode-line-clamp herocode-line-clamp-${ attributes.clientId }`,
	} );

	return <div { ...useInnerBlocksProps.save( blockProps ) } />;
};

export default Save;

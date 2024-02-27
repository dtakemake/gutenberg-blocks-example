import React from 'react';
import { Attributes } from './@types';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import * as i18n from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';

import edit from './edit';
import save from './save';

// @ts-ignore
registerBlockType< Attributes >( 'herocode/progress', {
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<rect width="24" height="24" fill="white" />
			<rect x="9" y="8" width="15" height="2" fill="#282E40" />
			<rect x="18" y="12" width="6" height="2" fill="#282E40" />
			<rect x="12" y="16" width="12" height="2" fill="#282E40" />
			<rect x="15" y="20" width="9" height="2" fill="#282E40" />
			<rect y="8" width="7" height="2" fill="#18C23D" />
			<rect y="12" width="16" height="2" fill="#18C23D" />
			<rect y="16" width="10" height="2" fill="#18C23D" />
			<rect y="20" width="13" height="2" fill="#18C23D" />
			<path d="M18 6V2L21 4L18 6Z" fill="#18C23D" />
			<path d="M13 6V2L16 4L13 6Z" fill="#18C23D" />
			<path d="M8 6V2L11 4L8 6Z" fill="#18C23D" />
			<path d="M3 6V2L6 4L3 6Z" fill="#18C23D" />
		</svg>
	),

	edit,
	save,

	example: {
		attributes: {
			width: '75%',
			'overlay-backgroundColor': 'rgb(241,241,241)',
			backgroundColor: 'var(--wp--preset--color--primary)',
		},
	},

	// move from block.json
	title: i18n.__( 'Herocode Progress', 'hcp-blocks' ),
	description: i18n.__( 'Herocode Progress description.', 'hcp-blocks' ),
	category: 'hcp-blocks',
} );

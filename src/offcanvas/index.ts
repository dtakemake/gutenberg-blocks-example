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

import variations from './variations';

// @ts-ignore
registerBlockType< Attributes >( 'herocode/offcanvas', {
	edit,
	save,

	variations,

	example: {
		attributes: {},
	},

	// move from block.json
	title: i18n.__( 'Offcanvas', 'hcp-blocks' ),
	description: i18n.__(
		'Build hidden sidebars into your project for navigation, shopping carts, and more.',
		'hcp-blocks'
	),
	category: 'hcp-blocks',
} );

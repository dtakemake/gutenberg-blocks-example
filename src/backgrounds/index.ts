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
registerBlockType< Attributes >( 'herocode/backgrounds', {
	edit,
	save,

	variations,

	example: {
		attributes: {
			backgroundColor: 'var(--wp--preset--color--primary)',
			fill: '#fff',
			className: 'is-style-sinusoid',
			minHeight: '200px',
		},
	},

	// move from block.json
	title: i18n.__( 'Backgrounds', 'hcp-blocks' ),
	description: i18n.__(
		'Create a awesome block with a beautiful backgrounds.',
		'hcp-blocks'
	),
	category: 'hcp-blocks',
} );

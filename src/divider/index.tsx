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
registerBlockType< Attributes >( 'herocode/divider', {
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<rect width="24" height="24" fill="white" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0 5.35698V2.5858L1.43051e-05 2.58578L0.707121 3.29289C1.93146 4.51723 3.02544 5 4.00001 5C4.97459 5 6.06857 4.51723 7.29291 3.29289L8.00002 2.58578L8.70712 3.29289C9.93146 4.51723 11.0254 5 12 5C12.9746 5 14.0686 4.51723 15.2929 3.29289L16 2.58578L16.7071 3.29289C17.9315 4.51723 19.0254 5 20 5C20.9746 5 22.0686 4.51723 23.2929 3.29289L24 2.5858V5.35698C22.755 6.40139 21.4195 7 20 7C18.5805 7 17.245 6.40139 16 5.35696C14.755 6.40139 13.4195 7 12 7C10.5805 7 9.245 6.40139 8.00002 5.35696C6.75503 6.40139 5.41954 7 4.00001 7C2.58049 7 1.245 6.40139 1.52588e-05 5.35696C1.01725e-05 5.35697 5.08626e-06 5.35697 0 5.35698Z"
				fill="#18C13D"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0 13.357V10.643C0.23906 10.8436 0.474782 11.0606 0.707123 11.2929C1.93146 12.5172 3.02544 13 4.00002 13C4.97459 13 6.06857 12.5172 7.29291 11.2929C8.73524 9.85056 10.3079 9 12 9C13.6921 9 15.2648 9.85056 16.7071 11.2929C17.9315 12.5172 19.0254 13 20 13C20.9746 13 22.0686 12.5172 23.2929 11.2929C23.5252 11.0606 23.761 10.8436 24 10.643V13.357C22.755 14.4014 21.4195 15 20 15C18.3079 15 16.7352 14.1494 15.2929 12.7071C14.0686 11.4828 12.9746 11 12 11C11.0254 11 9.93146 11.4828 8.70712 12.7071C7.26479 14.1494 5.69211 15 4.00002 15C2.58049 15 1.24499 14.4014 0 13.357Z"
				fill="#18C13D"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0 23H4V19H8V23H16V19H20V23H24V21H22V17H14V21H10V17H2V21H0V23Z"
				fill="#282E40"
			/>
		</svg>
	),

	edit,
	save,

	example: {
		attributes: {
			color: 'var(--wp--preset--color--primary)',
			className: 'is-style-garden',
		},
	},

	// move from block.json
	title: i18n.__( 'Divider', 'hcp-blocks' ),
	description: i18n.__(
		'Create a awesome break between ideas or sections with a horizontal divider.',
		'hcp-blocks'
	),
	category: 'hcp-blocks',
} );

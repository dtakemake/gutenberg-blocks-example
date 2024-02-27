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
registerBlockType< Attributes >( 'herocode/line-clamp', {
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
				d="M5.92895 14H3.10052L2 15.1005V17.9289L5.92895 14Z"
				fill="#282E40"
			/>
			<path
				d="M3.58581 22H2V20.7574L8.75738 14H11.5858L3.58581 22Z"
				fill="#282E40"
			/>
			<path
				d="M9.24265 22H6.41423L14.4142 14H17.2427L9.24265 22Z"
				fill="#282E40"
			/>
			<path
				d="M14.8995 22H12.0711L20.0711 14H22V14.8995L14.8995 22Z"
				fill="#282E40"
			/>
			<path
				d="M20.5564 22H17.7279L22 17.7279V20.5564L20.5564 22Z"
				fill="#282E40"
			/>
			<rect
				x="22"
				y="2"
				width="2"
				height="8"
				transform="rotate(90 22 2)"
				fill="#18C23D"
			/>
			<rect
				x="22"
				y="6"
				width="2"
				height="8"
				transform="rotate(90 22 6)"
				fill="#18C23D"
			/>
			<rect
				x="22"
				y="10"
				width="2"
				height="8"
				transform="rotate(90 22 10)"
				fill="#18C23D"
			/>
			<path
				d="M9.88279 11.5378V11.1751C9.88279 10.9348 9.69868 10.7345 9.46037 10.7149C9.27728 10.6995 9.0942 10.6831 8.91112 10.6636C8.55825 10.6266 8.16958 10.5876 8.16958 10.1469L8.16754 3.33128C9.55856 3.31073 10.3205 4.11916 10.7246 5.31587C10.789 5.50796 10.968 5.63739 11.1695 5.63739H11.5397C11.7944 5.63739 12 5.43092 12 5.17514V2.46225C12 2.20647 11.7944 2 11.5397 2H2.46026C2.20558 2 2 2.20647 2 2.46225V5.17514C2 5.43092 2.20558 5.63739 2.46026 5.63739H2.83052C3.03201 5.63739 3.21101 5.50796 3.27544 5.31587C3.67843 4.11916 4.44144 3.31073 5.83246 3.33128L5.8294 10.1469C5.8294 10.5876 5.44073 10.6266 5.08786 10.6636C4.90478 10.6831 4.72169 10.6995 4.53861 10.715C4.3003 10.7345 4.11619 10.9348 4.11619 11.1751V11.5378C4.11619 11.7935 4.32178 12 4.57645 12H9.42252C9.67618 12 9.88279 11.7925 9.88279 11.5378Z"
				fill="#18C23D"
			/>
		</svg>
	),

	edit,
	save,

	example: {
		attributes: {
			mobile: {
				margin: {
					top: '24px',
					right: '',
					bottom: '24px',
					left: '',
				},
				lineClamp: '3',
			},
			tablet: {
				margin: {
					top: '24px',
					right: '',
					bottom: '24px',
					left: '',
				},
				lineClamp: '3',
			},
			desktop: {
				margin: {
					top: '24px',
					right: '',
					bottom: '24px',
					left: '',
				},
				lineClamp: '3',
			},
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#0693e3',
					fontSize: 'large',
					/* translators: example text. */
					content: i18n.__(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
					),
				},
			},
		],
	},

	// move from block.json
	title: i18n.__( 'Adaptive line-clamp', 'hcp-blocks' ),
	description: i18n.__( 'Adaptive line-clamp description.', 'hcp-blocks' ),
	category: 'hcp-blocks',
} );

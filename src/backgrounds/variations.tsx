import React from 'react';
import { Attributes } from './@types';
import IconVariation from './IconVariation';

/**
 * WordPress dependencies
 */
import * as i18n from '@wordpress/i18n';

interface IVariation {
	name: Attributes[ 'placement' ];
	title: string;
	description: string;
	attributes: Partial< Attributes >;
	isDefault?: boolean;
	scope: Array< string >;
	isActive: ( arg: Attributes ) => boolean;
	icon: JSX.Element;
}

const variations: Array< IVariation > = [
	/*{
		name: 'start',
		title: i18n.__( 'Backgrounds start', 'hcp-blocks' ),
		description: i18n.__( 'Фон слева', 'hcp-blocks' ),
		attributes: { placement: 'start' },
		scope: [ 'block', 'inserter', 'transform' ],
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'start'
		},
		icon: <IconVariation placement="start" />
	},*/
	{
		name: 'top',
		title: i18n.__( 'Backgrounds top', 'hcp-blocks' ),
		description: i18n.__( 'Фон сверху', 'hcp-blocks' ),
		attributes: { placement: 'top' },
		scope: [ 'block', 'inserter', 'transform' ],
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'top';
		},
		icon: <IconVariation placement="top" />,
	},
	/*{
		name: 'end',
		title: i18n.__( 'Backgrounds end', 'hcp-blocks' ),
		description: i18n.__( 'Фон справа', 'hcp-blocks' ),
		attributes: { placement: 'end' },
		scope: [ 'block', 'inserter', 'transform' ],
		isDefault: true,
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'end'
		},
		icon: <IconVariation placement="end" />
	},*/
	{
		name: 'bottom',
		title: i18n.__( 'Backgrounds bottom', 'hcp-blocks' ),
		description: i18n.__( 'Фон снизу', 'hcp-blocks' ),
		attributes: { placement: 'bottom' },
		scope: [ 'block', 'inserter', 'transform' ],
		isDefault: true,
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'bottom';
		},
		icon: <IconVariation placement="bottom" />,
	},
];

export default variations;

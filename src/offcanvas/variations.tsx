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
	{
		name: 'start',
		title: i18n.__( 'Offcanvas start', 'hcp-blocks' ),
		description: i18n.__( 'Панель выезжает слева', 'hcp-blocks' ),
		attributes: { placement: 'start' },
		isDefault: true,
		scope: [ 'block', 'inserter', 'transform' ],
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'start';
		},
		icon: <IconVariation placement="start" />,
	},
	{
		name: 'top',
		title: i18n.__( 'Offcanvas top', 'hcp-blocks' ),
		description: i18n.__( 'Панель выезжает сверху', 'hcp-blocks' ),
		attributes: { placement: 'top' },
		scope: [ 'block', 'inserter', 'transform' ],
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'top';
		},
		icon: <IconVariation placement="top" />,
	},
	{
		name: 'end',
		title: i18n.__( 'Offcanvas end', 'hcp-blocks' ),
		description: i18n.__( 'Панель выезжает справа', 'hcp-blocks' ),
		attributes: { placement: 'end' },
		scope: [ 'block', 'inserter', 'transform' ],
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'end';
		},
		icon: <IconVariation placement="end" />,
	},
	{
		name: 'bottom',
		title: i18n.__( 'Offcanvas bottom', 'hcp-blocks' ),
		description: i18n.__( 'Панель выезжает снизу', 'hcp-blocks' ),
		attributes: { placement: 'bottom' },
		scope: [ 'block', 'inserter', 'transform' ],
		isActive: ( blockAttributes: Attributes ) => {
			return blockAttributes.placement === 'bottom';
		},
		icon: <IconVariation placement="bottom" />,
	},
];

export default variations;

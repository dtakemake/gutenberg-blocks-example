import React from 'react';
import TabDevice from './TabDevice';
import { useBlockAdaptiveStyleVariables } from './../hooks/use-block-style-variables';

// types
import { OnChangeCssProperty, Attributes } from './@types';
import { Device } from './../@types';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import * as i18n from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { BlockEditProps } from '@wordpress/blocks';
import {
	Panel,
	PanelBody,

	// @ts-ignore
	__experimentalToggleGroupControl as ToggleGroupControl,

	// @ts-ignore
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,

	// @ts-ignore
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Fragment, useState, useEffect } from '@wordpress/element';

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	// единожды сохраним clientId при инстанцировании
	useEffect( () => {
		// и изменим при копировании
		if (
			! attributes.clientId ||
			( attributes.clientId && attributes.clientId !== clientId )
		) {
			setAttributes( { clientId } );
		}
	}, [ attributes.clientId, setAttributes, clientId ] );

	// настройки какого устройства
	const [ device, setDevice ] = useState< Device >( 'desktop' );

	const { hasInnerBlocks } = useSelect(
		( select ) => {
			// @ts-ignore
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );

			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);

	// additional classnames
	const blockDesktopStyleVariables = useBlockAdaptiveStyleVariables(
		'line-clamp',
		'desktop',
		attributes[ 'desktop' ]
	);
	const blockTabletStyleVariables = useBlockAdaptiveStyleVariables(
		'line-clamp',
		'tablet',
		attributes[ 'tablet' ]
	);
	const blockMobileStyleVariables = useBlockAdaptiveStyleVariables(
		'line-clamp',
		'mobile',
		attributes[ 'mobile' ]
	);

	const blockProps = useBlockProps( {
		className: `herocode-line-clamp herocode-line-clamp-${ attributes.clientId }`,
	} );

	// проверка наличия вложенных блоков
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [
			'core/paragraph',
			'core/heading',
			'core/post-title',
			'core/post-excerpt',
			'core/code',
		],
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	// метод смены значения отступов и границ и
	// метод смены минимальной высоты блока
	const onChangeDeviceCssProperty: (
		device: Device
	) => OnChangeCssProperty =
		( device ) =>
		( { type, cssProperty, value } ) => {
			if ( type === 'string' ) {
				setAttributes( {
					[ device ]: {
						...attributes[ device ],
						[ cssProperty ]: value,
					},
				} );
			} else {
				setAttributes( {
					[ device ]: {
						...attributes[ device ],
						[ cssProperty ]: {
							...attributes[ device ][ cssProperty ],
							...value,
						},
					},
				} );
			}
		};

	return (
		<Fragment>
			<InspectorControls>
				<Panel>
					<div style={ { borderTop: '1px solid #e0e0e0' } }>
						<PanelBody
							title={ i18n.__( 'Device settings', 'hcp-blocks' ) }
						>
							<ToggleGroupControl
								label={ i18n.__(
									'Select device',
									'hcp-blocks'
								) }
								onChange={ ( device: Device ) =>
									setDevice( device )
								}
								size="default"
								value={ device }
							>
								<ToggleGroupControlOption
									label="Mobile"
									value="mobile"
								/>
								<ToggleGroupControlOption
									label="Tablet"
									value="tablet"
								/>
								<ToggleGroupControlOption
									label="Desktop"
									value="desktop"
								/>
							</ToggleGroupControl>
							{ device === 'mobile' && (
								<TabDevice
									onChangeCssProperty={ onChangeDeviceCssProperty(
										'mobile'
									) }
									values={ attributes.mobile }
								/>
							) }
							{ device === 'tablet' && (
								<TabDevice
									onChangeCssProperty={ onChangeDeviceCssProperty(
										'tablet'
									) }
									values={ attributes.tablet }
								/>
							) }
							{ device === 'desktop' && (
								<TabDevice
									onChangeCssProperty={ onChangeDeviceCssProperty(
										'desktop'
									) }
									values={ attributes.desktop }
								/>
							) }
						</PanelBody>
					</div>
				</Panel>
			</InspectorControls>
			<div { ...innerBlocksProps } />
			<style>
				{ `.herocode-line-clamp-${ attributes.clientId } { ${ blockDesktopStyleVariables };${ blockTabletStyleVariables };${ blockMobileStyleVariables } }` }
			</style>
		</Fragment>
	);
};

export default Edit;

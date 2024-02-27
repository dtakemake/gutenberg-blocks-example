import React from 'react';
import { useBlockStyleVariables } from './../hooks/use-block-style-variables';
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
import { BlockEditProps } from '@wordpress/blocks';
import {
	InspectorControls,
	useBlockProps,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	Flex,
	FlexItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

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

	// стили самого контейнера
	const blockStyleVariables = useBlockStyleVariables( 'progress', {
		backgroundColor: attributes[ 'backgroundColor' ],
		width: attributes[ 'width' ],
		height: attributes[ 'height' ],
	} );

	// стили Overlay
	const overlayStyleVariables = useBlockStyleVariables( 'progress-overlay', {
		backgroundColor: attributes[ 'overlay-backgroundColor' ],
	} );

	// атрибуты для вывода
	const blockProps = useBlockProps( {
		className: `herocode-progress herocode-progress-${ clientId }`,
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ i18n.__( 'Settings', 'hcp-blocks' ) }>
					<PanelRow>
						<Flex>
							<FlexItem style={ { width: '50%' } }>
								<UnitControl
									label={ i18n.__( 'Width', 'hcp-blocks' ) }
									onChange={ ( width ) =>
										setAttributes( { width } )
									}
									value={ attributes.width }
									units={ [
										{ value: '%', label: '%', default: 0 },
									] }
									min={ 0 }
									max={ 100 }
								/>
							</FlexItem>
							<FlexItem style={ { width: '50%' } }>
								<UnitControl
									label={ i18n.__( 'Height', 'hcp-blocks' ) }
									onChange={ ( height ) =>
										setAttributes( { height } )
									}
									value={ attributes.height }
									units={ [
										{
											value: 'px',
											label: 'px',
											default: 0,
										},
										{ value: '%', label: '%', default: 0 },
										{
											value: 'em',
											label: 'em',
											default: 0,
										},
										{
											value: 'rem',
											label: 'rem',
											default: 0,
										},
									] }
								/>
							</FlexItem>
						</Flex>
					</PanelRow>
				</PanelBody>
				<PanelColorSettings
					// @ts-ignore
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					disableCustomColors={ false }
					title={ i18n.__( 'Colors', 'hcp-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor: string ) =>
								setAttributes( { backgroundColor } ),
							label: i18n.__( 'Background', 'hcp-blocks' ),
						},
						{
							value: attributes[ 'overlay-backgroundColor' ],
							onChange: ( overlayBackgroundColor: string ) =>
								setAttributes( {
									'overlay-backgroundColor':
										overlayBackgroundColor,
								} ),
							label: i18n.__(
								'Overlay background',
								'hcp-blocks'
							),
						},
					] }
				/>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="herocode-progress__bar"></div>
			</div>
			<style>
				{ `.herocode-progress-${ clientId } { ${ blockStyleVariables };${ overlayStyleVariables } }` }
			</style>
		</Fragment>
	);
};

export default Edit;

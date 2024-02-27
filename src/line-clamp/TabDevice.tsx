import React from 'react';
import { PropsTabSetting } from './@types';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import * as i18n from '@wordpress/i18n';
import {
	PanelRow,
	Flex,
	FlexItem,
	FlexBlock,
	ToggleControl,

	// @ts-ignore
	__experimentalUnitControl as UnitControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// надо создать для каждого устройства свой вариант настроек
const TabDevice = ( {
	onChangeCssProperty,
	values: { margin, lineClamp },
}: PropsTabSetting ) => {
	return (
		<Fragment>
			<PanelRow>
				<Flex>
					<FlexItem style={ { width: '100%' } }>
						{ i18n.__( 'Margin', 'hcp-blocks' ) }
					</FlexItem>
				</Flex>
			</PanelRow>
			<PanelRow>
				<Flex>
					<FlexItem style={ { width: '50%' } }>
						<UnitControl
							label="Top"
							onChange={ ( value: string ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { top: value },
								} )
							}
							value={ margin.top === 'auto' ? '' : margin.top }
							disabled={ margin.top === 'auto' }
						/>
					</FlexItem>
					<FlexItem style={ { width: '50%', paddingTop: '30px' } }>
						<ToggleControl
							label="Auto"
							checked={ margin.top === 'auto' }
							onChange={ ( e ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { top: e ? 'auto' : '' },
								} )
							}
						/>
					</FlexItem>
				</Flex>
			</PanelRow>
			<PanelRow>
				<Flex>
					<FlexItem style={ { width: '50%' } }>
						<UnitControl
							label="Right"
							onChange={ ( value: string ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { right: value },
								} )
							}
							value={
								margin.right === 'auto' ? '' : margin.right
							}
							disabled={ margin.right === 'auto' }
						/>
					</FlexItem>
					<FlexItem style={ { width: '50%', paddingTop: '30px' } }>
						<ToggleControl
							label="Auto"
							checked={ margin.right === 'auto' }
							onChange={ ( e ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { right: e ? 'auto' : '' },
								} )
							}
						/>
					</FlexItem>
				</Flex>
			</PanelRow>
			<PanelRow>
				<Flex>
					<FlexItem style={ { width: '50%' } }>
						<UnitControl
							label="Bottom"
							onChange={ ( value: string ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { bottom: value },
								} )
							}
							value={
								margin.bottom === 'auto' ? '' : margin.bottom
							}
							disabled={ margin.bottom === 'auto' }
						/>
					</FlexItem>
					<FlexItem style={ { width: '50%', paddingTop: '30px' } }>
						<ToggleControl
							label="Auto"
							checked={ margin.bottom === 'auto' }
							onChange={ ( e ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { bottom: e ? 'auto' : '' },
								} )
							}
						/>
					</FlexItem>
				</Flex>
			</PanelRow>
			<PanelRow>
				<Flex>
					<FlexItem style={ { width: '50%' } }>
						<UnitControl
							label="Left"
							onChange={ ( value: string ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { left: value },
								} )
							}
							value={ margin.left === 'auto' ? '' : margin.left }
							disabled={ margin.left === 'auto' }
						/>
					</FlexItem>
					<FlexItem style={ { width: '50%', paddingTop: '30px' } }>
						<ToggleControl
							label="Auto"
							checked={ margin.left === 'auto' }
							onChange={ ( e ) =>
								onChangeCssProperty( {
									type: 'object',
									cssProperty: 'margin',
									value: { left: e ? 'auto' : '' },
								} )
							}
						/>
					</FlexItem>
				</Flex>
			</PanelRow>
			<PanelRow>
				<Flex>
					<FlexBlock>
						<NumberControl
							label={ i18n.__( 'Line clamp', 'hcp-blocks' ) }
							value={ lineClamp }
							onChange={ ( lineClamp: number ) =>
								onChangeCssProperty( {
									type: 'string',
									cssProperty: 'lineClamp',
									value: String( lineClamp ),
								} )
							}
							min="1"
							max="100"
							step="1"
						/>
					</FlexBlock>
				</Flex>
			</PanelRow>
		</Fragment>
	);
};

export default TabDevice;

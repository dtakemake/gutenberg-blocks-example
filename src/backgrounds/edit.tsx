import React from 'react';
import { Attributes } from './@types';
import { useBlockStyleVariables } from './../hooks/use-block-style-variables';

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
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks,
	store as blockEditorStore,

	// @ts-ignore
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Panel, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
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
	const blockStyleVariables = useBlockStyleVariables( 'backgrounds', {
		backgroundColor: attributes[ 'backgroundColor' ],
		fill: attributes[ 'fill' ],
	} );

	const blockProps = useBlockProps( {
		className: `herocode-backgrounds-${ clientId }`,
	} );

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

	// вложенные блоки
	const innerBlockProps = useInnerBlocksProps(
		{ className: 'herocode-backgrounds-content' },
		{
			templateLock: false,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<Fragment>
			<InspectorControls>
				<Panel>
					<div
						style={ {
							padding: '12px',
							boxSizing: 'border-box',
							borderTop: '1px solid #e0e0e0',
						} }
					>
						<Button
							variant="primary"
							onClick={ () =>
								setAttributes( {
									turnOver: ! attributes.turnOver,
								} )
							}
							style={ {
								width: '100%',
								justifyContent: 'center',
							} }
						>
							{ i18n.__( 'Turn over', 'hcp-blocks' ) }
						</Button>
					</div>
				</Panel>
				<PanelColorSettings
					// @ts-ignore
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					disableCustomColors={ false }
					title={ i18n.__( 'Colors', 'hcp-blocks' ) }
					enableAlpha={ true }
					colorSettings={ [
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor: string ) =>
								setAttributes( { backgroundColor } ),
							label: i18n.__( 'Background color', 'hcp-blocks' ),
						},
						{
							value: attributes.fill,
							onChange: ( fill: string ) =>
								setAttributes( { fill } ),
							label: i18n.__( 'Fill color', 'hcp-blocks' ),
						},
					] }
				/>
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlockProps }></div>
				<div
					className={ `herocode-backgrounds herocode-backgrounds-${ attributes.placement }` }
				>
					<div
						className={ `herocode-backgrounds-inner${
							attributes.turnOver ? ' is-turn-over' : ''
						}` }
					></div>
				</div>
			</div>
			<style>
				{ `.herocode-backgrounds-${ clientId }{${ blockStyleVariables }}` }
			</style>
		</Fragment>
	);
};

export default Edit;

import React from 'react';
import { Attributes } from './@types';
import RemixIcon from '../components/remixicon/RemixIcon';
import RemixIcons from '../components/remixicon/RemixIcons';
import { useBlockStyleVariables } from './../hooks/use-block-style-variables';

/**
 * External dependencies
 */
import classnames from 'classnames';

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
	InnerBlocks,
	store as blockEditorStore,

	// @ts-ignore
	useInnerBlocksProps,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	PanelRow,
	Button,

	// @ts-ignore
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl,

	// @ts-ignore
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	Fragment,
	useState,
	useEffect,
	useCallback,
	useRef,
} from '@wordpress/element';

const Edit = ( {
	attributes,
	setAttributes,
	clientId,
}: BlockEditProps< Attributes > ) => {
	const [ isOpen, setIsOpen ] = useState( false );

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

	// ссылка на контейнер, в котором редактируется контент
	const contentAreaRef = useRef< HTMLDivElement | null >( null );

	useEffect( () => {
		const setContentAreaRef = () => {
			if ( ! contentAreaRef.current ) {
				contentAreaRef.current = document.querySelector(
					'.interface-interface-skeleton__content'
				);
			}
		};

		setContentAreaRef();
	}, [ contentAreaRef.current ] );

	// позиционирование и размеры contentAreaRef.current
	const [ contentAreaRect, setContentAreaRect ] = useState<
		ResizeObserverSize &
			Pick< DOMRect, 'left' | 'top' | 'right' | 'bottom' >
	>( {
		blockSize: 0,
		inlineSize: 0,
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	} );

	// надо прослушать событие изменения размеров контейнера contentAreaRef.current
	const resizeObserverCallback = useCallback(
		( entries: Array< ResizeObserverEntry >, observer: ResizeObserver ) => {
			for ( const entry of entries ) {
				if ( entry.target ) {
					const {
						height: blockSize,
						width: inlineSize,
						left,
						top,
					} = entry.target.getBoundingClientRect();

					// https://learn.javascript.ru/coordinates
					const right = left + inlineSize; // right относительно left
					const bottom = top + blockSize; // bottom относительно top

					// следовательно истинный right: calc( 100% - right )
					// истинный bottom: calc( 100% - bottom )
					setContentAreaRect( {
						blockSize,
						inlineSize,
						left,
						top,
						right,
						bottom,
					} );
				}
			}
		},
		[]
	);

	// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
	useEffect( () => {
		// Создаём экземпляр наблюдателя с указанной функцией колбэка
		const resizeObserver = new ResizeObserver( resizeObserverCallback );

		if ( contentAreaRef.current )
			resizeObserver.observe( contentAreaRef.current );

		return () => resizeObserver.disconnect();
	}, [ contentAreaRef.current ] );

	// стили самого контейнера
	const blockStyleVariables = useBlockStyleVariables( 'offcanvas', {
		color: attributes[ 'color' ],
		backgroundColor: attributes[ 'backgroundColor' ],
		width: attributes[ 'width' ],
		height: attributes[ 'height' ],
		padding: attributes[ 'padding' ],
	} );

	// стили кнопки закрыть
	const buttonCloseStyleVariables = useBlockStyleVariables(
		'offcanvas-close',
		{
			borderColor: attributes[ 'close-borderColor' ],
		}
	);

	// стили Overlay
	const overlayStyleVariables = useBlockStyleVariables( 'offcanvas-overlay', {
		backgroundColor: attributes[ 'overlay-backgroundColor' ],
	} );

	// стили Toggler
	const togglerStyleVariables = useBlockStyleVariables( 'offcanvas-toggler', {
		color: attributes[ 'toggler-color' ],
		width: attributes[ 'toggler-width' ],
		height: attributes[ 'toggler-height' ],
	} );

	const togglerHoverStyleVariables = useBlockStyleVariables(
		'offcanvas-toggler-hover',
		{
			color: attributes[ 'toggler-hover-color' ],
		}
	);

	const blockProps = useBlockProps( {
		className: classnames( `herocode-offcanvas-${ clientId }`, {
			// открыт или закрыт
			'is-open': isOpen,
		} ),

		// позиционирование выезжающего контейнера
		style: {
			[ `--observer-left` ]: `${ contentAreaRect.left }px`,
			[ `--observer-top` ]: `${ contentAreaRect.top }px`,
			[ `--observer-right` ]: `calc(100% - ${ contentAreaRect.right }px)`,
			[ `--observer-bottom` ]: `calc(100% - ${ contentAreaRect.bottom }px)`,
		} as React.CSSProperties,
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
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'herocode-offcanvas-body' },
		{
			templateLock: attributes.templateLock,
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
								setIsOpen( ( isOpen ) => ! isOpen )
							}
							style={ {
								width: '100%',
								justifyContent: 'center',
							} }
						>
							{ i18n.__( 'Toggle panel', 'hcp-blocks' ) }
						</Button>
					</div>
				</Panel>
				<Panel>
					<div style={ { borderBottom: '1px solid #e0e0e0' } }>
						<PanelBody title={ i18n.__( 'Toggler', 'hcp-blocks' ) }>
							<PanelRow>
								<ToggleGroupControl
									label={ i18n.__(
										'Toggler type',
										'hcp-blocks'
									) }
									// @ts-ignore
									onChange={ (
										togglerType: Attributes[ 'togglerType' ]
									) => setAttributes( { togglerType } ) }
									value={ attributes.togglerType }
								>
									<ToggleGroupControlOption
										label="Text"
										value="text"
									/>
									<ToggleGroupControlOption
										label="Icon"
										value="icon"
									/>
								</ToggleGroupControl>
							</PanelRow>
							{ attributes.togglerType === 'icon' && (
								<>
									<PanelRow>
										<div className="remixicon--panel-row">
											<RemixIcon
												path={
													attributes.togglerIconPath
												}
											/>
										</div>
									</PanelRow>
									<RemixIcons
										setAttributes={ (
											iconName: string,
											iconPath: string
										) =>
											setAttributes( {
												togglerIconName: iconName,
												togglerIconPath: iconPath,
											} )
										}
									/>
								</>
							) }
						</PanelBody>
					</div>
				</Panel>
				<Panel>
					<div style={ { borderBottom: '1px solid #e0e0e0' } }>
						<PanelBody
							title={ i18n.__( 'Sizes', 'hcp-blocks' ) }
							initialOpen={ false }
						>
							<PanelRow>
								{
									// у боковых панелей только ширина
									[ 'start', 'end' ].includes(
										attributes.placement
									) && (
										<UnitControl
											label={ i18n.__(
												'Panel width',
												'hcp-blocks'
											) }
											value={ attributes.width }
											onChange={ ( width?: string ) =>
												setAttributes( { width } )
											}
											min={ 0 }
											units={ [
												{
													label: 'px',
													step: 1,
													value: 'px',
												},
												{
													label: 'rem',
													step: 1,
													value: 'rem',
												},
												{
													label: 'vw',
													step: 1,
													value: 'vw',
												},
											] }
											help={ i18n.__(
												'default: 400px',
												'hcp-blocks'
											) }
										/>
									)
								}
								{
									// у верхней и нижней панели - только высота
									[ 'top', 'bottom' ].includes(
										attributes.placement
									) && (
										<UnitControl
											label={ i18n.__(
												'Panel height',
												'hcp-blocks'
											) }
											value={ attributes.height }
											onChange={ ( height?: string ) =>
												setAttributes( { height } )
											}
											min={ 0 }
											units={ [
												{
													label: 'px',
													step: 1,
													value: 'px',
												},
												{
													label: 'rem',
													step: 1,
													value: 'rem',
												},
												{
													label: 'vh',
													step: 1,
													value: 'vh',
												},
											] }
											help={ i18n.__(
												'default: 400px',
												'hcp-blocks'
											) }
										/>
									)
								}
							</PanelRow>
							{ attributes.togglerType === 'icon' && (
								<PanelRow>
									<UnitControl
										label={ i18n.__(
											'Icon size',
											'hcp-blocks'
										) }
										value={ attributes[ 'toggler-width' ] }
										onChange={ (
											togglerIconSize?: string
										) =>
											setAttributes( {
												'toggler-width':
													togglerIconSize,
												'toggler-height':
													togglerIconSize,
											} )
										}
										min={ 0 }
										units={ [
											{
												label: 'px',
												step: 1,
												value: 'px',
											},
										] }
									/>
								</PanelRow>
							) }
						</PanelBody>
					</div>
				</Panel>
				<Panel>
					<div style={ { borderBottom: '1px solid #e0e0e0' } }>
						<PanelBody
							title={ i18n.__( 'Dimensions', 'hcp-blocks' ) }
							initialOpen={ false }
						>
							<PanelRow>
								<BoxControl
									values={ attributes.padding }
									label={ i18n.__( 'Padding', 'hcp-blocks' ) }
									onChange={ (
										padding: Attributes[ 'padding' ]
									) => setAttributes( { padding } ) }
								/>
							</PanelRow>
						</PanelBody>
					</div>
				</Panel>
				<PanelColorSettings
					// @ts-ignore
					__experimentalHasMultipleOrigins
					__experimentalIsRenderedInSidebar
					disableCustomColors={ false }
					title={ i18n.__( 'Panel colors', 'hcp-blocks' ) }
					enableAlpha={ true }
					colorSettings={ [
						// Panel
						{
							value: attributes.color,
							onChange: ( color: string ) =>
								setAttributes( { color } ),
							label: i18n.__(
								'Panel content color',
								'hcp-blocks'
							),
						},
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor: string ) =>
								setAttributes( { backgroundColor } ),
							label: i18n.__(
								'Panel background color',
								'hcp-blocks'
							),
						},
						{
							value: attributes[ 'close-borderColor' ],
							onChange: ( closeBorderColor: string ) =>
								setAttributes( {
									'close-borderColor': closeBorderColor,
								} ),
							label: i18n.__(
								'Button close color',
								'hcp-blocks'
							),
						},
						{
							value: attributes[ 'overlay-backgroundColor' ],
							onChange: ( overlayBackgroundColor: string ) =>
								setAttributes( {
									'overlay-backgroundColor':
										overlayBackgroundColor,
								} ),
							label: i18n.__(
								'Overlay background color',
								'hcp-blocks'
							),
						},
						{
							value: attributes[ 'toggler-color' ],
							onChange: ( toggerColor: string ) =>
								setAttributes( {
									'toggler-color': toggerColor,
								} ),
							label: i18n.__( 'Toggler color', 'hcp-blocks' ),
						},
						{
							value: attributes[ 'toggler-hover-color' ],
							onChange: ( toggerHoverColor: string ) =>
								setAttributes( {
									'toggler-hover-color': toggerHoverColor,
								} ),
							label: i18n.__(
								'Toggler hover color',
								'hcp-blocks'
							),
						},
					] }
				/>
			</InspectorControls>
			<div { ...blockProps }>
				<div
					className={ `herocode-offcanvas herocode-offcanvas-${ attributes.placement }` }
				>
					<div
						className="herocode-offcanvas-close"
						onClick={ () => setIsOpen( false ) }
					>
						<span></span>
					</div>
					<div { ...innerBlocksProps }></div>
				</div>
				<div
					className="herocode-offcanvas-overlay"
					onClick={ () => setIsOpen( false ) }
				></div>
				{ attributes.togglerType === 'text' && (
					<RichText
						tagName="span" // The tag here is the element output and editable in the admin
						className="herocode-offcanvas-toggler"
						value={ attributes.togglerText } // Any existing content, either from the database or an attribute default
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/text-color',
							'core/code',
							'core/strikethrough',
						] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ ( togglerText ) =>
							setAttributes( { togglerText } )
						} // Store updated content as a block attribute
						placeholder={ i18n.__(
							'Toggler text...',
							'hcp-blocks'
						) } // Display this text before any content has been added by the user
					/>
				) }
				{ attributes.togglerType === 'icon' && (
					<span className="herocode-offcanvas-toggler">
						<RemixIcon path={ attributes.togglerIconPath } />
					</span>
				) }
			</div>
			<style>
				{ `.herocode-offcanvas-${ clientId }{${ blockStyleVariables };${ buttonCloseStyleVariables };${ overlayStyleVariables };${ togglerStyleVariables };${ togglerHoverStyleVariables }}` }
			</style>
		</Fragment>
	);
};

export default Edit;

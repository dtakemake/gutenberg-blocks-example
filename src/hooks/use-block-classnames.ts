import { Device } from './../@types';

type Props = {
	[ K in Device ]: Partial<
		Pick<
			CSSStyleDeclaration,
			| 'display'
			| 'flexWrap'
			| 'flexDirection'
			| 'justifyContent'
			| 'alignItems'
			| 'textAlign'
			| 'position'
			| 'overflow'
		>
	>;
};

const useBlockClassnames = ( {
	mobile,
	tablet,
	desktop,
}: Props ): Array< string > => {
	let classNames: Array< string > = [];

	// mobile
	if ( mobile?.display && mobile.display !== 'block' ) {
		// default value for the all HTMLElements while we use
		classNames.push( `display-mobile-${ mobile.display }` );
	}
	if ( mobile?.textAlign ) {
		classNames.push( `textAlign-mobile-${ mobile.textAlign }` );
	}
	if ( mobile?.flexDirection ) {
		classNames.push( `flexDirection-mobile-${ mobile.flexDirection }` );
	}
	if ( mobile?.flexWrap ) {
		classNames.push( `flexWrap-mobile-${ mobile.flexWrap }` );
	}
	if ( mobile?.justifyContent ) {
		classNames.push( `justifyContent-mobile-${ mobile.justifyContent }` );
	}
	if ( mobile?.alignItems ) {
		classNames.push( `alignItems-mobile-${ mobile.alignItems }` );
	}
	if ( mobile?.position && mobile.position !== 'static' ) {
		// default value for the all HTMLElements
		classNames.push( `position-mobile-${ mobile.position }` );
	}
	if ( mobile?.overflow && mobile.overflow !== 'visible' ) {
		// default value for the all HTMLElements
		classNames.push( `overflow-mobile-${ mobile.overflow }` );
	}

	// tablet
	if ( tablet?.display && tablet.display !== 'block' ) {
		classNames.push( `display-tablet-${ tablet.display }` );
	}
	if ( tablet?.textAlign ) {
		classNames.push( `textAlign-tablet-${ tablet.textAlign }` );
	}
	if ( tablet?.flexDirection ) {
		classNames.push( `flexDirection-tablet-${ tablet.flexDirection }` );
	}
	if ( tablet?.flexWrap ) {
		classNames.push( `flexWrap-tablet-${ tablet.flexWrap }` );
	}
	if ( tablet?.justifyContent ) {
		classNames.push( `justifyContent-tablet-${ tablet.justifyContent }` );
	}
	if ( tablet?.alignItems ) {
		classNames.push( `alignItems-tablet-${ tablet.alignItems }` );
	}
	if ( tablet?.position && tablet.position !== 'static' ) {
		classNames.push( `position-tablet-${ tablet.position }` );
	}
	if ( tablet?.overflow && tablet.overflow !== 'visible' ) {
		// default value for the all HTMLElements
		classNames.push( `overflow-tablet-${ tablet.overflow }` );
	}

	// desktop
	if ( desktop?.display && desktop.display !== 'block' ) {
		classNames.push( `display-desktop-${ desktop.display }` );
	}
	if ( desktop?.textAlign ) {
		classNames.push( `textAlign-desktop-${ desktop.textAlign }` );
	}
	if ( desktop?.flexDirection ) {
		classNames.push( `flexDirection-desktop-${ desktop.flexDirection }` );
	}
	if ( desktop?.flexWrap ) {
		classNames.push( `flexWrap-desktop-${ desktop.flexWrap }` );
	}
	if ( desktop?.justifyContent ) {
		classNames.push( `justifyContent-desktop-${ desktop.justifyContent }` );
	}
	if ( desktop?.alignItems ) {
		classNames.push( `alignItems-desktop-${ desktop.alignItems }` );
	}
	if ( desktop?.position && desktop.position !== 'static' ) {
		classNames.push( `position-desktop-${ desktop.position }` );
	}
	if ( desktop?.overflow && desktop.overflow !== 'visible' ) {
		// default value for the all HTMLElements
		classNames.push( `overflow-desktop-${ desktop.overflow }` );
	}

	return classNames;
};

export { useBlockClassnames };

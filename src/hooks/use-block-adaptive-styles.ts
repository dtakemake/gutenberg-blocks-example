import { BoxControlValue } from '@wordpress/components/build-types/box-control/types';
import {
	CSSStyleDeclarationWithDirection,
	DeclarationWithDirection,
	Device,
} from './../@types';

import { convertDirectionToString } from './use-block-style-variables';

const cSSStyleDeclarationWithDirection: Required<
	Array< DeclarationWithDirection >
> = [ 'padding', 'margin', 'borderWidth', 'inset' ];
const CSSStyleDeclarationWhatWeNeed: Array< Partial< CSSStyleDeclaration > > = [
	'gap', // flex
	'minWidth', // flex block position
	'maxWidth', // flex block position
	'flexGrow', // flex       position
	'flexShrink', // flex       position
	'flexGrow', // flex       position
	'minHeight', // flex block position
	'flexBasis', // flex
	'backgroundImage', // flex block
	'order', // flex       position
	'zIndex', // position
	'borderRadius', // position
	'overflow', // position
];

/** Меняет а названии css свойства большую букву на "-" + маленьку */
const upperToHyphenLower = ( match: string ) => '-' + match.toLowerCase();

// нужен метод который будет принимать свойства и возвращать строку
const generateCssString = (
	propertiesDevice: Partial<
		Omit< CSSStyleDeclaration, DeclarationWithDirection >
	> &
		Partial< CSSStyleDeclarationWithDirection >
) => {
	const styles: Array< string > = [];

	for ( let propertyName in propertiesDevice ) {
		// возможно это свойство в виде объекта
		if (
			cSSStyleDeclarationWithDirection.includes(
				propertyName as DeclarationWithDirection
			)
		) {
			// конвертируем в строку свойства
			const propertyValueDirection = propertiesDevice[
				propertyName as DeclarationWithDirection
			] as BoxControlValue;
			const propertyValueString = convertDirectionToString(
				propertyValueDirection
			);

			if ( propertyValueString !== 'undefined' ) {
				styles.push(
					`${ propertyName.replace(
						/[A-Z]/g,
						upperToHyphenLower
					) }:${ propertyValueString }`
				);
			}
		} else if (
			CSSStyleDeclarationWhatWeNeed.includes( propertyName ) &&
			propertiesDevice[ propertyName ]?.trim()
		) {
			/* нужно выполнить преобразование имени переменной, minWidth -> min-width */
			styles.push(
				`${ propertyName.replace( /[A-Z]/g, upperToHyphenLower ) }:${
					propertiesDevice[ propertyName ]
				}${ propertyName === 'zIndex' ? ' !important' : '' }` // для zIndex в админке нужено important
			);
		}
	}

	return styles;
};

type Props = {
	blockName: string;
	clientId: string;

	properties: {
		[ K in Device ]: Partial<
			Omit< CSSStyleDeclaration, DeclarationWithDirection >
		> &
			Partial< CSSStyleDeclarationWithDirection >;
	};
};

type useBlockAdaptiveStyles = ( props: Props ) => string;

const useBlockAdaptiveStyles: useBlockAdaptiveStyles = ( {
	blockName,
	clientId,
	properties,
} ) => {
	// результирующася строка со стилями
	let output = '';

	// класс для текущего блока
	const startClassName = `.herocode-${ blockName }-${ clientId }`;

	/**
	 * 1 step: generating styles for the all devices (without media query)
	 *         we need to check each property for the device
	 */
	if ( 'desktop' in properties ) {
		// свойства для устройства
		const styles = generateCssString( properties[ 'desktop' ] );

		if ( styles.length ) {
			output += `${ startClassName } { ${ styles.join( ';' ) } }`;
		}
	}

	if ( 'tablet' in properties ) {
		// свойства для устройства
		const styles = generateCssString( properties[ 'tablet' ] );

		if ( styles.length ) {
			output += `@media screen and (max-width: 991.98px) { ${ startClassName } { ${ styles.join(
				';'
			) } }}`;
		}
	}

	if ( 'mobile' in properties ) {
		// свойства для устройства
		const styles = generateCssString( properties[ 'mobile' ] );

		if ( styles.length ) {
			output += `@media screen and (max-width: 575.98px) { ${ startClassName } { ${ styles.join(
				';'
			) } }}`;
		}
	}

	return output;
};

export { useBlockAdaptiveStyles };

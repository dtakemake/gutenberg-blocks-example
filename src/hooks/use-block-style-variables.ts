import { BoxControlValue } from '@wordpress/components/build-types/box-control/types';
import {
	CSSStyleDeclarationWithDirection,
	DeclarationWithDirection,
	Device,
} from './../@types';

const cSSStyleDeclarationWithDirection: Required<
	Array< DeclarationWithDirection >
> = [ 'padding', 'margin', 'borderWidth', 'inset' ];

type UseBlockStyleVariables = {
	(
		blockName: string,
		properties: Partial<
			Omit< CSSStyleDeclaration, DeclarationWithDirection >
		> &
			Partial< CSSStyleDeclarationWithDirection >
	): string;
};

type UseBlockAdaptiveStyleVariables = {
	(
		blockName: string,
		device: Device,
		properties: Partial<
			Omit< CSSStyleDeclaration, DeclarationWithDirection >
		> &
			Partial< CSSStyleDeclarationWithDirection >
	): string;
};

/**
 * @param direction type Direction
 * @return string | undefined, the value for css property - example '0px 0px 0px 0px'
 */
const convertDirectionToString = ( direction: BoxControlValue ): string => {
	const values: Array< string > = [];

	if ( 'top' in direction && direction.top ) {
		values.push( direction.top );
	} else {
		values.push( 'undefined' );
	}

	if ( 'right' in direction && direction.right ) {
		values.push( direction.right );
	} else {
		values.push( 'undefined' );
	}

	if ( 'bottom' in direction && direction.bottom ) {
		values.push( direction.bottom );
	} else {
		values.push( 'undefined' );
	}

	if ( 'left' in direction && direction.left ) {
		values.push( direction.left );
	} else {
		values.push( 'undefined' );
	}

	// check unique
	if ( new Set( [ ...values ] ).size === 1 ) {
		return values[ 0 ]; // 'undefined', '0px', '16px' etc..
	}

	/**
	 * если в массиве разные значения
	 * изменим undefined на 0px
	 */
	return values.join( ' ' ).replace( /undefined/g, '0px' );
};

/**
 * generate css variables for device
 * @param blockName
 * @param device
 * @param properties
 * @returns
 */
const useBlockAdaptiveStyleVariables: UseBlockAdaptiveStyleVariables = (
	blockName,
	device,
	properties
) => {
	return useBlockStyleVariables( `${ blockName }--${ device }`, properties );
};

/**
 * generate css variables
 * @param blockName string
 * @param properties object
 * @returns string - css variables
 */
const useBlockStyleVariables: UseBlockStyleVariables = (
	blockName,
	properties
) => {
	// все переменные начинаются с --herocode
	const startVariableName = `--herocode-${ blockName }--`;

	// массив всех значений
	const variables: Array< string > = [];

	for ( let propertyName in properties ) {
		// возможно это свойство в виде объекта
		if (
			cSSStyleDeclarationWithDirection.includes(
				propertyName as DeclarationWithDirection
			)
		) {
			// конвертируем в строку свойства
			const propertyValueDirection = properties[
				propertyName as DeclarationWithDirection
			] as BoxControlValue;
			const propertyValueString = convertDirectionToString(
				propertyValueDirection
			);

			if ( propertyValueString !== 'undefined' ) {
				variables.push(
					`${ startVariableName }${ propertyName }:${ propertyValueString }`
				);
			}
		} else if ( properties[ propertyName ]?.trim() ) {
			variables.push(
				`${ startVariableName }${ propertyName }:${ properties[ propertyName ] }`
			);
		}
	}

	return variables.join( ';' );
};

export {
	convertDirectionToString,
	useBlockStyleVariables,
	useBlockAdaptiveStyleVariables,
};

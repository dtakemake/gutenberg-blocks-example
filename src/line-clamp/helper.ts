import { Attributes } from './@types';

/**
 * helpers
 */
import prepareStylePositions from '../../helpers/prepareStylePositions';
import generateStyleVariable from '../../helpers/generateStyleVariable';

// один метод для всех устройств
const getBlockStyleVariables = ( {
	mobile: { margin: mobileMargin, lineClamp: mobileLineClamp },
	tablet: { margin: tabletMargin, lineClamp: tabletLineClamp },
	desktop: { margin: desktopMargin, lineClamp: desktopLineClamp },
}: Pick< Attributes, 'mobile' | 'tablet' | 'desktop' > ): string => {
	let styles: Array< string > = [];
	const generateStyleVariableMobile = generateStyleVariable(
		'line-clamp',
		'mobile'
	);
	const generateStyleVariableTablet = generateStyleVariable(
		'line-clamp',
		'tablet'
	);
	const generateStyleVariableDesktop = generateStyleVariable(
		'line-clamp',
		'desktop'
	);

	// mobile

	if ( Object.values( mobileMargin ).some( ( value ) => !! value ) )
		styles.push(
			generateStyleVariableMobile(
				'margin',
				prepareStylePositions( mobileMargin )
			)
		);

	if ( mobileLineClamp )
		styles.push(
			generateStyleVariableMobile( 'line-clamp', mobileLineClamp )
		);

	// tablet
	if ( Object.values( tabletMargin ).some( ( value ) => !! value ) )
		styles.push(
			generateStyleVariableTablet(
				'margin',
				prepareStylePositions( tabletMargin )
			)
		);

	if ( tabletLineClamp )
		styles.push(
			generateStyleVariableTablet( 'line-clamp', tabletLineClamp )
		);

	// desktop

	if ( Object.values( desktopMargin ).some( ( value ) => !! value ) )
		styles.push(
			generateStyleVariableDesktop(
				'margin',
				prepareStylePositions( desktopMargin )
			)
		);

	if ( desktopLineClamp )
		styles.push(
			generateStyleVariableDesktop( 'line-clamp', desktopLineClamp )
		);

	return styles.join( ';' );
};

export { getBlockStyleVariables };

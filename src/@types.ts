import { BoxControlValue } from '@wordpress/components/build-types/box-control/types';

// dimensions
type DeclarationWithDirection = 'padding' | 'margin' | 'borderWidth' | 'inset';

// positions
type Direction = BoxControlValue;

// css properties для которых свойство передается в виде объекта
type CSSStyleDeclarationWithDirection = Record<
	DeclarationWithDirection,
	BoxControlValue
>;

// device's types
type Device = 'mobile' | 'tablet' | 'desktop';

export type {
	CSSStyleDeclarationWithDirection,
	DeclarationWithDirection,
	Direction, // нужно удалить
	Device,
};

import { DeclarationWithDirection, Direction, Device } from './../@types';

// Дополнительные стили которые можно редактировать у блока
type CssBlockProperties = {
	lineClamp: string;
};

// размеченное объединение - 1
type OnChangeObject = {
	type: 'object';
	cssProperty: DeclarationWithDirection;
	value: Partial< Direction >;
};

// размеченное объединение - 2
type OnChangeString = {
	type: 'string';
	cssProperty: keyof CssBlockProperties;
	value: string;
};

// методы измненения свойств в зависимости от типа свойства
type OnChangeCssProperty = {
	( args: OnChangeObject ): void;
	( args: OnChangeString ): void;
};

// props которые мы передаем в блок управления стилями для устройств
type PropsTabSetting = {
	// device: Hcp.Device,
	onChangeCssProperty: OnChangeCssProperty;
	values: {
		[ K in DeclarationWithDirection ]: Direction;
	} & CssBlockProperties;
};

// атрибуты блока
type Attributes = {
	// девайс и возможные значения девайса
	[ K in Device ]: {
		[ K in DeclarationWithDirection ]: Direction;
	} & CssBlockProperties; // для каждого устройства
} & {
	clientId: string; // для всех устройств
};

export type { Attributes, PropsTabSetting, OnChangeCssProperty };

import { BoxControlValue } from '@wordpress/components/build-types/box-control/types';

type Attributes = {
	// сам выезжающий контент
	color: string;
	backgroundColor: string;
	width: string;
	height: string;
	padding: BoxControlValue;

	// цвет кнопки закрыть
	'close-borderColor': string;

	// фон overlay
	'overlay-backgroundColor': string;

	// элемент по клику на который
	// открывается панель
	togglerType: 'text' | 'icon';
	togglerText: string;

	// данные выбранной иконки
	togglerIconName: string;
	togglerIconPath: string;

	'toggler-width': string;
	'toggler-height': string;
	'toggler-color': string;
	'toggler-hover-color': string;

	// если сохранили с незакрытой панелью
	// при перезагрузке будет открыта
	// свойство используется только для админки
	// 9/01/24 убрал, чтобы всегда была закрытая (при загрузке)
	// isOpen: boolean;

	// расположение выезжающего контента
	// относительно страницы - вариации
	placement: 'start' | 'top' | 'end' | 'bottom';

	// идентификатор блока
	clientId: string;

	// добавление контента
	templateLock: 'all' | 'insert' | false;
};

export type { Attributes };

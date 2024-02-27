type Attributes = {
	backgroundColor: string;
	fill: string;

	// надо ли развернуть по вертикали
	turnOver: boolean;

	// расположение выезжающего контента
	// относительно страницы - вариации
	placement: 'start' | 'top' | 'end' | 'bottom';

	// идентификатор блока
	clientId: string;
};

export type { Attributes };

import React from 'react';
import { Attributes } from './@types';
import { SVG, Path } from '@wordpress/components';

type Props = {
	placement: Attributes[ 'placement' ];
};

const IconVariation = ( { placement }: Props ) => {
	// будем переворачивать одну иконку
	const rotate =
		placement === 'start'
			? '180deg'
			: placement === 'top'
			? '-90deg'
			: placement === 'bottom'
			? '90deg'
			: '0deg';

	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			width="24px"
			height="24px"
			viewBox="0 0 24 24"
			enableBackground="new 0 0 24 24"
			style={ { transform: `rotate(${ rotate })` } }
		>
			<Path
				d="M21,17h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S21.6,17,21,17z M21,13h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S21.6,13,21,13z M13,7h8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-8c-0.6,0-1,0.4-1,1S12.4,7,13,7z M21,9h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S21.6,9,21,9z M9,5C8.4,5,8,5.4,8,6v12c0,0.6,0.4,1,1,1h0c0.6,0,1-0.4,1-1V6C10,5.4,9.6,5,9,5z M4.6,12l1.1-0.9c0.4-0.4,0.5-1,0.1-1.4c-0.4-0.4-1-0.5-1.4-0.1l-2,1.7c0,0-0.1,0.1-0.1,0.1c-0.4,0.4-0.3,1.1,0.1,1.4l2,1.7c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4c0.4-0.4,0.3-1.1-0.1-1.4L4.6,12z"
				fill="rgb(16, 216, 118)"
			/>
		</SVG>
	);
};

export default IconVariation;
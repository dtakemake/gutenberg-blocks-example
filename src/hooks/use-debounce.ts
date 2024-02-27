import { useState, useEffect } from 'react';

type useDebounce = {
	< T extends unknown >( value: T, delay?: number ): T;
};

const useDebounce: useDebounce = ( value, delay = 1000 ) => {
	const [ debounceValue, setDebounceValue ] = useState( value );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebounceValue( value );
		}, delay );

		return () => clearTimeout( handler );
	}, [ value ] );

	return debounceValue;
};

export default useDebounce;

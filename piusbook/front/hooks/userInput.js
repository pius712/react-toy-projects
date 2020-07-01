import { useState, useCallback } from 'react';

export default initValue => {
	const [value, setValue] = useState(initValue);
	const handler = useCallback(
		e => {
			e.preventDefault();
			setValue(e.target.value);
		},
		[value],
	);
	return [value, handler];
};

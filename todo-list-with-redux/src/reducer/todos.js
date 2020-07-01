// const initialState = {
// 	todos: [],
// };

//action creator
export const addTodo = text => {
	return {
		type: 'ADD_TODO',
		text,
	};
};

export const toggleTodo = index => {
	return {
		type: 'TOGGLE_TODO',
		index,
	};
};
export const deleteTodo = index => {
	return {
		type: 'DELETE_TODO',
		index,
	};
};
// reducer
const reducer = (state = [], action) => {
	console.log(action);
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					text: action.text,
					completed: false,
				},
			];
		case 'TOGGLE_TODO':
			return state.map((item, idx) => {
				if (idx === action.index) {
					return {
						...item,
						completed: !item.completed,
					};
				} else {
					return item;
				}
			});
		case 'DELETE_TODO':
			return state.map((item, idx) => {
				if (idx !== action.index) {
					return item;
				}
			});
		default:
			return state;
	}
};

export default reducer;

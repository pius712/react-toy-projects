import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../reducer/todos';

import styled from 'styled-components';
const List = styled.li`
	list-style: none;
`;
const Todo = ({ idx, todo }) => {
	const dispatch = useDispatch();
	const handleComplete = () => {
		console.log('handleComplete', idx);
		dispatch(toggleTodo(idx));
	};
	const handleDelete = () => {
		dispatch(deleteTodo(idx));
	};
	return todo ? (
		<List>
			<div onClick={handleComplete}>
				{todo && todo.completed ? '🟢' : '🔴'}
				<span>{todo.text}</span>
			</div>
			<button onClick={handleDelete}>삭제</button>
		</List>
	) : null;
};
export default Todo;

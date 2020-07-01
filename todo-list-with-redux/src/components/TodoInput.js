import React, { useState } from 'react';
import { addTodo } from '../reducer/todos';
import { useDispatch } from 'react-redux';
const TodoInput = () => {
	const [todo, setTodo] = useState('');
	const handleChangeTodo = e => {
		setTodo(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(addTodo(todo));
		setTodo('');
	};
	const dispatch = useDispatch();
	return (
		<form onSubmit={handleSubmit}>
			<label>Todo</label>
			<input type="text" value={todo} onChange={handleChangeTodo}></input>
			<button type="submit">생성</button>
		</form>
	);
};

export default TodoInput;

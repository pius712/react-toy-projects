import React from 'react';
import Todo from './Todo.js';
import { useSelector } from 'react-redux';

const TodoList = () => {
	const todos = useSelector(state => state.todos);
	return (
		<div>
			<ul>
				{todos &&
					todos.length > 0 &&
					todos.map((item, index) => (
						<Todo key={index} idx={index} todo={item}></Todo>
					))}
			</ul>
		</div>
	);
};

export default TodoList;

import React from 'react';
import propTypes from 'prop-types';
const TodoList = ({ todoList, handleRemove }) => (
	<div>
		<ul>
			{todoList.map((item, idx) => (
				<li key={idx}>
					<span>{item}</span>
					<button onClick={() => handleRemove(idx)}>삭제</button>
				</li>
			))}
		</ul>
	</div>
);

TodoList.propTypes = {
	todoList: propTypes.array,
	handleRemove: propTypes.func,
};
export default TodoList;

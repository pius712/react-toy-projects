import React from 'react';
import propTypes from 'prop-types';;;;
const TodoInput = ({ todoItem, handleChange, handleSubmit }) => (
	<form onSubmit={handleSubmit}>
		<label>할일</label>
		<input value={todoItem} onChange={handleChange}></input>
		<button type="submit">생성</button>
	</form>
);

TodoInput.propTypes = {
	todoItem: propTypes.string,
	handleChange: propTypes.func,
	handleSubmit: propTypes.func,
};

export default TodoInput;

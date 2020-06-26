import React from 'react';
import AppHeader from './AppHeader';
import TodoInput from './TodoInuput';
import TodoList from './TodoList';
import AppFooter from './AppFooter';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			todoItem: '',
		};
	}

	handleChange = e => {
		console.log('handleChange');

		this.setState({
			todoItem: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log('handleSubmit');
		this.setState(state => {
			state.todoList.push(state.todoItem);
			return { todoList: state.todoList, todoItem: '' };
		});
	};
	handleRemove = idx => {
		this.setState(state => {
			return {
				todoList: state.todoList.filter(
					value => idx !== state.todoList.indexOf(value),
				),
			};
		});
		// console.log(value);
	};
	render() {
		const { todoList, todoItem } = this.state;
		console.log(this.state);
		return (
			<>
				<AppHeader></AppHeader>
				<TodoInput
					todoItem={todoItem}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				></TodoInput>
				<TodoList
					todoList={todoList}
					handleRemove={this.handleRemove}
				></TodoList>
				<AppFooter></AppFooter>
			</>
		);
	}
}

export default App;

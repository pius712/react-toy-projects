import React from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
function App() {
	return (
		<div>
			<AppHeader></AppHeader>
			<TodoInput></TodoInput>
			<TodoList></TodoList>
			<AppFooter></AppFooter>
		</div>
	);
}

export default App;

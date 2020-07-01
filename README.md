# React Toy Project

## calculator

Lifting state up 부분 연습. 하위 컴포넌트에서 state를 상위 컴포넌트로 올려 하위 컴포넌트간의 동기화.

## movie - list

기본적인 react 사용법을 익히기 위한 페이지.
api 사용 없이 static data를 props, state를 통해서 받아서 화면을 구성

## movie - list 2

api를 사용하여 movie list를 만듬.
life cycle, props, state 사용 및 컴포넌트 클래스 분리.

## todo-list

App component에 state를 만들어, input과 list에 props로 받아 렌더링해주는 todo-list.
no styling. create, delete 기능만 구현한 todo-list

## todo-list-with-redux

redux를 사용하여 store를 구현하여 만든 todo-list. 

초기 설정을 하는 것이 조금 어려웠다. 

### create react app으로 프로젝트 생성

`npx create-react-app todo-list-with-redux`

### eslint 설정

eslint-plugin-react-hooks의 경우 CRA에 설정되어 있으므로 따로 설치안해줘도 된다. 
`npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier`

이후 eslintrc 설정

### redux, react-redux 설치

`npm i redux react-redux`

index.js에 
```js
import { Provider } from 'react-redux';
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
```

### redux-devtools-extensions 설치

`npm install --save redux-devtools-extension`

개발용이기 때문에 아래와 같이 설정.

```js
// store/configureStore.js
import { createStore } from 'redux';
import reducer from '../reducer/index.js';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [];
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
```

## piusbook

간단한 sns 앱으로 react, react-redux, redux, redux-saga 등을 사용하여 front end 구현.

mysql과 nodejs를 사용하여 back-end 구현.
import React, { Component } from 'react';
import style from './TodoInput.scss';
import classNames from 'classnames/bind';
class TodoInput extends Component {
    handleKeyPress = (e)=>{
        if(e.key==='Enter'){
            this.props.onInsert();
        }
    }
    render() {
        const cx = classNames.bind(style);
        const { onChange, value, onInsert } = this.props;
        const { handleKeyPress }= this;
        return (
            <div className={cx('todo-input')}>
                <input 
                type='text' 
                onChange={onChange} 
                value={value} 
                onKeyPress={handleKeyPress}/>
                <button 
                className={cx('add-button')} 
                onClick={onInsert}>
                추가
                </button>
            </div>
        );
    }
}

export default TodoInput;
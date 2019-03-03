import React, { Component } from 'react';
import style from './PageTemplate.scss';
import classNames from 'classnames/bind';

class PageTemplate extends Component {
    render() {
        const { children } = this.props;
        const cx = classNames.bind(style);
        return (
            <div className={cx('page-template')}>
                <h1>일정관리</h1>
                <div className={cx('content')}>
                {children}
                </div>
            </div>
        );
    }
}

export default PageTemplate;
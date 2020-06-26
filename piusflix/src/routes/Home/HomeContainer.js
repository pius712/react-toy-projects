import React, { Component } from 'react';
import { movieAPI } from '../../api';
import HomePresenter from './HomePresenter';
class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popular: null,
			topRated: null,
			error: null,
			isLoading: true,
		};
	}
	async componentDidMount() {
		try {
			// throw Error();
			// const res = await movieAPI.fetchPopular();
			const {
				data: { results: popular },
			} = await movieAPI.fetchPopular();
			const {
				data: { results: topRated },
			} = await movieAPI.fetchTopRated();
			// console.log(res);
			// console.log(res2);
			this.setState({
				popular,
				topRated,
			});
		} catch (error) {
			this.setState({
				error: '실패',
			});
		} finally {
			this.setState({
				isLoading: false,
			});
		}
	}
	render() {
		const { popular, topRated, error, isLoading } = this.state;
		console.log(this.state);
		return (
			<HomePresenter
				popular={popular}
				topRated={topRated}
				error={error}
				isLoading={isLoading}
			></HomePresenter>
		);
	}
}

export default HomeContainer;

import React, { Component } from 'react';
import { tvAPI } from '../../api/index.js';
import TVPresenter from './TVPresenter';

export default class TVContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popular: null,
			onAir: null,
			error: null,
			isLoading: true,
		};
	}
	async componentDidMount() {
		// console.log("?")
		try {
			const {
				data: { results: popular },
			} = await tvAPI.fetchPopular();
			const {
				data: { results: onAir },
			} = await tvAPI.fetchOnAir();
			// console.log(res);
			this.setState({
				popular,
				onAir,
			});
		} catch (error) {
			this.setState({
				error: 'data를 불러오지 못했습니다.',
			});
		} finally {
			this.setState({
				isLoading: false,
			});
		}
	}
	render() {
		const { popular, onAir, error, isLoading } = this.state;
		console.log(this.state);
		return (
			<TVPresenter
				popular={popular}
				onAir={onAir}
				error={error}
				isLoading={isLoading}
			></TVPresenter>
		);
	}
}

// export default TVContainer;

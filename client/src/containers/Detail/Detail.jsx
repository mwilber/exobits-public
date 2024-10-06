import React from "react";
import { withRouter } from "react-router";

import Mint from '../../components/Mint/Mint';

class Detail extends React.Component {

	constructor(props) {
		super(props);

		this.state = { key: null, ownerAddress: null };
	}

	componentDidMount(){
		this.setState({ key: this.props.match.params.key });
		this.props.contract.methods.tokenByKey(this.props.match.params.key).call().then((result)=>{
			console.log('tokenByKey', result);
		});
		this.props.contract.methods.ownerOfKey(this.props.match.params.key).call().then((result)=>{
			console.log('ownerOfKey', result);
		});
	}

	render() {
		console.log('Owner Address', this.state.ownerAddress)
		let wc = <span>Loading...</span>;
		if(this.props.artgen === 1 && this.state.key)
			wc = (<gz-exobit data-key={this.state.key} data-slowmo="2" data-size="512" data-contract={this.props.contract.options.address}></gz-exobit>);
		
		return (
			<div className="detail">
				{wc}
				<Mint keyval={this.state.key} contractInstance={this.props.contract} userAccounts={this.props.accounts}></Mint>
			</div>
		);
	}
}

export default withRouter(Detail);
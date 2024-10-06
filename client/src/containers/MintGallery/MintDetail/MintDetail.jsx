import React from "react";
import {Link} from "react-router-dom";

import Mint from '../../../components/Mint/Mint';

import "./MintDetail.css";

export default class MintDetail extends React.Component {

	constructor(){
		super();
		this.closeRef = React.createRef();
	}

	render() {
		const key = this.props.exokey;
		if(!key) return <>no key</>;

		return (
			<div className="mint-detail" onClick={() => this.closeRef.current.click()}>
				<div className="mint-detail-container" onClick={e => e.stopPropagation()}>
					<img src={'https://exobits.greenzeta.com/i/' + key} alt="Exobit Preview"/>
					<Link to={'/mint/'} className="close" ref={this.closeRef}>
						<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="181.25 31.25 137.5 137.5"><path fill="currentColor" d="M276.062,100l39.09-39.09c4.797-4.797,4.797-12.574,0-17.375l-8.688-8.688c-4.797-4.797-12.574-4.797-17.375,0L250,73.938l-39.09-39.09c-4.797-4.797-12.574-4.797-17.375,0l-8.688,8.688c-4.797,4.797-4.797,12.574,0,17.375l39.09,39.09l-39.09,39.09c-4.797,4.797-4.797,12.574,0,17.375l8.688,8.688c4.797,4.797,12.578,4.797,17.375,0l39.09-39.09l39.09,39.09c4.797,4.797,12.578,4.797,17.375,0l8.688-8.688c4.797-4.797,4.797-12.574,0-17.375L276.062,100z"/></svg>
					</Link>
					<Mint keyval={key} contractInstance={this.props.contractInstance} userAccounts={this.props.accounts} onMintSuccessful={this.props.onMintSuccessful}></Mint>
				</div>
			</div>
		);
	}
}
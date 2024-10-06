import React from "react";
import { withRouter } from "react-router";

import ReactGA from 'react-ga';

import MintImage from './MintImage/MintImage';
import MintDetail from './MintDetail/MintDetail';

import "./MintGallery.css";

class MintGallery extends React.Component {

	constructor(props) {
		super(props);

		this.pageSize = 12;
		this.masterKeys = [];

		this.state = { keys: [], keysIdx: 0, keysPage: [], detail: null, displayMode: 'mint', contractAvailable: false, totalMinted: 0 };
	}

	componentDidMount(){
		ReactGA.pageview(window.location.pathname + window.location.search);

		this.UpdateGalleryKeys();
		let contractAvailable = false;
		if(this.props.contract && this.props.contract.options.address) contractAvailable = true;
		if(this.props.match) this.setState({ detail: this.props.match.params.key, contractAvailable: contractAvailable });
	}

	componentDidUpdate(){
		ReactGA.pageview(window.location.pathname + window.location.search);

		if( this.props.match.params.key !== this.state.detail )
			this.setState({ detail: this.props.match.params.key });
	}

	async UpdateGalleryKeys(){
		if(!this.props.contract) return;
		let totalMinted = await this.props.contract.methods.totalSupply().call();
		fetch('https://exobits.greenzeta.com/datagen/master-key-list.txt')
			.then(response => response.json())
			.then(async (data) => {
				if( data.keys && data.keys.length ){
					let shuffled = data.keys.slice(0);
					let i = data.keys.length;
					let temp;
					let index;
					while (i--) {
						index = Math.floor((i + 1) * Math.random());
						temp = shuffled[index];
						shuffled[index] = shuffled[i];
						shuffled[i] = temp;
					}
					this.setState({keys: [...shuffled], totalMinted: totalMinted}, this.GetNextPage);
				}
			});
	}

	async IsKeyAvailable(key){
		const {web3instance} = window;
		if(!web3instance || !web3instance.utils) return;
		if(!this.props.contract || !this.props.contract.options.address) return;

		try{
			let result = await this.props.contract.methods.ownerOfKey(key).call();
			if(web3instance.utils.isAddress(result) && result === "0x0000000000000000000000000000000000000000")
				return true;
		} catch(e){
			// error contacting contract
		}
		return false;
	}

	async GetNextPage(){
		if(!this.state.keys || !this.state.keys.length) return;
		let {keys, keysIdx} = this.state;
		if(keysIdx >= keys.length) keysIdx = 0;
		let keysPage = [];
		const tokenProgress = document.getElementById('token_progress');
		while( keysIdx < this.state.keys.length && keysPage.length < this.pageSize ){
			if(await this.IsKeyAvailable(keys[keysIdx])) {
				keysPage.push(keys[keysIdx]);
				if(tokenProgress) tokenProgress.innerText = keysPage.length;
			}
			keysIdx++;
		}
		this.setState({ keysPage: [...keysPage], keysIdx: keysIdx });
	}

	DoNewPage(){
		ReactGA.event({
			category: 'Mint Gallery',
			action: 'new_page'
		});
		this.setState({ keysPage: [] }, this.GetNextPage);
	}

	render() {

		let galleryBody = (<p className="progress-update">No tokens available at this time. Make sure your wallet is connected to the main Ethereum network.</p>);
		if(this.state.contractAvailable) galleryBody = (<p className="progress-update">Found <span id="token_progress">0</span> ExoBits</p>);
		let galleryDetail = null;

		// Gallery Detail
		if(this.state.detail) 
			galleryDetail = <MintDetail 
				artgen={this.props.artgen} 
				contractInstance={this.props.contract} 
				accounts={this.props.accounts} 
				exokey={this.state.detail} 
				displayMode={this.state.displayMode}
				onMintSuccessful={this.DoNewPage.bind(this)}
			/>
		// Gallery Body
		if(this.state.keysPage.length){
			galleryBody = (
				<>
					<div className="mint-instructions">
						<p>"Minting" is the process of creating a Non-Fungible Token (NFT) in a smart contract. The ExoBits contract on the Ethereum blockchain allows you to mint NFTs for a small fee: 0.003 ETH plus gas. There are {this.state.keys.length-this.state.totalMinted} of {this.state.keys.length} total ExoBits available to mint. Below is a random selection. Click on one of the images to mint the ExoBit or reload this page to see more.</p>
						<button onClick={this.DoNewPage.bind(this)}>
							See More
							<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path>
							</svg>
						</button>
					</div>
					<div className="mint-gallery">
						{this.state.keysPage.map((key, index) => (
							<MintImage 
								key={index} 
								exobit={key} 
								displayMode={this.state.displayMode} 
							/>
						))}
					</div>
				</>
			);
		}

		return <div className="gallery-container">{galleryDetail}{galleryBody}</div>;
	}
}

export default withRouter(MintGallery);
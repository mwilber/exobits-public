import React from "react";
import { withRouter } from "react-router";

import ReactGA from 'react-ga';

import GalleryImage from './GalleryImage/GalleryImage';
import GalleryDetail from './GalleryDetail/GalleryDetail';

import "./Gallery.css";

class Gallery extends React.Component {

	constructor(props) {
		super(props);

		this.pageSize = 256;
		this.masterKeys = [];

		this.state = { uris: [], detailToken: null, detailUri: null, displayMode: props.displayMode, pageIdx: 0, contractAvailable: false, urisRefreshed: false };
	}

	componentDidMount(){
		ReactGA.pageview(window.location.pathname + window.location.search);

		if(this.props.contract && this.props.contract.options.address){
			this.setState({ contractAvailable: true });
		}
	}

	componentDidUpdate(){
		ReactGA.pageview(window.location.pathname + window.location.search);
		if(!this.state.uris.length) this.UpdateGalleryURIs();
		if( this.props.match.params.key && this.props.match.params.key !== this.state.detailToken ){
			this.setState({ detailToken: this.props.match.params.key, detailUri: null }, this.SetDetailUri);
		}else if(!this.props.match.params.key && this.state.detailToken){
			this.setState({ detailToken: null, detailUri: null });
		}
	}

	async UpdateGalleryURIs(){
		if(!this.props.contract || !this.props.contract.options.address) return;

		let tmpUris = [];
		let result = await this.props.contract.methods.totalSupply().call();
		if(result <= 0) return;
		for(let idx=result; idx>=1; idx--){
			let tokenURI = await this.props.contract.methods.tokenURI(idx).call()
			let uriParts = tokenURI.split('/');
			if(uriParts.length) 
				tmpUris.push({token: idx, uri: uriParts[uriParts.length-1]});
		}
		this.setState({ uris: tmpUris, urisRefreshed: true });
	}

	async SetDetailUri(){
		if(!this.props.contract || !this.state.detailToken) return;
		let tokenId = this.state.detailToken;
		if(this.props.displayMode === "key"){
			tokenId = await this.props.contract.methods.tokenByKey(tokenId).call();
		}
		this.props.contract.methods.tokenURI(tokenId).call().then((tokenURI)=>{
			let uriParts = tokenURI.split('/');
			if(uriParts.length){
				this.setState({ detailUri: uriParts[uriParts.length-1] });
			}
		});
	}

	ChangePage(reverse){
		ReactGA.event({
			category: 'Gallery',
			action: 'change_page',
			label: reverse ? 'previous' : 'next'
		});
		if(reverse && this.state.pageIdx > 0)
			this.setState({pageIdx: (this.state.pageIdx-1)});
		else if(!reverse && ((this.pageSize*(this.state.pageIdx+1) ) < this.state.uris.length))
			this.setState({pageIdx: (this.state.pageIdx+1)});
	}

	render() {
		let galleryBody = (<p className="progress-update">No tokens available at this time. Make sure your wallet is connected to the main Ethereum network.</p>);
		if(this.state.contractAvailable) galleryBody = (<p className="progress-update">Loading tokens...</p>);
		let galleryDetail = null;
		let galleryControls = (
			<div className="gallery-controls">
				<div className="col">
					<button disabled={(this.state.pageIdx === 0)} onClick={() => this.ChangePage(true)}>
						<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path></svg>
					</button>
				</div>
				<div className="col">
					<button disabled={((this.pageSize*(this.state.pageIdx+1)) > this.state.uris.length)} onClick={() => this.ChangePage()}>
						<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
					</button>
				</div>
			</div>
		);

		// Gallery Detail
		if(this.state.detailUri && this.state.detailToken)
			galleryDetail = <GalleryDetail 
								artgen={this.props.artgen} 
								contractInstance={this.props.contract} 
								accounts={this.props.accounts} 
								exoUri={window.$ipfsCacheRoot+this.state.detailUri} 
								exoToken={this.state.detailToken} 
							/>;
		// Gallery Body
		if(this.state.contractAvailable && this.state.urisRefreshed && this.state.uris.length){
			let startIdx = (this.pageSize*this.state.pageIdx);
			let endIdx = startIdx + this.pageSize;
			let uriList = this.state.uris.slice(startIdx, endIdx);
			galleryBody = (
				<>
					{this.state.uris.length > this.pageSize && galleryControls}
					<div className="gallery">
						{uriList.map((uri, index) => (
							<GalleryImage key={index} exobit={uri}></GalleryImage>
						))}
					</div>
					{this.state.uris.length > this.pageSize && galleryControls}
				</>
			);
		}

		return <div className="gallery-container">{galleryDetail}{galleryBody}</div>
	}
}

export default withRouter(Gallery);
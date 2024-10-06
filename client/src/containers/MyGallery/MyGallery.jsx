import React from "react";
import {Link} from "react-router-dom";

import "./MyGallery.css";
import ReactGA from 'react-ga';

export default class MyGallery extends React.Component {

	constructor(props) {
		super(props);

		this.shareUrlRoot = 'https://exobits.greenzeta.com/share/';
		this.shareCopy = "Check out my ExoBit! A unique creature from across the galaxy. Adopt an ExoBit NFT and view it in an interactive web component.";

		this.state = { uris: [] };
	}

	componentDidMount(){
		ReactGA.pageview(window.location.pathname + window.location.search);
		this.UpdateGalleryURIs();
	}

	componentDidUpdate(){
		ReactGA.pageview(window.location.pathname + window.location.search);
		if(!this.props.contract) return;
		//if(!this.state.uris.length) this.UpdateGalleryURIs();
	}

	UpdateGalleryURIs(){
		if(!this.props.contract) return;
		this.props.contract.methods.tokensOfOwner(this.props.accounts[0]).call().then(async (result)=>{
			if(result.length){
				let tempUris = [];
;				for(let id of result){
					let tokenURI = await this.props.contract.methods.tokenURI(id).call();
					//.then((tokenURI)=>{
						let uriParts = tokenURI.split('/');
						if(uriParts.length){
							tempUris.push(uriParts[uriParts.length-1]);
						}
					//});
					//
				}
				this.setState({ uris: [...tempUris] });
			}
		});
	}

	DoTweet(address, description){
		ReactGA.event({
			category: 'My ExoBits',
			action: 'share',
			label: 'twitter'
		});
		this.OpenShareWindow(`http://twitter.com/share?text=${this.shareCopy}&url=${this.shareUrlRoot}${address}&hashtags=NFT`);
	}

	DoFacebook(address, description){
		ReactGA.event({
			category: 'My ExoBits',
			action: 'share',
			label: 'facebook'
		});
		this.OpenShareWindow(`https://www.facebook.com/sharer.php?u=${this.shareUrlRoot}${address}`);
	}

	OpenShareWindow(url){
		window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=yes,top=100,left=100,width=640,height=640');
	}

	render() {
		let galleryBody = <p>No tokens available at this time. Make sure your wallet is connected.</p>;

		if(this.state.uris.length){
			galleryBody = (
				<>
					{this.state.uris.map((uri, index) => (
						<div className="exobit" key={index}>
							<gz-exobit 
								key={index} 
								data-uri={window.$ipfsCacheRoot + uri} 
								data-slowmo="2" 
								data-size="512" 
								data-contract={this.props.contract.options.address}
							/>
							<div className="share-group">
								<div className="col left">
									<input type="url" title="Metadata URI" className="address" onClick={(e) => e.target.select() } defaultValue={'ipfs://'+uri}/>
									<button className="meta" title="Metadata" onClick={()=>{
											ReactGA.event({
												category: 'My ExoBits',
												action: 'metadata',
												label: uri
											});
											this.OpenShareWindow('https://gateway.pinata.cloud/ipfs/'+uri);
										}}>
										<svg version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
											<path fill="currentColor" d="M149.991,256.115c0-10.334,2.351-18.167,7.059-23.49c4.705-5.323,11.457-7.984,20.25-7.984c8.946,0,15.929,2.661,20.943,7.984c5.012,5.323,7.521,13.155,7.521,23.49c0,10.032-2.545,17.744-7.637,23.142c-5.091,5.4-12.033,8.102-20.828,8.102c-7.869,0-14.388-2.431-19.555-7.289C152.573,275.208,149.991,267.224,149.991,256.115z"/>
											<path fill="currentColor" d="M228.113,256.115c0-10.334,2.351-18.167,7.059-23.49c4.705-5.323,11.456-7.984,20.25-7.984c8.945,0,15.929,2.661,20.943,7.984c5.012,5.323,7.521,13.155,7.521,23.49c0,10.032-2.545,17.744-7.637,23.142c-5.091,5.4-12.033,8.102-20.827,8.102c-7.869,0-14.389-2.431-19.556-7.289C230.695,275.208,228.113,267.224,228.113,256.115z"/>
											<path fill="currentColor" d="M306.234,256.115c0-10.334,2.351-18.167,7.059-23.49c4.703-5.323,11.455-7.984,20.25-7.984c8.944,0,15.928,2.661,20.944,7.984c5.011,5.323,7.521,13.155,7.521,23.49c0,10.032-2.547,17.744-7.639,23.142c-5.091,5.4-12.034,8.102-20.827,8.102c-7.87,0-14.389-2.431-19.557-7.289C308.816,275.208,306.234,267.224,306.234,256.115z"/>
											<path fill="currentColor" d="M98.667,384.903c0,15.737,4.514,27.153,13.539,34.252c9.025,7.094,22.252,10.797,39.689,11.108v32.399c-29.315-0.312-51.995-7.023-68.04-20.134c-16.048-13.116-24.069-31.555-24.069-55.312v-70.121c0-16.045-4.859-27.501-14.58-34.367c-9.719-6.862-23.836-10.299-42.35-10.299V239.8c20.054-0.308,34.558-4.011,43.508-11.108c8.946-7.095,13.422-18.051,13.422-32.863v-70.816c0-23.913,8.332-42.502,24.994-55.773c16.664-13.268,39.031-19.902,67.114-19.902v32.167c-35.488,0.926-53.229,16.28-53.229,46.054v68.271c0,33.173-17.205,52.766-51.608,58.782v2.777c34.403,6.017,51.608,25.612,51.608,58.781V384.903z"/>
											<path fill="currentColor" d="M464.478,254.611c-34.406-6.017-51.607-25.609-51.607-58.782v-68.271c0-29.774-17.513-45.128-52.534-46.054V49.337c28.387,0,50.719,6.71,66.998,20.134c16.275,13.422,24.415,31.937,24.415,55.542v70.816c0,14.966,4.549,25.96,13.654,32.979c9.102,7.022,23.681,10.685,43.739,10.993v32.63c-18.825,0-33.094,3.437-42.813,10.299c-9.72,6.866-14.58,18.322-14.58,34.367v70.121c0,23.605-7.908,42.004-23.721,55.195c-15.816,13.191-38.381,19.938-67.692,20.25v-32.399c17.126-0.312,30.161-4.015,39.111-11.108c8.945-7.099,13.423-18.515,13.423-34.252V316.17c0-17.587,4.241-31.011,12.729-40.268c8.483-9.257,21.442-15.426,38.879-18.514V254.611z"/>
										</svg>
									</button>
								</div>
								<div className="col right">
									{/* <button className="link" title="OpenSea" onClick={()=>window.open('https://opensea.io', '_blank')}>
										<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>
									</button> */}
									<button className="link" title="Sharing Link" onClick={()=>{
											ReactGA.event({
												category: 'My ExoBits',
												action: 'share_link',
												label: uri
											});
											this.OpenShareWindow(this.shareUrlRoot+uri);
										}}>
										<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>
									</button>
									<button className="twitter" title="Share on Twitter" onClick={()=>this.DoTweet(uri, 'Some share copy')}>
										<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
									</button>
									<button className="facebook" title="Share on Facebook" onClick={()=>this.DoFacebook(uri, 'Some share copy')}>
										<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" className="svg-inline--fa fa-facebook fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
									</button>
								</div>
							</div>
						</div>
					))}
					{/*<iframe src={'https://exobits.greenzeta.com/tk/'+uri} width="512" height="512" frameBorder="0" scrolling="no"></iframe>*/}
				</>
			);
		}else if(this.props.accounts && this.props.accounts.length){
			galleryBody = (
				<div className="mygallery-callout">
					<p>
						No tokens available for address {this.props.accounts[0]}. 
					</p>
					<p>
						Head over to the mint gallery to claim your first ExoBit.
					</p>
					<Link to="/mint" className="button">
						Mint Gallery
					</Link>
				</div>
			);
		}
		return <div className="my-gallery">{galleryBody}</div>;
	}
}
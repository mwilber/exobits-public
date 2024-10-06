import React from "react";
import { useHistory } from "react-router-dom";

import ReactGA from 'react-ga';

import Hero from '../../components/Hero/Hero';
import HomeContent from '../../components/HomeContent/HomeContent';

import './Home.css';

export default function Home() {

	const history = useHistory();
	
	const DoMintLink = ()=>{
		const loginBtn = document.querySelector('button.login');

		if(loginBtn){
			loginBtn.click();
		}else{
			history.push("/mint");
		}
	}

	const DoGalleryLink = (e)=>{
		e.preventDefault();
		const loginBtn = document.querySelector('button.login');

		if(loginBtn){
			loginBtn.click();
		}else{
			history.push("/gallery");
		}
	}

	let exoSize = 512;
	let contentElem = document.querySelector('.content');
  if(contentElem) {
		let textSize = contentElem.getBoundingClientRect();
		if(textSize.width && textSize.width < exoSize) exoSize = textSize.width;
	}

	ReactGA.pageview(window.location.pathname + window.location.search);

	return (
		<>
		<Hero imgSrc="./images/hero_bkg.png" imgAlt="Hero"></Hero>
		<div className="home-container">
			<p className="introduction">
				ExoBits are unique creatures scattered across the galaxy. Adopt an ExoBit NFT and view it in an interactive web component.
			</p>
			<p className="description">
				ExoBits come in all shapes and sizes and live on over five dozen worlds. Each begins as a unique 64 digit number called a &ldquo;key&rdquo;. The key determines what an ExoBit looks like, as well as its physical attributes and place of origin. It’s like DNA.
			</p>
			<p className="description">
				By adopting an ExoBit, you &ldquo;mint&rdquo; a Non Fungible Token (NFT) to a <a href="https://etherscan.io/address/0x5bbec211972328487e8859740aade132ba7a1916" target="_blank" rel="noopener noreferrer">smart contract</a> on the Ethereum blockchain. This declares you as the official owner of an ExoBit key. Once an NFT is minted, it can be loaded into the interactive <a href="#web-component">ExoBits Web Component</a>. The Web Component renders an image of the ExoBit in real-time and provides information about physical attributes and home world. Anyone can view an ExoBit NFT in the web component, but the owner has access to <a href="#owner-features">a few extra features</a>.
			</p>
			<p className="description">
				In the process of minting, you will name your ExoBit. The ExoBit will always keep its name, even if you exchange the NFT with someone else. Choose wisely, the name is permanent.
			</p>
			<p className="description">
				This website has a collection of 1024 ExoBit keys ready for adoption. There is a gallery of portraits to help you decide. The gallery contains only static images, so you’ll need to mint an ExoBit to find out its details in the web component. Head over to the <a href="/gallery" onClick={DoGalleryLink}>Gallery</a> page to see all of the adopted ExoBits.
			</p>
			<p className="cta">
				{/* <Link to="/mint" className="button">Mint An ExoBit NFT</Link> */}
				<button className="button" onClick={DoMintLink}>
					Mint An ExoBit NFT
				</button>
			</p>
			<h2 id="owner-features">Owner Features</h2>
			<HomeContent title="SlowMo Redraw" imgSrc="./images/slowmodraw2a.gif">
				The <a href="#web-component">ExoBits Web Component</a> reads the genetic code from your NFT and generates its image in real-time. This means you can play it back and watch it draw in slow motion.
			</HomeContent>
			<HomeContent align="right" title="Image Options" imgSrc="./images/ownerfeatures.gif">
				An ExoBit is not just a static image. This means you can separate the ExoBit from its environment, or separate the environment from the ExoBit. You can watch these draw in slow motion too.
			</HomeContent>
			<HomeContent title="Download Image" imgSrc="./images/download_resize.gif">
				Download your ExoBit as a .png file. Use it as your avatar. Or remove the background and, with your favorite image editing software, place it in any setting you like.
			</HomeContent>
			<HomeContent align="center" title="Demo" imgSrc="demo" exoSize={exoSize}>
				Try out all of the owner features in this example Web Component. Click on the image to reveal its owner options.
			</HomeContent>
			<div className="how-it-works">
				<h2>How It Works</h2>
				<p>
				Three pieces come together to create an ExoBit: An Ethereum Contract, some MetaData, and a Web Component. 
				</p>
				<p className="indent">
					The <a href="https://etherscan.io/address/0x5bbec211972328487e8859740aade132ba7a1916" target="_blank" rel="noopener noreferrer">Ethereum Contract</a> stores a list of Non Fungible Tokens (NFT), as well as the core JavaScript functions necessary to draw the ExoBit. Each NFT represents a unique ExoBit. It is owned by a single person and contains a unique url to the ExoBits’ Metadata.
				</p>
				<p className="indent">
					The Metadata is a small list of information used to construct the ExoBit. It’s stored on an IPFS server separate from the Contract and the Web Component. The MetaData contains a unique numeric string that is like DNA for an ExoBit. This numeric string is called a &ldquo;key&rdquo;. The MetaData also contains a url to the official ExoBits Web Component.
				</p>
				<p className="indent">
					When the <a href="#web-component">Web Component</a> is loaded in a web browser, it reaches out to the Ethereum contract and retrieves two pieces of data: The JavaScript functions necessary to draw the ExoBit, and the Ethereum address of the ExoBit’s owner. Anyone can view an ExoBit in the Web Component but <a href="#owner-features">additional features</a> are available for the owner.
				</p>
				<img src="./images/how_it_works.png" alt="diagram"/>
			</div>
			<div id="web-component" className="web-component">
				<h2>About the Web Component</h2>
				<p>The ExoBits Web Component is completely open source and available on both GitHub and npm. You can download the project and add your interactive ExoBit NFT to any website!</p>
				<p>Like all web components, you'll need to add some JavaScript to your website in order to use it. Once the JavaScript registers the component, it's as simple as adding a &lt;gz-exobit&gt; tag to your HTML.</p>
				<ul>
					<li><a href="https://github.com/mwilber/gz-exobit" target="_blank" rel="noopener noreferrer">gz-exobit</a> on GitHub</li>
					<li><a href="https://www.npmjs.com/package/gz-exobit" target="_blank" rel="noopener noreferrer">gz-exobit</a> on npm</li>
				</ul>
			</div>
		</div>
		</>
	);
}
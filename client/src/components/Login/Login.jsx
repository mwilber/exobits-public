import React, { useState } from "react";
import getWeb3 from '../../getWeb3';

import ReactGA from 'react-ga';

import ExobitsContract from '../../contracts/Exobits.json';
import './Login.css';

export default function Login(props) {
	// TODO: Pass necessary button state from the app component
	// TODO: Store 'repeatVisit' in localStorage and attempt to auto connect on revisit

	const [noWallet, setNoWallet] = useState(false);
	const [isMobile, setIsMobile] = useState(null);

	// const contractAddressOverride = null;
	// Rinkeby network
	// contractAddressOverride = "0xc1f0e2a757d874f02c3fdc1f9327bf419a76d30b";
	//const contractAddressOverride = "0xdc38c603eb477375a08934511260049ae55f5c76";
	//const contractAddressOverride = "0x1a4e7a167a796075d5e34cffcb816002fe7b274e";
	// Main network
	const contractAddressOverride = "0x5bbec211972328487e8859740aade132ba7a1916";

	const DoConnect = async () => {
		
		if(isMobile === true) return;
		else if(isMobile === null){
			let mobileCk = window.matchMedia("only screen and (max-width: 768px)").matches &&
			('ontouchstart' in window || !!(navigator.msMaxTouchPoints));
      console.log("mobile check", mobileCk)
			
			if(mobileCk === true){
				setIsMobile(true);
				return;
			} 
		}

		console.log('Connecting....');

		ReactGA.event({
			category: 'Login',
			action: 'connecting'
		});
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = ExobitsContract.networks[networkId];
			const instance = new web3.eth.Contract(
				ExobitsContract.abi,
				contractAddressOverride || (deployedNetwork && deployedNetwork.address),
			);

			props.callback({ web3, accounts, contract: instance });
			if(localStorage) localStorage.setItem('exo_autoconnect_2', 'true');

			ReactGA.event({
				category: 'Login',
				action: 'success'
			});

		} catch (error) {
			// Catch any errors for any of the above operations.
			setNoWallet(true);
			console.error("Could not connect to wallet.");

			ReactGA.event({
				category: 'Login',
				action: 'error'
			});
		}
	};

	if(isMobile) return (
		<div className="no-wallet">
			<button className="button close" onClick={() => {localStorage.setItem('exo_autoconnect_2', 'false'); setIsMobile(null);}}>
				<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="181.25 31.25 137.5 137.5"><path fill="currentColor" d="M276.062,100l39.09-39.09c4.797-4.797,4.797-12.574,0-17.375l-8.688-8.688c-4.797-4.797-12.574-4.797-17.375,0L250,73.938l-39.09-39.09c-4.797-4.797-12.574-4.797-17.375,0l-8.688,8.688c-4.797,4.797-4.797,12.574,0,17.375l39.09,39.09l-39.09,39.09c-4.797,4.797-4.797,12.574,0,17.375l8.688,8.688c4.797,4.797,12.578,4.797,17.375,0l39.09-39.09l39.09,39.09c4.797,4.797,12.578,4.797,17.375,0l8.688-8.688c4.797-4.797,4.797-12.574,0-17.375L276.062,100z"/></svg>
			</button>
			<h2>Mobile Browser Detected</h2>
			<p>
			This site is not fully compatible with mobile browsers. You're welcome to continue with an in-wallet browser but you may experience errors when minting. Please revisit this site on a desktop browser with the MetaMask wallet for the best experience.
			</p>
			<button onClick={()=>{setIsMobile(false)}}>
				Connect Anyway
			</button>
		</div>
	);

	if(noWallet) return (
		<div className="no-wallet">
			<button className="button close" onClick={() => {localStorage.setItem('exo_autoconnect_2', 'false'); setNoWallet(false);}}>
				<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="181.25 31.25 137.5 137.5"><path fill="currentColor" d="M276.062,100l39.09-39.09c4.797-4.797,4.797-12.574,0-17.375l-8.688-8.688c-4.797-4.797-12.574-4.797-17.375,0L250,73.938l-39.09-39.09c-4.797-4.797-12.574-4.797-17.375,0l-8.688,8.688c-4.797,4.797-4.797,12.574,0,17.375l39.09,39.09l-39.09,39.09c-4.797,4.797-4.797,12.574,0,17.375l8.688,8.688c4.797,4.797,12.578,4.797,17.375,0l39.09-39.09l39.09,39.09c4.797,4.797,12.578,4.797,17.375,0l8.688-8.688c4.797-4.797,4.797-12.574,0-17.375L276.062,100z"/></svg>
			</button>
			<h2>Could Not Connect To Your Wallet</h2>
			<p>
				ExoBits is designed to work with the browser based Ethereum wallet MetaMask. Install the MetaMask extension in your browser.
			</p>
			<a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="button">
				Get MetaMask
				<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 189">
					<polygon fill="#FFFFFF" points="196.386,96.58 205.25,85.5 201.312,82.125 207.5,76.5 203,72.562 208.625,67.5 204.688,65.25 210.312,31.5 200.188,0.562 200.186,0.563 136.625,27 77,27 13.439,0.563 13.438,0.562 3.312,31.5 8.938,65.25 5,67.5 10.625,72.562 6.125,76.5 12.312,82.125 8.375,85.5 17.24,96.581 1.625,141.75 14,188.438 61.812,173.25 69.688,178.875 90.5,187.875 106.812,187.875 107.375,187.875 123.688,187.875 144.5,178.875 151.812,173.25 199.625,188.438 212,141.75 "/>
				</svg>
			</a>
			<p>
				Then reload this page to connect your wallet.
			</p>
			<button onClick={()=>{window.location.reload();}}>
				Reload
				<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path>
				</svg>
			</button>
		</div>
	);

	if(window.ethereum)
		window.ethereum.on('accountsChanged', (accounts) => {
			if(props.connected) props.callback({ web3:null, accounts: accounts, contract: null });
		});

	if(!props.connected){
		if(localStorage && localStorage.getItem('exo_autoconnect_2') === 'true') 
			DoConnect();
		return <button className="login" onClick={DoConnect}>Connect Wallet</button>;
	} else {
		return <>[{props.address.slice(0,6)}]</>;
	}
}
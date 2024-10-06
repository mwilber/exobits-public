import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import getWeb3 from '../../getWeb3';

import ReactGA from 'react-ga';

import { FirstNames } from "./first-names";

import './Mint.css';

export default function Mint(props) {
	const history = useHistory();
	const [localState, setLocalState] = useState("init");
	const [exoName, setExoName] = useState(FirstNames[Math.floor(Math.random()*(FirstNames.length-1))]);
	const [metaDataError, setError] = useState(false);
	let exoNameInput = React.createRef();

	const DoMint = async () => {
		ReactGA.event({
			category: 'Mint',
			action: 'call_contract',
			label: props.keyval
		});
		setLocalState('processing');
		console.log("minting...", props.keyval, props.userAccounts[0]);

		const web3 = await getWeb3();
		const gasPrice = await web3.eth.getGasPrice();

		fetch('https://exobits.greenzeta.com/datagen/mintprep.php?key='+props.keyval+'&name='+exoName)
			.then(response => {
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				if(!data.metadata) throw Error("tokenURI not returned");
				// Test the tokenURI
				let uriParts = data.metadata.split('/');
				fetch(window.$ipfsCacheRoot + uriParts[uriParts.length-1])
					.then( response => {
						if (!response.ok) throw Error(response.statusText);
						return response.json();
					})
					.then(async (sampledata) => {
						if(
							!sampledata.key || 
							sampledata.key.length < 64 || 
							isNaN(sampledata.number) || 
							!sampledata.name || 
							!sampledata.image || 
							!sampledata.animation_url
						) throw Error('Key not found');
						// Everything checks out! Go ahead and mint the token
						let gasLimit = await props.contractInstance.methods.autoMint(props.keyval, data.metadata).estimateGas(
							{ 
								from: props.userAccounts[0], 
								value: 3000000000000000
							}
						);
						props.contractInstance.methods.autoMint(props.keyval, data.metadata)
							.send({ 
								from: props.userAccounts[0], 
								value: 3000000000000000,
								gasLimit: gasLimit
							})
							.then((response) => {
								ReactGA.event({
									category: 'Mint',
									action: 'success',
									label: response.transactionHash
								});
								console.log('Minting Result:', response);
								setLocalState("minted");
								props.onMintSuccessful();
							})
							.catch((e) => {
								ReactGA.event({
									category: 'Mint',
									action: 'contract_error',
									label: props.keyval
								});
								console.error('a contract error has occurred', e);
								setError('The wallet has returned an error. This is not necessarily cause for concern, minting may take longer than expected. Before proceeding check your wallet for the transaction status. If it\'s still pending, follow up with your wallet later. If an error is displayed, resolve it and try again. If it still fails, this ExoBit may have been minted just before your attempt. Try a different one.');
							});
					})
					.catch((response) => setError('There was a problem generating token metadata. There may have been a problem communicating with the server or this ExoBit may have been minted just before your attempt. Try again in a minute. If you see this message again, try a different ExoBit.'));

			})
			.catch((response) => setError('There was a problem contacting the server.'));
	};

	const DoName = () => {
		ReactGA.event({
			category: 'Mint',
			action: 'name_set',
			label: props.keyval
		});
		setExoName(exoNameInput.current.value);
		setLocalState('confirm');
	};

	const FocusInput = function() {
		const elem = document.querySelector('.exobit-name-input');
		if(elem) elem.focus();
	}

	let controlGroup = <button className="mint" onClick={() => {
			ReactGA.event({
				category: 'Mint',
				action: 'begin',
				label: props.keyval
			});
			setLocalState("setup");
		}}>Mint this ExoBit (0.003 ETH + gas)</button>;

	if(metaDataError) controlGroup = (
			<>
				<h3>An error has occurred.</h3>
				<p style={{textAlign:'left'}}>{metaDataError}</p>
				{/* <button className="mint" onClick={() => {setLocalState("reset"); setError(false);}}>Try Again</button> */}
			</>
		);
	else if(localState === 'setup') controlGroup = (
			<>
				<h3>Name your ExoBit!</h3>
				<p>
					Your ExoBit will have this name for life.
					A random name was selected but <strong>you can change it to anything you want. </strong> 
					Choose one that best suits its personality.
					Be creative! 
				</p>
				<input type="text" ref={exoNameInput} defaultValue={exoName} placeholder="Name Your Exobit!" className="exobit-name-input"></input>
				<br/>
				<button className="mint" onClick={DoName}>Continue</button>
			</>
		);
	else if(localState === 'confirm') controlGroup = (
		<>
			<h3>Are you sure?</h3>
			<p>
				The name &ldquo;{exoName}&rdquo; is permanent. 
				It will be cemented into this ExoBit's profile and cannot be changed, even when transferring ownership. 
			</p>
			<button className="mint" onClick={DoMint}>Mint {exoName}</button>
			<br/><br/>
			<button className="mint" onClick={() => setLocalState("setup")}>Rename</button>
		</>
		);
	else if(localState === 'minted') controlGroup = (
			<>
				<button className="mint" onClick={() => history.push("/mygallery")}>Go to Your Gallery</button>
			</>
		);
	else if(localState === 'processing') controlGroup = (
			<>
				<h3 className="mint-processing">
					<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>
					Processing.
				</h3>
				<p>Please be patient and do not reload the page.</p>
				<p>
					A popup from your wallet should appear shortly. 
					Minting will not begin until you confirm the payment.
				</p>
				<p>
					Depending on activity on the Ethereum blockchain the process can take minutes or hours.
					Follow up with your wallet for a more accurate status of the transaction.
				</p>
			</>
		);

	setTimeout(FocusInput);

	return <div className={"mint-controls " + ((metaDataError)?"error ":"") + localState}>{controlGroup}</div>
}
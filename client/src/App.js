import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import getWeb3 from './getWeb3';

import ReactGA from 'react-ga';

import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';
import MintGallery from './containers/MintGallery/MintGallery';
import Gallery from './containers/Gallery/Gallery';
import MyGallery from './containers/MyGallery/MyGallery';

import 'gz-exobit';

import './App.css';

ReactGA.initialize('UA-76054-41');

class App extends Component {
	

	constructor(props) {
		super(props);

		this.state = { storageValue: 0, web3: null, accounts: null, contract: null, isMatt: false };
	}

	componentDidMount  = () => this.RestrictToMatt();

	OnLogin(param) {
		let { web3, accounts, contract } = param;
		if(web3 && accounts && contract){
			this.setState({ web3, accounts, contract });
		}else if(accounts){
			this.setState({ accounts });
		} 
	}

	async RestrictToMatt() {
		// Limit access to my account. 
		// TODO: REMOVE THIS WHEN GOING LIVE
			const web3 = await getWeb3();
			const accounts = await web3.eth.getAccounts();
			if(accounts[0] === '0x89Cc5C02B837b8BEB3Dd3E44E8F1FD4897fd9D04')
				this.setState({ isMatt: true });
	}

	render() {
		let { web3, accounts, contract } = this.state;

		let contractAvailable = !(!web3 && !accounts && !contract);

		let loggedAddress = (accounts && accounts.length) ? accounts[0] : null;
		
		const myGalleryComponent = <MyGallery artgen={this.state.storageValue} contract={this.state.contract} accounts={this.state.accounts} />;
		const galleryComponent = <Gallery artgen={this.state.storageValue} contract={this.state.contract} accounts={this.state.accounts} displayMode="token" />;
		const mintGalleryComponent = <MintGallery artgen={this.state.storageValue} contract={this.state.contract} accounts={this.state.accounts} displayMode="mint" />
		const keyDetail = <Gallery artgen={this.state.storageValue} contract={this.state.contract} accounts={this.state.accounts} displayMode="key" />;
		
		return (
			<div className="App">
				<Router>
					<Header onLogin={this.OnLogin.bind(this)} rpcConnected={contractAvailable} address={loggedAddress} isMatt={this.state.isMatt}></Header>
					<div className="content">
						{/* A <Switch> looks through its children <Route>s and
								renders the first one that matches the current URL. */}
						<Switch>
							<GuardedRoute path="/mygallery" component={myGalleryComponent} auth={contractAvailable}/>
							<GuardedRoute path="/gallery/:key" component={galleryComponent} auth={contractAvailable}/>
							<GuardedRoute path="/gallery" component={galleryComponent} auth={contractAvailable}/>
							<GuardedRoute path="/mint/:key" component={mintGalleryComponent} auth={contractAvailable}/>
							<GuardedRoute path="/mint" component={mintGalleryComponent} auth={contractAvailable}/>
							<GuardedRoute path="/key/:key" component={keyDetail} auth={contractAvailable}/>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</div>
				</Router>
				<Footer></Footer>
			</div>
		);
	}
}

export default App;

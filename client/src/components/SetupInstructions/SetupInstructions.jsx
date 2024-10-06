import React from "react";

import ReactGA from 'react-ga';

import Hero from '../Hero/Hero';

import './SetupInstructions.css';

export default function SetupInstructions(props) {
  ReactGA.modalview('/setupinstructions');
  ReactGA.event({
    category: 'Setup Instructions',
    action: 'route_guard',
    label: window.location.pathname + window.location.search
  });
	return (
    <>
      <Hero imgSrc="/images/hero_bkg.png" imgAlt="Hero"></Hero>
      <div className="setup-instructions">
        <h2>Wallet Not Connected</h2>
        <p>
          ExoBits is designed to work with the browser based Ethereum wallet MetaMask. Install the MetaMask extension in your browser. Then click the "Connect Wallet" button at the top of this page.
        </p>
        <a href="https://metamask.io/" target="_blank" className="button" rel="noopener noreferrer">
          Get MetaMask
          <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 189">
            <polygon fill="#FFFFFF" points="196.386,96.58 205.25,85.5 201.312,82.125 207.5,76.5 203,72.562 208.625,67.5 204.688,65.25 210.312,31.5 200.188,0.562 200.186,0.563 136.625,27 77,27 13.439,0.563 13.438,0.562 3.312,31.5 8.938,65.25 5,67.5 10.625,72.562 6.125,76.5 12.312,82.125 8.375,85.5 17.24,96.581 1.625,141.75 14,188.438 61.812,173.25 69.688,178.875 90.5,187.875 106.812,187.875 107.375,187.875 123.688,187.875 144.5,178.875 151.812,173.25 199.625,188.438 212,141.75 "/>
          </svg>
        </a>
        <h3>ExoBits are unique creatures scattered across the galaxy. Adopt an ExoBit NFT and view it in an interactive web component.</h3>
        <p>
          Go to the Home Page for more infomation about what ExoBits are and how they work.
        </p>
        <a href="/" className="button">
          Home Page
        </a>
      </div>
    </>
	);
}
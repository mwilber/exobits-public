# Exobits Data Generation Scripts and Contracts

This project contains the scripts and contracts for generating the data for the Exobits NFTs.

Project website: [ExoBitsNFT.com](https://exobitsnft.com/)

![Exobits Hero Layout](https://greenzeta.com/wp-content/uploads/2021/06/hero_layout-1024x427.jpg)

## contracts/Exobits.sol

The public Exobits contract. Published to the Etherium blockchain at address `0x5bbec211972328487e8859740aade132ba7a1916`.

[View on Etherscan](https://etherscan.io/address/0x5bbec211972328487e8859740aade132ba7a1916)

## server/datagen/mintprep.php

This script is called during the minting process to generate the data for the NFTs. The Exobit json file is updated to include the name given to the Exobit at time of purchase and uploaded to IPFS via the Pinata API.

## Other Files
The `server/datagen/` directory contains the scripts used to generate the original key values, preview images and placeholder json data for the NFTs. They were run once to generate the 1024 available Exobit keys and are no longer used.

## Related Projects
- [gz-exobit](https://github.com/mwilber/gz-exobit) - Web component for displaying Exobit NFTs
- [nft-minting-website-example](https://github.com/mwilber/nft-minting-website-example) - Example website for minting NFTs. Based off of the ExoBits project website.
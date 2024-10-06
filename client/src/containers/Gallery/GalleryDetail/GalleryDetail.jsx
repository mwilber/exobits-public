import React from "react";
import {Link} from "react-router-dom";

import OpenSea from '../../../components/OpenSea/OpenSea';

import "./GalleryDetail.css";

export default function GalleryDetail(props){

		//const {uri, tokenId} = this.state;
		const uri = props.exoUri;
		const tokenId = props.exoToken;
		if(!uri) return <>No Token URI</>;
		let closeRef = React.createRef();

		let wc = (<gz-exobit data-uri={uri} data-slowmo="2" data-size="512" data-contract={props.contractInstance.options.address}></gz-exobit>);

		return (
			<div className="gallery-detail" onClick={() => closeRef.current.click()}>
				<div className="gallery-detail-container" onClick={e => e.stopPropagation()}>
					{wc}
					<Link to={'/gallery/'} className="close" ref={closeRef}>
						<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="181.25 31.25 137.5 137.5"><path fill="currentColor" d="M276.062,100l39.09-39.09c4.797-4.797,4.797-12.574,0-17.375l-8.688-8.688c-4.797-4.797-12.574-4.797-17.375,0L250,73.938l-39.09-39.09c-4.797-4.797-12.574-4.797-17.375,0l-8.688,8.688c-4.797,4.797-4.797,12.574,0,17.375l39.09,39.09l-39.09,39.09c-4.797,4.797-4.797,12.574,0,17.375l8.688,8.688c4.797,4.797,12.578,4.797,17.375,0l39.09-39.09l39.09,39.09c4.797,4.797,12.578,4.797,17.375,0l8.688-8.688c4.797-4.797,4.797-12.574,0-17.375L276.062,100z"/></svg>
					</Link>
					<OpenSea contractAddress={props.contractInstance.options.address} tokenId={tokenId}></OpenSea>
				</div>
			</div>
		);
}
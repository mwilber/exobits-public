import React, { useState } from "react";
import {Link} from "react-router-dom";

import "./GalleryImage.css";

export default function GalleryImage(props) {

	const {uri, token} = props.exobit || {};
	const [imageUri, setImageUri] = useState(['','']);

	if(uri && uri !== imageUri[0]){
		fetch(window.$ipfsCacheRoot+uri)
			.then(response => response.json())
			.then((data) => {
				if(data.image){
					let uriParts = data.image.split('/');
					if(uriParts.length && uriParts[uriParts.length-1] !== imageUri[0]){
						setImageUri([uriParts[uriParts.length-1], data.name]);
					}
				}
			});
		}

	if(!imageUri[0]) return <div className="gallery-image">Loading...</div>;

	return (
		<div className="gallery-image">
			<Link to={'/gallery/' + token}>
				<figure>
					<img src={window.$ipfsCacheRoot + imageUri[0]} alt={imageUri[1]}/>
					<figcaption>{imageUri[1]}</figcaption>
				</figure>
			</Link>
		</div>
	);
}
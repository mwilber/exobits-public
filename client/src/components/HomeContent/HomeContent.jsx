import React from "react";
import DemoComponent from "../DemoComponent/DemoComponent";

import './HomeContent.css';

export default function HomeContent(props) {
	let image = null;
	if(props.imgSrc === 'demo')
		image = <div className="demo-container"><DemoComponent exoSize={props.exoSize}></DemoComponent></div>;
	else if(props.imgSrc)
		image = <img src={props.imgSrc} alt="Feature Preview" />;
	let float = (props.align === 'right' || props.align === 'center') ? 'align-'+props.align : 'align-left';
	return (
		<div className={`home-content ${float}`}>
			{props.imgSrc !== 'demo' && image}
			{props.imgSrc === 'demo' && <h2>{props.title}</h2>}
			{props.imgSrc !== 'demo' && <h3>{props.title}</h3>}
			<p>{props.children}</p>
			{props.imgSrc === 'demo' && image}
			<div className="clearfix"></div>
		</div>
	);
}
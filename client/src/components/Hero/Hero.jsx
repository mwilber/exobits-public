import React from "react";

import './Hero.css';

export default function Header(props) {

	if(!props.imgSrc) return <></>;

	//let image = (props.imgSrc) ? <img src={props.imgSrc} alt={props.imgAlt} /> : '';
	return (
		<div className="hero" style={{backgroundImage : "url('"+props.imgSrc+"')"}}  alt={props.imgAlt}>
			<div className="hero-background" style={{backgroundImage : "url('"+props.imgSrc+"')"}}>
			</div>
			<img className="exobit" src="/images/exobits/exobit-1.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-2.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-3.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-4.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-5.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-6.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-7.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-8.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-9.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-10.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-11.png" alt="Animated ExoBit Character"/>
			<img className="exobit" src="/images/exobits/exobit-12.png" alt="Animated ExoBit Character"/>
		</div>
	);
}
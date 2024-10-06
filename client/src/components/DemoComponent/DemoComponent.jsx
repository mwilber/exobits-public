import React, {useEffect} from "react";

import './DemoComponent.css';

export default function DemoComponent(props) {

	const wc = React.createRef();

	let scaleWC = ()=>{
		const demoContainer = document.querySelector('.demo-container');
		if(!demoContainer) return;
		const startWidth = (demoContainer.getBoundingClientRect().width / 512);
		if(wc && wc.current){
			wc.current.style.transformOrigin = 'top left';
			wc.current.style.transform = 'scale('+startWidth+')';

			demoContainer.style.height = demoContainer.getBoundingClientRect().width + 'px';
		} 
	};

	useEffect(scaleWC);
	window.addEventListener('resize', scaleWC);

	return <gz-exobit data-key="demo" data-slowmo="2" data-size="512" ref={wc}></gz-exobit>;

}
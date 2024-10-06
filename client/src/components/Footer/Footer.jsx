import React from "react";

import './Footer.css';

export default class Footer extends React.Component {
    render() {
      return (
          <footer>
              <small className="copyright">A <a href="http://greenzeta.com" target="_blank" rel="noopener noreferrer">GreenZeta</a> Production &copy;2021 Matthew Wilber</small>
              <nav>
                <ul>
                    <li>
                        <a href="https://greenzeta.com" target="_blank" rel="noopener noreferrer">
												<svg id="GreenZeta" data-name="GreenZeta"  aria-hidden="true" focusable="false" data-icon="greenzeta" className="greenzeta" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 1100"><path fill="currentColor" d="M1050,50H150A100,100,0,0,0,50,150v900a100,100,0,0,0,100,100h900a100,100,0,0,0,100-100V150A100,100,0,0,0,1050,50ZM740.16,997.8q-47.86,44.68-108.39,44.7-29.31,0-50.54-17.06T560,985.94q0-16.61,12.42-29t34.36-12.44q16.54,0,40.92,7.5,22.41,7.5,38.5,7.5,27.75,0,46.28-17T751,895.81q0-59.31-60-59.31-13.66,0-54.63,3.23-40.49,2.78-55.12,2.77-85.85,0-127.55-58.13T412,624.67q0-82,27.83-161.9T536,294.5q-33.36-4.41-54.69-24.7T460,220.64q0-65.53,88.63-83.14l5.37,17q-40,22.22-40,59.7,0,46.88,46.48,52.3,93-113,168.3-113,35.21,0,35.22,34.64,0,41.49-58.47,73.67T573.69,294.5Q455,451.84,455,577.89q0,73.79,33.73,98.69t74.33,24.92q8.3,0,29.83-1.5,34.22-2.49,51.34-2.5,80.68,0,112.22,45.69T788,867.06Q788,953.09,740.16,997.8Z" transform="translate(-50 -50)"/></svg>
												</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/greenzeta" target="_blank" rel="noopener noreferrer">
												<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
												</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/greenzeta" target="_blank" rel="noopener noreferrer">
												<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" className="svg-inline--fa fa-facebook fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
												</a>
                    </li>
                </ul>
            </nav>
          </footer>
      );
    }
}
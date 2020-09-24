import React from 'react';
import { hydrate, render } from "react-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Fabric, initializeIcons } from "@fluentui/react";
initializeIcons();

const rootElement = document.getElementById("root");
//Using React SNAP for SEO enhancement so thats why not using Direct React DOM render hydrate used.
//Pre-renders a web app into static HTML. Uses Headless Chrome to crawl all available links starting 
//from the root. Heavily inspired by prep and react-snapshot, but written from scratch. 
//Uses best practices to get the best loading performance.
//Major benefits are: 
//Enables SEO
//Works out-of-the-box no code change
//Uses a real browser behind the scenes, 
//Does a lot of load performance optimization, 
//Does not depend on React, 
//Zero configuration
if (rootElement != null && rootElement.hasChildNodes()) {
  hydrate(<Fabric>
    <App />
  </Fabric>, rootElement);
} else {
  render(<Fabric>
    <App />
  </Fabric>, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// 'use strict';
import { Router, Page } from './routing.js'


// let queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);

// console.log(urlParams)

// let plantName = urlParams.get("name");

// console.log(plantName)

//setting up the Router with pages
Router.init('mainArea', [
  new Page('#home', 'homepage.html', '', 'My Green - Home'), // 1st Page is default if no URL match
  new Page('#myplants', 'myplants.html', '', 'My Green - My Plants'),
  // add new pages here
  new Page('#public_journal', 'public_journal.html', '', 'My Green - Journal'),
  new Page('#personal_journal', 'personal_journal.html', '', 'My Green - My Journal'),
  new Page('#sugesstion', 'sugesstion.html', '', 'My Green - Plant pick'),
  new Page('#myaccount', 'myaccount.html', '', 'My Green - My Account'),
  new Page('#search', 'search.html', '', 'My Green - Search'),
  new Page('#plant-detail', 'plant-detail.html', '', 'My Green - Plant detail'),
  new Page('#plantid', 'plantid.html', '', 'My Green - Plant Identifier'),
  new Page('#addplant', 'addplant.html', '', 'My Green - Add a Plant'),
  new Page('#aboutus', 'about-us.html', '', 'My Green - About us'),
  new Page('#contactus', 'contact-us.html', '', 'My Green - Contact us'),
  new Page('#camera', 'camera.html', '', 'My Green - My Journal')
]);




'use strict';

//setting up the Router with pages
Router.init('mainArea', [
  new Page('#home', 'homepage.html'), // 1st Page is default if no URL match
  new Page('#myplants', 'myplants.html'),
  // add new pages here
  new Page('#public_journal', 'public_journal.html'),
  new Page('#personal_journal', 'personal_journal.html'),
  new Page('#sugesstion', 'sugesstion.html'),
  new Page('#myaccount', 'myaccount.html'),
  new Page('#plantid', 'plantid.html')
]);

'use strict';

export class Page {
  constructor(name, htmlName, jsName, title) {
    this.name = name;
    this.htmlName = htmlName;
    // if jsName is not given use the html name + '.js'
    this.jsName = jsName
      ? jsName
      : htmlName.substring(0, htmlName.lastIndexOf('.')) + '.js';
    this.title = title ? title : this.name.slice(1, this.name.length)
  }
}

export class Router {
  static init(mainAreaId, pages) {
    Router.pages = pages;
    Router.rootElem = document.getElementById(mainAreaId);
    window.addEventListener('hashchange', function (e) {
      Router.handleHashChange();
    });
    Router.handleHashChange();
  }

  static handleHashChange() {
    const urlHash = window.location.hash;
    console.log(urlHash)
    if (urlHash.length > 0) {
      // If there is a hash in URL
      for (let i = 0; i < Router.pages.length; i++) {
        // find which page matches the hash then navigate to it
        if (urlHash === Router.pages[i].name) {
          Router.goToPage(Router.pages[i]);
          break;
        }
      }
    } else {
      // If no hash in URL, load the first Page as the default page
      Router.goToPage(Router.pages[0]);
    }
  }

  static async goToPage(page) {
    try {
      console.log('cccccccccc')
      const response = await fetch(page.htmlName);
      const txt = await response.text();
      Router.rootElem.innerHTML = txt;
      //import the JS module
      const module = await import('./' + page.jsName);
      console.log('imported module :' + page.jsName);
      //and invoke its init method of module if exists
      if (module.init) {
          module.init();
      }
      // //append JS part to run.
      // const script = document.createElement('script');
      // console.log('dddddd', page.jsName)
      // script.setAttribute('src', `./js/${page.jsName}`);
      // script.setAttribute('type', 'module');
      // script.setAttribute('defer', 'defer');
      // Router.rootElem.appendChild(script);
      // // document.body.appendChild(script);
      document.title = page.title;
    } catch (error) {
      console.error(error);
    }
  }
}

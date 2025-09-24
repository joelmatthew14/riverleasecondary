// header-sidebar.js
//create function
function loadPartial(fromFile, selector, intoId) {
  fetch(fromFile)
    .then(res => res.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const part = tempDiv.querySelector(selector);
      if (part) {
        document.getElementById(intoId).innerHTML = part.outerHTML;
      } else {
        console.error(`Element ${selector} not found in ${fromFile}`);
      }
    })
    .catch(err => {
      console.error(`Error loading ${selector} from ${fromFile}:`, err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadPartial("/html/02.header-sidebar.html", "#header-take", "header-get");
  loadPartial("/html/02.header-sidebar.html", "#sidebar-take", "sidebar-get");
});

// this function is for the styles of the elements above
//create the function
function loadCSS(filename) {
  //create a new <link> element
  const link = document.createElement('link');

  //set the attributes for the <link> element
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '/css/03.header-sidebar.css';

  //append the <link> element to the <head> of the document
  document.head.appendChild(link);
}

// call or start the function
loadCSS('/css/03.header-sidebar.css');

function loadViewPort() {
  const meta = document.createElement('meta');

  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1.0";

  document.head.appendChild(meta);
}
loadViewPort();

function openSidebar() {
  
  let x = document.getElementById('sidebar-take');
  if (x.style.width === '200px') {
    x.style.width = '0px';
    document.body.style.paddingLeft = '20px'; // Remove padding when sidebar is closed
  } else {
    x.style.width = '200px';
    document.body.style.paddingLeft = '200px'; // Add padding when sidebar is open
  }
}


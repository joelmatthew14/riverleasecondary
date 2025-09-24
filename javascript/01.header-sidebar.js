// header-sidebar.js

// function to load parts of an HTML file into a page
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

// Detect if we are in root (index.html) or inside /html/
const basePath = window.location.pathname.includes("/html/")
  ? ".."   // inside /html/ → need to go up one folder
  : ".";   // root → current folder

window.addEventListener("DOMContentLoaded", () => {
  loadPartial(`${basePath}/html/02.header-sidebar.html`, "#header-take", "header-get");
  loadPartial(`${basePath}/html/02.header-sidebar.html`, "#sidebar-take", "sidebar-get");

  loadCSS(`${basePath}/css/03.header-sidebar.css`);
  loadViewPort();
});

// function to load CSS dynamically
function loadCSS(filename) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = filename;
  document.head.appendChild(link);
}

// function to load viewport meta
function loadViewPort() {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1.0";
  document.head.appendChild(meta);
}

// sidebar toggle
function openSidebar() {
  let x = document.getElementById("sidebar-take");
  if (x.style.width === "200px") {
    x.style.width = "0px";
    document.body.style.paddingLeft = "20px"; 
  } else {
    x.style.width = "200px";
    document.body.style.paddingLeft = "200px"; 
  }
}

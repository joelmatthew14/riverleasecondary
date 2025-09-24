// this is for videos, notes & past papers design

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
  loadPartial("../html/02.v-n-pp.html", "#videos-link", "videos-link");
  loadPartial("../html/02.v-n-pp.html", "#notes-link", "notes-link");
  loadPartial("../html/02.v-n-pp.html", "#pastpapers-link", "pastpapers-link")
});

//this is for the styles for the elements above
//create the function
function loadCSS(filename) {
  //create a new <link> element
  const link = document.createElement('link');

  //set the attributes for the <link> element
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '../css/03.v-n-pp.css';

  //append the <link> element to the <head> of the document
  document.head.appendChild(link);
}

//call the function
loadCSS('../css/03.v-n-pp.css');
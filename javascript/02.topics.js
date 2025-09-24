// this function is for the styles for the topics webpages
//create the function
function loadCSS(filename) {
  //create a new <link> element
  const link = document.createElement('link');

  //set the attributes for the <link> element
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '../css/04.topics.css';

  //append the <link> element to the <head> of the document
  document.head.appendChild(link);
}

// call or start the function
loadCSS('../css/04.topics.css');

function loadTargetBlank() {
  // get all the anchor elements in the document
  const anchors = document.getElementsByTagName('a');

  // loop through the anchor elements and set target="_blank"
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].setAttribute('target', '_blank');
  } 
}

// call or start the function
loadTargetBlank();

'use strict';


const container = document.querySelector("ol.accordion");
const arrowDown = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>'


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function createText(text) {
  return document.createTextNode(text);
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function toggleProperties(x, y, z) {
  x.forEach(y => { y.classList.remove(z); });
  y.classList.add(z);
}

fetch('data/data.json')
  .then(response => {
    if (!response.ok) {
      alert('Try to use a local server to fetch the data!');
    }
    return response.json()
  })
  .then(data => {
    let sections = data.rows;

    return sections.map(function(section, index) {
      let li =  createNode('li');
      let wrapper = createNode('div');
      let span = createNode('span');
      let div = createNode('div');
      let innerDiv = createNode('div');
      let title = createText(`${ index + 1 }` + '. ' + `${ section.title }`);
      let content = createText(`${ section.content }`);
      
      span.insertAdjacentHTML('beforeend', arrowDown);
      setAttributes( wrapper, {
        "id": "heading" + `${ index + 1 }`,
        "class": "header-wrapper",
        "aria-expanded": "true",
      })
      wrapper.onclick = function() {
        let elms = document.querySelectorAll(".collapse");
        let _elm = document.getElementById("collapse" + `${ index + 1 }`);
        let arrows = document.querySelectorAll(".accordion span svg");
        let _arrow = this.children[0].firstChild;
        let headers = document.querySelectorAll(".header-wrapper");

        elms.forEach(elm => { elm.classList.remove("open"); });
        _elm.classList.add("open");

        arrows.forEach(arrow => { arrow.classList.remove("rotate-up"); });
        _arrow.classList.add("rotate-up");

        headers.forEach(header => { header.setAttribute("aria-expanded", false); });
        this.setAttribute("aria-expanded", true);
      }

      setAttributes( div, {
        "id": "collapse" + `${ index + 1 }`,
        "class": "collapse",
      })

      append(li, wrapper);
      append(wrapper, title);
      append(wrapper, span);
      append(div, innerDiv);
      append(innerDiv, content);
      append(li, div);
      append(container, li);
    })
  })
  .then(() => {
    let elm = document.getElementById("heading1");
    elm.setAttribute("aria-expanded", true);
    elm.children[0].firstChild.classList.add("rotate-up");
    elm.nextElementSibling.classList.add("open");
    return 
  })
  .catch(error => console.log(error) );


  //version 0.1 - unsynchronised collapse
  // wrapper.onclick = function() {
  //   let elm = document.getElementById("collapse" + `${ index + 1 }`);
  //   let arrow = this.children[0].firstChild;
  //   this.getAttribute("aria-expanded") === 'true' ? this.setAttribute("aria-expanded", false) : this.setAttribute("aria-expanded", true);
  //   elm.classList.contains("open") ? elm.classList.remove("open") : elm.classList.add("open");
  //   arrow.classList.contains("rotate-up") ? arrow.classList.remove("rotate-up") : arrow.classList.add("rotate-up");
  // }
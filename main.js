/* State */

let freelancersDisplayed = 3;
const freelancers = [
  { name: "Alice", occupation: "Writer", price: 30, },
  { name: "Bob", occupation: "Teacher", price: 50, },
  { name: "Carol", occupation: "Programmer", price: 70, },
  { name: "Jack", occupation: "Musician", price: 20, },
  { name: "Mike", occupation: "Painter", price: 25, },
];

console.log(freelancers);

const unorderedLists = {};
for(key in freelancers[0]) {
  const ul = document.querySelector(`#freelancer${capitalize(key)}s > ul`);
  if (!ul) {
    console.log(`Couldn't find section > list for key ${key}`);
    continue;
  }

  unorderedLists[key] = ul;
}
console.log(unorderedLists);

render();


// const freelancerNameList = document.querySelectorAll("#freelancerNames > ul");
// console.log(freelancerNameList);


/**
 * Returns a copy of the input word with the first letter capitalized
 * @param {string} word to be capitalized (first letter)
 * @returns {string} capitalized word
 */
function capitalize(word) {
  // validation
  if (typeof(word) !== "string" || word.length < 1) 
    return "";

  return word[0].toUpperCase() + word.slice(1);
}

/**
 * Replaces elements under a given node with new elements derived from given contents and tag
 * @param {Node} node to add new html elements to
 * @param {Array} contents to fill each element with
 * @param {string} tag (html) for element creation
 */
function replaceChildren(node, contents, tag) {
  const elements = contents.map((content) => {
    const newElement = document.createElement(tag);
    newElement.textContent = content;
    return newElement;
  });

  node.replaceChildren(...elements);
}

/** Translates javascript data into html in order to display on page */
function render() {
  for(key in unorderedLists) {
    const contents = [];
    for (let i = 0; i < freelancersDisplayed; i++) {
      contents.push(freelancers[i][key]);
      if (key === "price") contents[i] = "$" + contents[i];
    }

    replaceChildren(unorderedLists[key], contents, "li");
  }
}
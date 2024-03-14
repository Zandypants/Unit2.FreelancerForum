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
 * Replaces li elements under a given ul with new elements derived from given array
 * @param {Node} ul unordered list to add new li tags to
 * @param {Array} contents to fill each li tag with
 */
function displayList(ul, contents) {
  const elements = contents.map((content) => {
    const newElement = document.createElement("li");
    newElement.textContent = content;
    return newElement;
  });

  ul.replaceChildren(...elements);
}

/** Translates javascript data into html in order to display on page */
function render() {
  for(key in unorderedLists) {
    const contents = [];
    for (let i = 0; i < freelancersDisplayed; i++) {
      contents.push(freelancers[i][key]);
      if (key === "price") contents[i] = "$" + contents[i];
    }

    displayList(unorderedLists[key], contents);
  }
}
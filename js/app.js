// To get the clicking events tracked on the page, you're going
// to be working with an event listener which increments a number
// on the page each time the cat image is clicked.

let clickCount = 0;

// Store the cat image into a variable
const catImage = document.querySelector('img');

catImage.addEventListener('click', function(){
    //the element has been clicked... call function to increment clickCount
    countClick();
}, false);

function countClick() {
    // increment clickCount variable
    clickCount++;
    // get element holding click counter from document
    const clickCounter = document.querySelector('.count');
    // update the element's innerHTML with the latest value of clickCount
    clickCounter.innerHTML = clickCount;
}
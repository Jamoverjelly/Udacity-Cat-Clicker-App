'use strict';

/* ======== CAT FACTORY ======== */
const Cat = function(name, src) {
    let obj = {
        name: name,
        src: src,
        counter: 0
    };
    catModel.cats.push(obj);
};

/* ======== CAT MODEL ======== */
const catModel = {
    currentCat: null,
    cats: []
};

/* ======== CAT CONTROLLER ======== */
const catController = {
    init() {
        // Set the current cat
        catModel.currentCat = catModel.cats[0];
        // Start all cat views
        catView.init();
        catListView.init();
    },
    getAllCats() {
        return catModel.cats;
    },
    getCurrentCat() {
        return catModel.currentCat;
    },
    setCurrentCat(cat) {
        catModel.currentCat = cat;
    },
    incrementCounter() {
        catModel.currentCat.counter++;
        catView.render();
    }
};

/* ======== CATVIEW ======== */
const catView = {
    init() {
        
        // Set all pointers here for easy access elsewhere
        this.catNameElem = document.getElementsByClassName('cat_name')[0];
        this.catCounterElem = document.getElementsByClassName('counter_clicks')[0];
        this.catImgElem = document.getElementsByClassName('cat_img')[0];

        // Set up the click-counter event listener here
        this.catImgElem.addEventListener('click', function () {
            catController.incrementCounter();
        });

        // Update values for each element
        this.render();
    },
    render() {
        let currentCat = catController.getCurrentCat();
        this.catNameElem.textContent = currentCat.name;
        this.catCounterElem.textContent = currentCat.counter;
        this.catImgElem.src = currentCat.src;
    }
};

/* ======== CATLIST VIEW ======== */
const catListView = {
    init() {
        this.catListElem = document.getElementById('cat_list');
        this.render();
    },
    render() {
        let i, liElem, cat, catList;

        catList = catController.getAllCats();

        // iterate over the full cat list.
        for (i = 0; i < catList.length; i++) {
            cat = catList[i];
            liElem = document.createElement('li');
            liElem.className = 'cat_names';
            liElem.textContent = cat.name;
            this.catListElem.append(liElem);

            // Here we'll apply an event listener to each cat and set up a closure.
            // Now every time we click a cat's name from the list, the right object will be set
            liElem.addEventListener('click', (function(catCopy) {
                return function() {
                    catController.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));
        }
    }
};

/* ======== INVOCATIONS ======== */
const cat1 = Cat(
    "Alma",
    "https://res.cloudinary.com/da6db8qdd/image/upload/v1534442275/cat-clicker/Alma-in-a-basket.jpg"
);
const cat2 = Cat(
    "Little-Black",
    "https://res.cloudinary.com/da6db8qdd/image/upload/v1534442275/cat-clicker/Little-Black.jpg"
);

// Start up the cat app!
catController.init();
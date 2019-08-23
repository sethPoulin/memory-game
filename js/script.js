
const images = [
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left." value="1">',
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left." value="1">',
    '<img src="assets/bozo.jpg" alt="White and brown Corgi puppy against an orange backdrop." value="2">',
    '<img src="assets/bozo.jpg" alt="Brown white and brown Corgi puppy against an orange backdrop." value="2">',
    '<img src="assets/elijah.jpg" alt="Black and brown Doberman puppy." value="3">',
    '<img src="assets/elijah.jpg" alt="Black and brown Doberman puppy." value="3">',
    '<img src="assets/fluffy.jpg" alt="Small white fluffy puppy peeking up from vegetation." value="4">',
    '<img src="assets/fluffy.jpg" alt="Small white fluffy puppy peeking up from vegetation." value="4">',
    '<img src="assets/jairo.jpg" alt="Chocolate Lab puppy looking at the camera." value="5">',
    '<img src="assets/jairo.jpg" alt="Chocolate Lab puppy looking at the camera." value="5">',
    '<img src="assets/jordan.jpg" alt="Grey and white Husky puppy." value="6">',
    '<img src="assets/jordan.jpg" alt="Grey and white Husky puppy." value="6">'
];


const imageOrder = [];


$('.start').on('click',function(){
    $('.start').addClass('hide');
    randomizeImages();
    imageOrder.forEach(function(item){
        $('.gallery ul').append(`<li class="hidden">${item}</li>`);
    }); 
    startPicking();   
});

//function to randomly copy an item from the images array, place it in a new array called imageOrder, and then pop the selected item off of the images array.  This continues until there are no more items left in the images array. 
const randomizeImages = () => {
    while(0 < images.length){
        const randomIndex = Math.floor(Math.random() * images.length);
        const newArrayItem = images.slice(randomIndex,randomIndex + 1);
        images.splice(randomIndex,1);
        imageOrder.push(newArrayItem[0]);
    };
}

const clearArray = (array) => {
    array.length = 0;
}

const checkMatch = (image1, image2) => {

    console.log('checkMatch is running');
    console.log($(image1).attr('value'), $(image2).attr('value'));
    if($(image1).attr('value') === $(image2).attr('value')){
        console.log("it's a match")
        $(image1).parent().addClass('offGrid');
        $(image2).parent().addClass('offGrid');
        
    } 
    else {
        console.log(`it's not a match`);
        setTimeout(()=> {
        $(image1).parent().addClass('hidden');
        $(image2).parent().addClass('hidden');
        },400);
    };

    clearArray(clickedCards);
    startPicking();
}






const clickedCards = [];

const startPicking = () => {
    $('ul').off('click');
    console.log('startPicking has started');
    // clearArray(clickedCards);
    console.log('length of clicked cards array',clickedCards.length);
    $('ul').on('click', 'li',function(){
        console.log('click');
        // console.log('length of array before clicking',clickedCards.length); 
        // if(clickedCards.length === 0){
        $(this).removeClass('hidden');
        $(this).addClass('notClickable');
        
        clickedCards.push(this);
            // console.log('clicked cards array:', clickedCards);
        // } else if(clickedCards.length === 1){
            // $(this).removeClass('hidden');
            // clickedCards.push(this);
            // console.log('clicked cards array:', clickedCards);      
    
        if(clickedCards.length === 2){
            console.log('condition is met, going to run checkMatch');
            checkMatch(clickedCards[0].firstChild,clickedCards[1].firstChild);
            $('.gallery li').removeClass('notClickable');
            // $('ul').off('click','li');
        } else {
            console.log('condition is not met.')
        }; 
        
    });
}

// startPicking();
    // Display rules/instructions on the page. 
    // User clicks button to dismiss rules and reveal grid.
    // Prompt user to click on a card
    // Listen for a click on a card
    // When user clicks on a card, add a class .invisible to its overlay to make the overlay transparent and reveal the headshot underneath
    // Prompt user to click a second card "to see if you have a match."
    // When user clicks on a card, add a class to its overlay to make the overlay transparent.

    // If the value of the second card is equal to the value of the first card, do the following:
        // Add a class of .invisible to both cards to make them disappear from the grid, while keeping the remaining cards in place.
        // Remove class .inPlay on both cards
        // If the number of cards with the class .inPlay < 2, then
        // Display the message: "Congratulations, you win!"
        // If the number of cards with the class .inPlay >= 2, then
        // Display the message: "It's a match!  Please click on two more cards".
 
    // If the second card is not equal to the first card, do the following:
        // Remove the class on the cards so that their overlays return to fully opaque.
        // Display the message: "Sorry, those cards didn't match.  Please click on two more cards."











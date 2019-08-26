
let originalImages = [
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

// const numOfCards = images.length;

const imageOrder = [];
let cardsInPlay = 0;

const gameStart = function(){

    
    // turning off any previously running on click event listeners
    $('.start').off('click');
    // turning on on click event listener for start button
    $('.start').on('click',function(){
        // hiding elements on the page
        $(this).addClass('hide');
        $('.instructions').addClass('hide');
        $('h1').addClass('hide');
        //un-collapsing .gallery section for cards
        $('.gallery .wrapper').addClass('fullHeight');
        
        
        randomizeImages();
        //append each item in imageOrder to the page
        imageOrder.forEach(function(item){
            $('.gallery ul').append(`<li class="hidden" tabindex="0">${item}</li>`);
            cardsInPlay +=1;
        });
        // $('.gallery li').removeClass('offGrid');
        // $('.gallery li').removeClass('hide'); 
        startPicking();   
    });
};

//function to randomly copy an item from the images array, place it in a new array called imageOrder, and then pop the selected item off of the images array.  This continues until there are no more items left in the images array. 
const randomizeImages = () => {
    console.log('randomize images was run');
    let tempImages = originalImages.slice(0);
    // const originalImages = originalImages.slice(0);
    console.log('originalImages:', originalImages);
    console.log('tempImages:', tempImages);
    while(0 < tempImages.length){
        // find a random number between 0 and one less than the number of items in the images array
        const randomIndex = Math.floor(Math.random() * tempImages.length);
        console.log('randomIndex is:', randomIndex);
        // create an array of a single item copied from the images array based on the randomIndex
        const newArrayItem = tempImages.slice(randomIndex,randomIndex + 1);
        console.log('new array item is:', newArrayItem);
        // remove the newArrayItem from the images array 
        tempImages.splice(randomIndex,1);
        // add the newArrayItem to the imageOrder array
        imageOrder.push(newArrayItem[0]);
        console.log('imageOrder:', imageOrder);
        console.log('tempImages:', tempImages);
    };
}

const clearArray = (array) => {
    array.length = 0;
}

const playAgain = () => {
    setTimeout(()=> {
        $('.gallery li').addClass('hide');
        $('.mainWrapper').css('padding-top','');
        $('header .wrapper').append(`
        <h1 class="congratulations">You won!</h1>
        <div class="instructions congratulations">
            <p>Congratulations, you have a great memory.</p>
            <p>Click the button below to play again.</p>
        </div>
        <button class="playAgain congratulations" tabindex="0">Play again</button>
        `);
        $('.gallery .wrapper').removeClass('fullHeight'); 
        }
        ,600);
        $('header .wrapper').on('click', '.playAgain', function(){
            resetStartPage();
            gameStart();
        });
}

const resetStartPage = () => {
    // originalImages = imageOrder.slice(0);
    imageOrder.length = 0;
    console.log('original images:', originalImages);
    console.log('imageOrder length:',imageOrder.length);
    $('h1.congratulations').remove();
    $('div.congratulations').remove();
    $('button.congratulations').remove();
    $('.start').removeClass('hide');
    $('.instructions').removeClass('hide');
    $('h1').removeClass('hide');
}

const checkMatch = (image1, image2) => {

    if($(image1).attr('value') === $(image2).attr('value')){
        $(image1).parent().addClass('offGrid');
        $(image2).parent().addClass('offGrid');
        // originalImages.push(`${image1}`);
        // originalImages.push(`${image2}`);
        console.log('originalImages is now:', originalImages);
        cardsInPlay -= 2;
        if(cardsInPlay === 0) {
            playAgain();
        }
    } else {
        setTimeout(()=> {
        $(image1).parent().addClass('hidden');
        $(image2).parent().addClass('hidden');
        },400);
    };
    clearArray(clickedCards);
    startPicking();
}

const clickedCards = [];

const checkNumberOfPicks = function(card) {
    $(card).removeClass('hidden');
    $(card).addClass('notClickable');
    $(card).removeAttr('tabindex');
    
    clickedCards.push(card);
    
   
    if(clickedCards.length === 2){
        // console.log('items submitted for checking:',$(clickedCards[0]).firstchild,$(clickedCards[1]));
        checkMatch(clickedCards[0].firstChild,clickedCards[1].firstChild);
        
        $('.gallery li').removeClass('notClickable');
        $('.gallery li').removeAttr('tabindex');
        $('.gallery li').attr('tabindex','0');
    }; 
}

const startPicking = () => {
    $('ul').off('click');
    $('ul').off('keydown');
    console.log('startPicking has started');
    // clearArray(clickedCards);
    console.log('length of clicked cards array',clickedCards.length);
    $('ul').on('keydown', 'li',function(e){
        if(e.which == 13 || e.which == 32){
            console.log('click');
            checkNumberOfPicks(this);
            $(this).keydown(function(e){
                e.stopPropagation();
            });
            // console.log('length of array before clicking',clickedCards.length); 
            // if(clickedCards.length === 0){   
        }   
    });
    $('ul').on('click', 'li', function(){
        checkNumberOfPicks(this);
    });
}

gameStart();

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











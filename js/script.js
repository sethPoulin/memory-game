// const memoryApp = {};
const images = [
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left">',
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left">',
    '<img src="assets/bozo.jpg" alt="Brown white and brown Corgi puppy against orange backdrop">',
    '<img src="assets/bozo.jpg" alt="Brown white and brown Corgi puppy against orange backdrop">'
];


const imageOrder = [];
const randomizeImages = () => {
    for(i = 0;i < images.length; i++){
        // console.log('hello');
        const randomIndex = Math.floor(Math.random() * images.length);
        console.log(randomIndex);
        // const newArrayItem = images.slice(randomIndex,1);
        // imageOrder.push(newArrayItem);
    };
}

randomizeImages();



// const init = ()=>{

// }

$(function(){
    $('.start').on('click',function(){

    })
    const hide = (item)=>{
        item.addClass('hidden');
    }
    $('.gallery li').on('click', function(){
        // (this).addClass('hidden');
        $(this).toggleClass('hidden');
    });
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
});










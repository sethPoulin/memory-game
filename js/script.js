
const images = [
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left">',
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left">',
    '<img src="assets/bozo.jpg" alt="Brown white and brown Corgi puppy against orange backdrop">',
    '<img src="assets/bozo.jpg" alt="Brown white and brown Corgi puppy against orange backdrop">',
    '<img src="assets/elijah.jpg" alt="Black and brown Doberman puppy">',
    '<img src="assets/elijah.jpg" alt="Black and brown Doberman puppy">',
    '<img src="assets/fluffy.jpg" alt="Small white fluffy puppy peeking up from vegetation">',
    '<img src="assets/fluffy.jpg" alt="Small white fluffy puppy peeking up from vegetation">',
    '<img src="assets/jairo.jpg" alt="Chocolate Lab puppy looking at the camera">',
    '<img src="assets/jairo.jpg" alt="Chocolate Lab puppy looking at the camera">',
    '<img src="assets/jordan.jpg" alt="Grey and white Husky puppy">',
    '<img src="assets/jordan.jpg" alt="Grey and white Husky puppy">'
];


const imageOrder = [];
//function to randomly copy an item from the images array, place it in a new array called imageOrder, and then pop the selected item off of the images array.  This continues until there are no more items left in the images array. 
const randomizeImages = () => {
    while(0 < images.length){
        const randomIndex = Math.floor(Math.random() * images.length);
        // console.log(randomIndex);
        const newArrayItem = images.slice(randomIndex,randomIndex + 1);
        // console.log("newArrayItem", newArrayItem);
        images.splice(randomIndex,1);
        imageOrder.push(newArrayItem[0]);
        // console.log("images array:", images);
        // console.log("images length:", images.length);
        // console.log("imageOrder array:", imageOrder);

    };
}
//Need to build in this functionality: when user clicks start, run the following function:
$('.start').on('click',function(){
    // empties the ul
    // $('.gallery ul').html('');
    $('.start').addClass('hide');
    randomizeImages();
    imageOrder.forEach(function(item){
        $('.gallery ul').append(`<li class="hidden">${item}</li>`);
    });    
})

// take images in imageOrder and append it to the ul





// const init = ()=>{

// }


    
// const hide = (item)=>{
//     item.addClass('hidden');
// }
$('ul').on('click', 'li',function(){
    console.log('item clicked');
    console.log(this);
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











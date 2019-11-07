$(document).ready(function(){

    const imageBank = [
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left." value="1">',
    '<img src="assets/berkay.jpg" alt="Golden retreiver puppy looking left." value="1">',
    '<img src="assets/bozo.jpg" alt="White and brown Corgi puppy against an orange backdrop." value="2">',
    '<img src="assets/bozo.jpg" alt="White and brown Corgi puppy against an orange backdrop." value="2">',
    '<img src="assets/elijah.jpg" alt="Black and brown Doberman puppy." value="3">',
    '<img src="assets/elijah.jpg" alt="Black and brown Doberman puppy." value="3">',
    '<img src="assets/fluffy.jpg" alt="Small white fluffy puppy peeking up from vegetation." value="4">',
    '<img src="assets/fluffy.jpg" alt="Small white fluffy puppy peeking up from vegetation." value="4">',
    '<img src="assets/jairo.jpg" alt="Chocolate Lab puppy looking at the camera." value="5">',
    '<img src="assets/jairo.jpg" alt="Chocolate Lab puppy looking at the camera." value="5">',
    '<img src="assets/jordan.jpg" alt="Grey and white Husky puppy." value="6">',
    '<img src="assets/jordan.jpg" alt="Grey and white Husky puppy." value="6">',
    '<img src="assets/shane.jpg" alt="Golden Labrador puppy licking its lips." value="7">',
    '<img src="assets/shane.jpg" alt="Golden Labrador puppy licking its lips." value="7">'
    ];


    const imageOrder = [];
    let cardsInPlay = 0;
    const cardsInGame = [];


    const setupGame = () => {

        // turning off any previously running on click event listeners
        $('.start').off('click');
        // turning on onclick event listener for start button
        $('.start').on('click',function(e){
            e.preventDefault();
            // hiding elements on the page
            // $(this).addClass('hide');
            $('.instructions').addClass('hide');
            $('h1').addClass('hide');
            $('form').addClass('hide');
            //un-collapsing .gallery section for cards
            $('.gallery .wrapper').addClass('fullHeight');
            //pick the appropriate number of cards to include in the game based on the user's input
            pickCardsInGame();  
            //randomize the images       
            randomizeImages();
            //append each image to the page
            imageOrder.map((item, index) => {
                $('.gallery ul').append(`
                <li class="hidden" tabindex="0" key="${index}">${item}</li>
                `);
                //increment the number of cards in play each time a card is appended to the page
                cardsInPlay = index + 1;
            });
            startClickListeners();   
        });
    };

    //randomly selects pairs of cards from imageBank to include in the game based on userNumOfCards
    const pickCardsInGame = () => {

        clearArray(cardsInGame);
        //get value of userNumberOfCards and turn it into a number
        const userNumberOfCards = Number($('select').val());
        
        //make a copy of the imageBank array to pull pairs of cards from    
        const copiedImageBank = imageBank.slice(0);

        //Do the following as many times as half the number of elements in the original imageBank array.  We do it half the number of times because each time the loop runs it will remove 2 items from the array, and we only want it to run until the copied array is empty.
        for(let i = 0; i < userNumberOfCards / 2; i++){
            //get a random number between 0 and the number of items in imageBank
            let randomCardIndex = Math.floor(Math.random() * copiedImageBank.length);
            //make sure that the randomNumber is even
            randomCardIndex % 2 !== 0 ? randomCardIndex -= 1 : randomCardIndex;

            const currentCards = copiedImageBank.splice(randomCardIndex,2);
            cardsInGame.push(...currentCards)
        }
    }

    const randomizeImages = () => {

        // Clone the imageBank array so original array can be re-used when game restarts
        let tempImages = cardsInGame.slice(0);
        //Cycle through the tempImages array until there are no items left.
        while(0 < tempImages.length){
            // find a random number between 0 and one less than the number of items in the images array
            const randomIndex = Math.floor(Math.random() * tempImages.length);
            //remove the item at index of randomIndex tempImages and return it in a new array.
            const imageToAdd = tempImages.splice(randomIndex,1);
            //push that array into imageOrder.
            imageOrder.push(imageToAdd[0]);
            //empty out imageToAdd
            clearArray(imageToAdd);
        };
    }

    const startClickListeners = () => {

        // Removes any prior event listeners
        $('ul').off('click');
        $('ul').off('keydown');
        //Starts event listener for clicks on cards.  When a card is clicked, run checkNumberOfPicks function with that card as an argument.
        $('ul').on('click', 'li', function(){
            checkNumberOfPicks(this);
        });
        //Same as above but listens for keyboard input to pick the card.
        $('ul').on('keydown', 'li',function(e){
            if(e.which == 13 || e.which == 32){
                checkNumberOfPicks(this);
                }
            }
        )
    }

    const clickedCards = [];

    // Checks the current number of card pics and runs checkmatch() once 2 cards have been picked.
    const checkNumberOfPicks = function(card) {

        $('p.warning').addClass('transparent');
        
        $(card).removeClass('hidden');
        // Makes picked card unlclickable so as not to trigger 'win' event with same card behaving like 2 identical cards

        if (clickedCards.length === 0) {
            clickedCards.push(card);

        } else if(
            (clickedCards.length === 1) && ($(card).attr('key')===$(clickedCards[0]).attr('key'))) {
 
                $('p.warning').removeClass('transparent');

        } else if(
            clickedCards.length ===1
        ) {
            clickedCards.push(card)
            checkMatch(clickedCards[0].firstChild,clickedCards[1].firstChild);
        };
    };
      
    //empties out an array
    const clearArray = (array) => {
        array.length = 0;
    }

    //Checks if 2 cards are a match
    const checkMatch = (card1, card2) => {

        //If the value of card1 is equal to the value of card2
        if($(card1).attr('value') === $(card2).attr('value')){
            //Remove both cards from the grid
            $(card1).parent().addClass('offGrid');
            //and remove the tabIndex so tab will only work on items remaining on the board.
            $(card1).parent().removeAttr('tabindex');
            $(card2).parent().addClass('offGrid');
            $(card2).parent().removeAttr('tabindex');
            //Subtract 2 from the the number of cards in play.
            cardsInPlay -= 2;
            //If cardsInPlay is now at zero, run the playAgain function.
            if(cardsInPlay === 0) {
                playAgain();
            }
        
        } else {
            //Re-hide the two picked cards after .5 seconds.
            setTimeout(()=> {
            $(card1).parent().addClass('hidden');
            $(card2).parent().addClass('hidden');
            },500);
        };
        //clear the clickedCards array
        clearArray(clickedCards);

        startClickListeners();
    }


    const playAgain = () => {
        //wait 0.6 seconds and then
        setTimeout(()=> {
            //hide the cards gallery section
            $('.gallery li').addClass('hide');
            //display the congratulations message
            $('header .wrapper').append(`
            <h1 class="congratulations">You won!</h1>
            <div class="instructions congratulations">
                <p>You have a great memory!</p>
                <p>Click the button below to play again.</p>
            </div>
            <button class="playAgain congratulations" tabindex="0">Play again</button>
            `);
            //removes height of .gallery section to eliminate scrolling on play again page
            $('.gallery .wrapper').removeClass('fullHeight'); 
            },600);
            //when user clicks playAgain button
            $('header .wrapper').on('click', '.playAgain', function(){
                //reset the start page
                resetStartPage();
                //start the game
                setupGame();
            });
    }

    const resetStartPage = () => {
        //empties the imageOrder array
        imageOrder.length = 0;

        //removes the congratulations message and play again buttons
        $('h1.congratulations').remove();
        $('div.congratulations').remove();
        $('button.congratulations').remove();
        //unhides the start elements 
        // $('.start').removeClass('hide');
        $('.instructions').removeClass('hide');
        $('h1').removeClass('hide');
        $('form').removeClass('hide');
    }

    //starts the game
    setupGame();

});









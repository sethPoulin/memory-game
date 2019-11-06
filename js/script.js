$(document).ready(function(){

    const originalImages = [
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
    let cardsInPlay = 0;

    const gameStart = () => {

        // turning off any previously running on click event listeners
        $('.start').off('click');
        // turning on onclick event listener for start button
        $('.start').on('click',function(){
            // hiding elements on the page
            $(this).addClass('hide');
            $('.instructions').addClass('hide');
            $('h1').addClass('hide');
            //un-collapsing .gallery section for cards
            $('.gallery .wrapper').addClass('fullHeight');
                    
            randomizeImages();
            //append each item in imageOrder to the page
            imageOrder.map(function(item, index){
                $('.gallery ul').append(`<li class="hidden" key="${index}">${item}</li>`);
                cardsInPlay +=1;
            });

            startClickListeners();   
        });
    };

    const randomizeImages = () => {

        // Clone the originalImages array so original array can be re-used when game restarts
        let tempImages = originalImages.slice(0);
        //Cycle through the tempImages array until there are no items left.
        while(0 < tempImages.length){
            // find a random number between 0 and one less than the number of items in the images array
            const randomIndex = Math.floor(Math.random() * tempImages.length);
            // create an array of a single item *copied* from the images array based on the randomIndex
            const newArrayItem = tempImages.slice(randomIndex,randomIndex + 1);
            // remove the newArrayItem from the images array 
            tempImages.splice(randomIndex,1);
            // add the newArrayItem to the imageOrder array
            imageOrder.push(newArrayItem[0]);
        };
    }

    const startClickListeners = () => {

        // Removes any prior event listeners
        $('ul').off('click');
        //Starts event listener for clicks on cards
        $('ul').on('click', 'li', function(){
            checkNumberOfPicks(this);
        });
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
            //remove both cards from the grid
            $(card1).parent().addClass('offGrid');
            $(card2).parent().addClass('offGrid');
            //and subtract 2 from the the number of cards in play
            cardsInPlay -= 2;
            //if cardsInPlay is now at zero, run the playAgain function
            if(cardsInPlay === 0) {
                playAgain();
            }
        
        } else {
            //re-hide the two picked cards after .5 seconds.
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
            //remove the padding-top from .mainWrapper
            // $('.mainWrapper').css('padding-top','');
            //display the congratulations message
            $('header .wrapper').append(`
            <h1 class="congratulations">You won!</h1>
            <div class="instructions congratulations">
                <p>Congratulations, you have a great memory.</p>
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
                gameStart();
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
        $('.start').removeClass('hide');
        $('.instructions').removeClass('hide');
        $('h1').removeClass('hide');
    }

    //starts the game
    gameStart();

});









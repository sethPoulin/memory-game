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

    const gameStart = function(){

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

            startPicking();   
        });
    };

    const randomizeImages = () => {

        // Clone the originalImages array so it can be used again when game restarts
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

    const startPicking = () => {

        // Removes any prior event listeners
        $('ul').off('click');
        //Starts event listener for clicks on cards
        $('ul').on('click', 'li', function(){
            checkNumberOfPicks(this);
        });
    }

    const clickedCards = [];

    // Runs checkmatch() once 2 cards have been picked.
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
      
        // console.log('clickCards length after first push', clickedCards.length);
        // console.log('clicked card key:',$(clickedCards[0]).attr('key'));

        
        // console.log('clickCard length before misfire:', clickedCards.length);

    const clearArray = (array) => {
        array.length = 0;
    }

    const checkMatch = (image1, image2) => {
        console.log('checkmatch was run')

        if($(image1).attr('value') === $(image2).attr('value')){
            // If cards match, remove them from the grid and decrease number of cardsInPlay by 2.
            $(image1).parent().addClass('offGrid');
            $(image2).parent().addClass('offGrid');
            cardsInPlay -= 2;
            if(cardsInPlay === 0) {
                playAgain();
            }
        } else {
            //re-hide the two picked cards after 400 milliseconds.
            setTimeout(()=> {
            $(image1).parent().addClass('hidden');
            $(image2).parent().addClass('hidden');
            },400);
        };
        clearArray(clickedCards);
        startPicking();
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
            //removes height of .gallery section to eliminate scrolling on play again page
            $('.gallery .wrapper').removeClass('fullHeight'); 
            },600);
            $('header .wrapper').on('click', '.playAgain', function(){
                resetStartPage();
                gameStart();
            });
    }

    const resetStartPage = () => {
        //empties the imageOrder array
        imageOrder.length = 0;

        $('h1.congratulations').remove();
        $('div.congratulations').remove();
        $('button.congratulations').remove();
        $('.start').removeClass('hide');
        $('.instructions').removeClass('hide');
        $('h1').removeClass('hide');
    }

    gameStart();

});









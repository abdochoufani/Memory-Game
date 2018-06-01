/*



 * Create a list that holds all of your cards
 */

'use strict';
 const cardSet = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane','fa fa-paper-plane','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];
let cardsOpen=[];
let matchedCards=[];
const theDeck = document.querySelector('.deck');
const start = document.querySelector('.btn');
const instruction= document.querySelector('.instructions');
let isStart=false;
console.log(isStart);
let score;



	function inital(){

	shuffle(cardSet);
	for(let i=0; i<cardSet.length;i++){
		const cards= document.createElement('li');
		cards.innerHTML='<i class="'+ cardSet[i] +'"></i>';
		cards.classList.add('card');
        theDeck.appendChild(cards);
        clickedCard(cards);
     }
     timerStart();
     start.style.display='none';


}




function clickedCard(cards){
	cards.addEventListener('click', function(){
		start.style.display='none';
		const currentCard=this;
	    const preCard=cardsOpen[0];
	    //if a one card is already open
	if (cardsOpen.length === 1){
		currentCard.classList.add('open','show');
		cardsOpen.push(currentCard);
        compareCards(preCard, currentCard);
  //if no cards are open
	}else{
		currentCard.classList.add('open','show','lock');
		cardsOpen.push(this);
	}
});

}


//compare the two open cards
function compareCards(preCard,currentCard){
if(preCard.innerHTML === currentCard.innerHTML){
		preCard.classList.add('match');
		currentCard.classList.add('match');
		matchedCards.push(preCard, currentCard);
		isOver();
		cardsOpen=[];
	}else{
		setTimeout(function (){
		preCard.classList.remove('open','show');
		currentCard.classList.remove('open','show');
	}, 700);
		cardsOpen=[];
    }
    addMove();
}





//check if the game is over
function isOver(){
	if(matchedCards.length === cardSet.length){
		score= ((1000 * starsNb)-move)/time;
		isStart=false;
		console.log(isStart);
	setTimeout(function(){
 	gameOver();
 	},400);
 	stopTimer();

  }
}



//incremmenting the moves

const movesContainer=document.querySelector('.moves');
let move=0;
movesContainer.innerHTML = 0;


function addMove(){
	move++;
	if(move === 1){
	movesContainer.innerHTML = move +' move';
   }else{
	movesContainer.innerHTML = move +' moves';
}
	console.log(move);
	rating();

}


//Star rating
const ratingContainer= document.querySelector('.stars');
let starsNb=0;
const star = '<i class="fa fa-star"></i>';
ratingContainer.innerHTML = star + star + star;
function rating(){
if(move<=15){
ratingContainer.innerHTML=star+star+star;
starsNb=3;
}else if (move<=20){
	ratingContainer.innerHTML=star+star;
	starsNb=2;
}else{
ratingContainer.innerHTML=star;
starsNb=1;
   }
}


//stop timer

//Timer
const timeContainer=document.querySelector('.time');
let time=0;

 var startTimer;
function timerStart(){
 startTimer= setInterval(function (){
  time++;
  timeContainer.innerHTML= time + '  sec';
    },1000);
}
//start timer
//this function will happen every 1000ms=1s
function stopTimer(){
	clearInterval(startTimer);
}






// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//create the reset button to replace the start button
const reset= document.querySelector('.restart-btn');
function addResetBtn(){
	const resetbtn = '<i class="fa fa-repeat"></i>';
	reset.innerHTML = resetbtn;

}

//start the game for the first time
start.addEventListener('click', function(){
	isStart=true;
	instruction.style.display='none';
    inital();
	addResetBtn();

});


//reset the game
reset.addEventListener('click',function (){
	theDeck.innerHTML='';
	cardsOpen =[];
	move=0;
	starsNb=0;
	matchedCards=[];
	ratingContainer.innerHTML = star + star + star;
	movesContainer.innerHTML = move;
	stopTimer();
	time=0;
	score=0;
	console.log(isStart);
    inital();
});




var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




// When the user clicks on the button, open the modal
function startModal() {
    modal.style.display = "block";
}
function gameOver(){
const modalContent=document.querySelector('.modal-text');
modalContent.innerHTML='Congratulations!!<br/> you have finished the game in '+ time +' seconds. <br/> It took you only '+ move + ' moves.<br/> '+ ratingContainer.innerHTML + '<br/> Your final score is ' + score.toFixed(0) + ' over 100' ;

  startModal();
// When the user clicks on <span> (x), close the modal

span.addEventListener ('click', function() {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener( 'click',function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  });
    stopTimer();
}

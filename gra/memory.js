var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

var c0 = document.getElementById("c0");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");

var c4 = document.getElementById("c4");
var c5 = document.getElementById("c5");
var c6 = document.getElementById("c6");
var c7 = document.getElementById("c7");

var c8 = document.getElementById("c8");
var c9 = document.getElementById("c9");
var c10 = document.getElementById("c10");
var c11 = document.getElementById("c11");

c0.addEventListener("click", function(){revealCard(0);});
c1.addEventListener("click", function(){revealCard(1);});
c2.addEventListener("click", function(){revealCard(2);});
c3.addEventListener("click", function(){revealCard(3);});

c4.addEventListener("click", function(){revealCard(4);});
c5.addEventListener("click", function(){revealCard(5);});
c6.addEventListener("click", function(){revealCard(6);});
c7.addEventListener("click", function(){revealCard(7);});

c8.addEventListener("click", function(){revealCard(8);});
c9.addEventListener("click", function(){revealCard(9);});
c10.addEventListener("click", function(){revealCard(10);});
c11.addEventListener("click", function(){revealCard(11);});

var oneVisible=false;
var turnCounter = 0;
var visibleNumber;
var lock = false;
var pairsLeft = 6;

function losuj(){
	var cardsLosowanie = new Array(12);
	var losowanie = [12,12,12,12,12,12,12,12,12,12,12,12];
	var t;
	var liczbaWystapila = false;
	for(var i=0; i<12 ; i++){
		t=Math.round(Math.random()*11);
		for(var j=0; j<i;j++){
			if(losowanie[j]==t){
				liczbaWystapila=true;
			}
		}
		if(liczbaWystapila==false){
			losowanie[i]=t;
		}else{
			liczbaWystapila=false;
			i--;
		}
	}
	for(var i=0; i<12 ; i++){
		cardsLosowanie[i] = cards[losowanie[i]];
	}
	for(var i=0; i<12 ; i++){
		cards[i] = cardsLosowanie[i];
	}
	console.log(cards);
	}


function revealCard(nr){
	var opacityValue = $('#c'+nr).css('opacity');
	
	//start funkcji
	if(opacityValue!='0' && lock == false){
		lock = true;

	var obraz = "url(img/"+cards[nr]+")";
	$('#c'+nr).css('background-image', obraz);
	$('#c'+nr).addClass('cardA');
	$('#c'+nr).removeClass('card');
	if(oneVisible==false){
		// first card
		oneVisible=true;
		lock = false;
		visibleNumber = nr;
	}else{
		
		// second card
		if(cards[nr]==cards[visibleNumber]){
			//alert('para');
		setTimeout(function(){
			hide2Cards(nr,visibleNumber);
			lock = false;
			pairsLeft--;
			if(pairsLeft==0){
				$('.board').html('<h1> You win <br /> Done in ' + turnCounter + ' turns <br /><span class="reset" onclick="location.reload()">Play Again</span></h1>' );
				
				
			}
			}, 750);
			
		
		}else{
			//alert('pudlo');
			setTimeout(function(){
				restore2Cards(nr,visibleNumber);
				lock = false;
			}, 1000);
		}
		
		turnCounter++;
		$('.score').html("Turn counter: "+turnCounter);
		oneVisible=false;
		
	}
	}
	
}

function hide2Cards(nr1, nr2){
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	
}
function restore2Cards(nr1, nr2){
	
	$('#c'+nr1).css('background-image', 'url(img/karta.png)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');
	$('#c'+nr2).css('background-image','url(img/karta.png)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');
	
}

window.onload = losuj;


// Auction Items
const auctionItems=[
{title:"A chocolate cake", description:"A delicious chocolate cake with rich frosting...", image:"https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", actualPrice:450},
{title:"Antique Pocket Watch", description:"Silver pocket watch from early 1900s with intricate engravings.", image:"https://images.unsplash.com/photo-1518131672697-613becd4fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", actualPrice:320},
{title:"Signed Baseball", description:"Baseball signed by 1998 championship team, in protective case.", image:"https://images.unsplash.com/photo-1549638441-b787d2e11f14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", actualPrice:280},
{title:"Art Deco Lamp", description:"Beautiful Art Deco table lamp with stained glass shade.", image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", actualPrice:175},
{title:"Rare Comic Book", description:"First edition comic book in near-mint condition, professionally graded.", image:"https://images.unsplash.com/photo-1621535852673-4c6b2b6b5b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", actualPrice:1200}
];

// State
let currentRound=0, score=0, timer, timeLeft=30, playerBid=0;

// DOM
const itemImage=document.getElementById('item-image');
const itemTitle=document.getElementById('item-title');
const itemDescription=document.getElementById('item-description');
const bidInput=document.getElementById('bid-input');
const bidButton=document.getElementById('bid-button');
const resultSection=document.getElementById('result-section');
const actualPriceElement=document.getElementById('actual-price');
const playerBidElement=document.getElementById('player-bid');
const pointsEarnedElement=document.getElementById('points-earned');
const nextRoundButton=document.getElementById('next-round-button');
const gameOverSection=document.getElementById('game-over');
const finalScoreElement=document.getElementById('final-score');
const restartButton=document.getElementById('restart-button');
const scoreElement=document.getElementById('score');
const timerElement=document.getElementById('timer');
const timerProgress=document.getElementById('timer-progress');
const auctionItemDiv=document.getElementById('auction-item');

// Init
function initGame(){currentRound=0; score=0; scoreElement.textContent=score; auctionItemDiv.style.display='flex'; gameOverSection.style.display='none'; loadRound();}
function loadRound(){
    const item=auctionItems[currentRound];
    itemImage.src=item.image;
    itemTitle.textContent=item.title;
    itemDescription.textContent=item.description;
    bidInput.value=''; bidInput.disabled=false; bidButton.disabled=false;
    resultSection.style.display='none'; timeLeft=30; timerElement.textContent=timeLeft; timerProgress.style.width='100%';
    if(timer) clearInterval(timer); startTimer();
}
function startTimer(){
    timer=setInterval(()=>{
        timeLeft--; timerElement.textContent=timeLeft;
        timerProgress.style.width=(timeLeft/30*100)+'%';
        if(timeLeft<=0){clearInterval(timer); endRound();}
    },1000);
}
function endRound(){
    clearInterval(timer);
    bidInput.disabled=true; bidButton.disabled=true;
    if(playerBid===0) playerBid=0;
    const actualPrice=auctionItems[currentRound].actualPrice;
    const differencePercent=Math.abs(actualPrice-playerBid)/actualPrice;
    let points=0;
    if(differencePercent===0) points=100;
    else if(differencePercent<=0.1){points=75; showConfetti();}
    else if(differencePercent<=0.25) points=50;
    else if(differencePercent<=0.5) points=25;
    else points=10;
    score+=points;
    scoreElement.textContent=score; scoreElement.classList.add('score-updated');
    setTimeout(()=>scoreElement.classList.remove('score-updated'),500);
    actualPriceElement.textContent=`Actual Price: $${actualPrice}`;
    playerBidElement.textContent=`Your Bid: $${playerBid}`;
    pointsEarnedElement.textContent=`Points Earned: ${points}`;
    resultSection.style.display='block';
    playerBid=0;
}
function nextRound(){currentRound++; if(currentRound<auctionItems.length) loadRound(); else gameOver();}
function gameOver(){auctionItemDiv.style.display='none'; gameOverSection.style.display='block'; finalScoreElement.textContent=score;}

// Events
bidButton.addEventListener('click',()=>{
    const val=parseInt(bidInput.value);
    if(isNaN(val)||val<=0){alert('Enter valid bid!'); return;}
    playerBid=val; endRound();
});
nextRoundButton.addEventListener('click',nextRound);
restartButton.addEventListener('click',initGame);
bidInput.addEventListener('keypress',(e)=>{if(e.key==='Enter') bidButton.click();});
window.addEventListener('load',initGame);

// Confetti
function showConfetti(){
    for(let i=0;i<30;i++){
        const confetti=document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.background=`hsl(${Math.random()*360},80%,60%)`;
        confetti.style.left=Math.random()*window.innerWidth+'px';
        confetti.style.animationDuration=1+Math.random()+'s';
        document.body.appendChild(confetti);
        setTimeout(()=>{confetti.remove();},1500);
    }
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores, roundScores, activePlayer, gamePlaying;
alert(`
RULES
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

`);
init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        // 1. Random Number
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result


        document.getElementById('dice-0').style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

        if (dice0 !== 1 && dice1 !== 1) {
            //Add Score
            roundScore += dice0 + dice1; //roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {

            //Next Player
            nextPlayer();
        }


        // 3. Update the round Score if the rolled number was not 1.
        /*
        if (dice === 6 && lastDice === 6) {
            //Player Looses score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //Add Score
            roundScore += dice; //roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {

            //Next Player
            nextPlayer();
        }

        var lastDice = dice;
        */
    }


});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add currentScore to Global Score
        scores[activePlayer] += roundScore; // scores[activePlayer] = scores[activePlayer] + roundScore
        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0 , null or "" are coerced to false
        //Anything else is coerced to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {

            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // NextPlayer 
            nextPlayer();
        }
    }
});



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add("active");
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    if (!gamePlaying) {
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;

        document.getElementById('dice-0').style.display = 'none';
        document.getElementById('dice-1').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    } else {
        gamePlaying = true;
    }


}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
'use strict';
//Selecting Elemen
alert(
  `The role : if dice "1" switch player & current score - 25, player reach score 100 is winner`
);
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnCurrentLabel = document.querySelector('.current-label');
let activePlayer, win, holdScore, currentScore, score, total;

//Starting Condition
const resetAll = function () {
  activePlayer = 0;
  win = false;
  holdScore = [0, 0];
  currentScore = [0, 0];
  score = [0, 0];
  total = [0, 0];
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  diceEL.classList.add('hidden');
  document.querySelector('.winner0').classList.add(`hidden`);
  document.querySelector('.winner1').classList.add(`hidden`);
};
resetAll();
function checkTotal(total, win) {
  if (total >= 100) {
    document.querySelector(`.player--${win}`).classList.add(`player--winner`);
    document.querySelector(`.winner${win}`).classList.toggle('hidden');
    // document.querySelector(`.win${win}`).style.fontSize = '3rem';
    diceEL.classList.add('hidden');
    return true;
  }
}
const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};
btnNew.addEventListener('click', resetAll);
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!win) {
    //1. generating a random dice roll
    let dadu = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dadu}.png`;
    //3. check for rolled 1
    if (dadu !== 1) {
      currentScore[`${activePlayer}`] += dadu;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore[`${activePlayer}`];
      total[`${activePlayer}`] =
        holdScore[`${activePlayer}`] + currentScore[`${activePlayer}`];
      win = checkTotal(total[`${activePlayer}`], `${activePlayer}`);
    } else {
      currentScore[`${activePlayer}`] =
        currentScore[`${activePlayer}`] < 25
          ? currentScore[`${activePlayer}`]
          : (currentScore[`${activePlayer}`] -= 25);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore[`${activePlayer}`];
      switchPlayer();
    }
    // if (dadu === 1 && activePlayer === 0) {
    //   activePlayer = 1;
    //   player0.classList.remove('player--active');
    //   player1.classList.add('player--active');
    // } else if (dadu === 1 && current === 1) {
    //   activePlayer = 0;
    //   player0.classList.add('player--active');
    //   player1.classList.remove('player--active');
    // }

    // if (activePlayer === 0 && dadu !== 1) {
    //   tempTotal0 += dadu;
    //   current0EL.textContent = tempTotal0;
    //   let total0 = score0 + tempTotal0;
    //   win = checkTotal(total0, 0);
    // } else if (activePlayer === 1 && dadu !== 1) {
    //   tempTotal1 += dadu;
    //   current1EL.textContent = tempTotal1;
    //   let total1 = score1 + tempTotal1;
    //   win = checkTotal(total1, 1);
    // }
  }
});
btnHold.addEventListener('click', function () {
  // if (!win) {
  //   if (activePlayer === 0) {
  //     holdScore[`${activePlayer}`] += currentScore[`${activePlayer}`];
  //     score0EL.textContent = holdScore[`${activePlayer}`];
  //     currentScore[`${activePlayer}`] = 0;
  //     total[`${activePlayer}`] = holdScore[`${activePlayer}`];
  //     win = checkTotal(total[`${activePlayer}`], `${activePlayer}`);
  //     current0EL.textContent = currentScore[`${activePlayer}`];
  //     // win = score0 >= 100 ? true : false;
  //     switchPlayer();
  //   } else if (activePlayer === 1) {
  //     holdScore[`${activePlayer}`] += currentScore[`${activePlayer}`];
  //     score1EL.textContent = holdScore[`${activePlayer}`];
  //     currentScore[`${activePlayer}`] = 0;
  //     total[`${activePlayer}`] = holdScore[`${activePlayer}`];
  //     win = checkTotal(total[`${activePlayer}`], `${activePlayer}`);
  //     current1EL.textContent = currentScore[`${activePlayer}`];
  //     // win = score0 >= 100 ? true : false;
  //     switchPlayer();
  //   }
  // }
  if (!win) {
    holdScore[`${activePlayer}`] += currentScore[`${activePlayer}`];
    document.querySelector(`#score--${activePlayer}`).textContent =
      holdScore[`${activePlayer}`];
    currentScore[`${activePlayer}`] = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore[`${activePlayer}`];
    total[`${activePlayer}`] = holdScore[`${activePlayer}`];
    win = checkTotal(total[`${activePlayer}`], `${activePlayer}`)
      ? true
      : switchPlayer();
    // win = score0 >= 100 ? true : false;
    // if (!win) switchPlayer();
  }
});

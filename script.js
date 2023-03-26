'use strict';
//Selecting Elemen
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
//Starting Condition
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');
let tempTotal0 = 0;
let tempTotal1 = 0;
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnCurrentLabel = document.querySelector('.current-label');
let current = 0;
let score0 = 0;
let score1 = 0;
let win = false;
function checkTotal(total, win) {
  if (total >= 100) {
    document.querySelector(`.win${win}`).textContent = 'WINNER';
    document.querySelector(`.win${win}`).style.fontSize = '3rem';
    return true;
  }
}
function resetAll() {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  current = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  win = false;
  tempTotal0 = 0;
  tempTotal1 = 0;
  score0 = 0;
  score1 = 0;
  diceEL.classList.add('hidden');
  document.querySelector('.win0').textContent = 'Current';
  document.querySelector('.win1').textContent = 'Current';
  document.querySelector('.win0').style.fontSize = '1.7rem';
  document.querySelector('.win1').style.fontSize = '1.7rem';
}
btnNew.addEventListener('click', resetAll);
btnRoll.addEventListener('click', function () {
  if (!win) {
    let dadu = Math.trunc(Math.random() * 6 + 1);
    if (dadu === 1 && current === 0) {
      current = 1;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else if (dadu === 1 && current === 1) {
      current = 0;
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
    }

    if (current === 0 && dadu !== 1) {
      tempTotal0 += dadu;
      current0EL.textContent = tempTotal0;
      let total0 = score0 + tempTotal0;
      win = checkTotal(total0, 0);
      // if (total0 >= 100) {
      //   document.querySelector('.win0').textContent = 'WINNER';
      //   document.querySelector('.win0').style.fontSize = '3rem';
      //   win = true;
      //   //   resetAll();
      // }
    } else if (current === 1 && dadu !== 1) {
      tempTotal1 += dadu;
      current1EL.textContent = tempTotal1;
      let total1 = score1 + tempTotal1;
      win = checkTotal(total1, 1);
      // if (total1 >= 100) {
      //   document.querySelector('.win1').textContent = 'WINNER';
      //   document.querySelector('.win1').style.fontSize = '3rem';
      //   win = true;
      //   //   resetAll();
      // }
    }
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dadu}.png`;
  }
});
btnHold.addEventListener('click', function () {
  if (!win) {
    if (current === 0) {
      current = 1;
      score0 += tempTotal0;
      score0EL.textContent = score0;
      tempTotal0 = 0;
      win = checkTotal(score0, 0);
      current0EL.textContent = tempTotal0;
      // win = score0 >= 100 ? true : false;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else if (current === 1) {
      current = 0;
      score1 += tempTotal1;
      score1EL.textContent = score1;
      tempTotal1 = 0;
      win = checkTotal(score1, 1);
      // win = score1 >= 100 ? true : false;
      current1EL.textContent = tempTotal1;
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
    }
  }
});

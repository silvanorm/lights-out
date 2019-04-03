let count = 1;
const lightWidth = 5;
const lightHeight = 5;
const numberOfLights = lightWidth * lightHeight;
const lights = [];
const levels = {
  level1: [0, 0, 0, 0, 1,
           0, 0, 0, 1, 1,
           0, 0, 0, 0, 1,
           0, 0, 0, 0, 0,
           0, 0, 0, 0, 0],
  level2: [0, 0, 0, 0, 0,
           0, 0, 0, 0, 0,
           0, 0, 0, 0, 0,
           1, 0, 0, 0, 1,
           1, 1, 0, 1, 1],
  level3: [1, 1, 0, 1, 1,
           0, 1, 1, 1, 0,
           0, 1, 1, 1, 0,
           0, 0, 1, 0, 0,
           0, 0, 0, 0, 0],
  level4: [0, 1, 0, 0, 0,
           1, 1, 0, 0, 0,
           0, 1, 1, 1, 0,
           1, 1, 0, 0, 0,
           0, 1, 0, 0, 0],
  level5: [1, 0, 0, 0, 1,
           0, 1, 0, 1, 0,
           0, 1, 0, 1, 0,
           0, 0, 0, 0, 0,
           0, 0, 0, 0, 0],
  level6: [1, 1, 1, 0, 0,
           1, 1, 1, 0, 0,
           1, 0, 1, 1, 0,
           1, 1, 1, 0, 0,
           1, 1, 1, 0, 0],
  level7: [1, 1, 0, 0, 0,
           0, 0, 1, 1, 0,
           0, 0, 1, 0, 0,
           0, 1, 0, 1, 0,
           1, 1, 0, 1, 1],
  level8: [1, 0, 0, 0, 1,
           1, 0, 0, 0, 1,
           0, 1, 1, 1, 0,
           0, 0, 1, 0, 0,
           0, 0, 1, 0, 0],
  level9: [1, 0, 0, 1, 1,
           0, 1, 1, 1, 1,
           0, 0, 0, 0, 1,
           0, 0, 1, 1, 0,
           0, 1, 0, 0, 1],
  level10:[0, 0, 0, 0, 0,
           0, 1, 1, 1, 0,
           0, 0, 1, 0, 0,
           1, 0, 1, 0, 1,
           1, 0, 0, 0, 1]
}

const $board = document.querySelector('.board');
const $level = document.querySelector('.level');
const $random = document.querySelector('.random');
const $reset = document.querySelector('.reset');
const $start = document.querySelector('.start');

function start() {
  createBoard();
  load('level1');
}

function load(level) {
  for(let i = 0; i < numberOfLights; i++) {
    addLights(level, i);
    addLevelName(level);
    addRemoveClassOn(i);
  }
}

function addLights(level, i) {
  level
    ? lights[i] = levels[level][i]
    : lights[i] = Math.floor(Math.random() * 2);
}

function addLevelName(level) {
  level
    ? $level.textContent = `Level: ${count}`
    : $level.textContent = `Level: Random`;
}

function addRemoveClassOn(i) {
  lights[i] === 1
    ? $board.children[i].classList.add('on')
    : $board.children[i].classList.remove('on');
}

function createBoard() {
  createDiv();
  updateLights();
}

function createDiv() {
  for(let i = 0; i < numberOfLights; i++) {
    $board.appendChild(document.createElement('div'));
    $board.children[i].classList.add('light');
  }
}

function updateLights() {
  for(let i = 0; i < numberOfLights; i++) {
    $board.children[i].addEventListener('click', function() {
      clickOnLight(i);
      (i >= lightWidth) && clickOnLight(i-lightWidth);
      (i + lightHeight < numberOfLights) && clickOnLight(i+lightWidth);
      (i % lightWidth !== 0) && clickOnLight(i-1);
      (i % lightWidth !== 4) && clickOnLight(i+1);
      checkBoard();
    }, false);
  }
}

function clickOnLight(index) {
  $board.children[index].classList.toggle('on');
  $board.children[index].classList.contains('on')
    ? lights[index] = 1 
    : lights[index] = 0;
}

function checkBoard() {
  if(lights.every(item => item === 0)) {
    count++;
    if(count > 10) {
      $level.textContent = 'You win! Try Random';
      return;
    }
    load(`level${count}`);
  }
}

$start.addEventListener('click', function() {
  count = 1;
  load('level1');
});

$reset.addEventListener('click', function() {
  if(count > 0)
    load(`level${count}`);
});

$random.addEventListener('click', function() {
  load();
});

start();
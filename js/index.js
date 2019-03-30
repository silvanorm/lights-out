const lightWidth = 5;
const lightHeight = 5;
const numberOfLights = lightWidth * lightHeight;
const lights = [];

const $board = document.querySelector('.board');
let $div;

for(let i = 0; i < numberOfLights; i++) {
  lights[i] = i;
}

for(let i = 0; i < lights.length; i++) {
  $div = document.createElement('div');
  $div.addEventListener('click', function() {
    this.classList.toggle('on');
    console.log(this);
  });
  $div.classList.add('light');
  $board.appendChild($div);
}
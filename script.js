let score1 = 0;
let score2 = 0;

document.getElementById('plus1').addEventListener('click', function() {
  score1++;
  document.getElementById('score1').textContent = Math.max(0, score1);
});

document.getElementById('minus1').addEventListener('click', function() {
  score1--;
  document.getElementById('score1').textContent = Math.max(0, score1);
});

document.getElementById('plus2').addEventListener('click', function() {
  score2++;
  document.getElementById('score2').textContent = Math.max(0, score2);
});

document.getElementById('minus2').addEventListener('click', function() {
  score2--;
  document.getElementById('score2').textContent = Math.max(0, score2);
});

document.getElementById('reset').addEventListener('click', function() {
  score1 = 0;
  score2 = 0;
  document.getElementById('score1').textContent = score1;
  document.getElementById('score2').textContent = score2;
});

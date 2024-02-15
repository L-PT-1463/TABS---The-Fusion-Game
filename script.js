let score1 = 0;
let score2 = 0;

function updateScoreDisplay(score, elementId) {
  // Pad the score with leading zeros if needed
  const formattedScore = score.toString().padStart(2, '0');
  document.getElementById(elementId).textContent = formattedScore;
}

document.getElementById('plus1').addEventListener('click', function() {
  score1++;
  updateScoreDisplay(score1, 'score1');
});

document.getElementById('minus1').addEventListener('click', function() {
  score1 = Math.max(0, score1 - 1);
  updateScoreDisplay(score1, 'score1');
});

document.getElementById('plus2').addEventListener('click', function() {
  score2++;
  updateScoreDisplay(score2, 'score2');
});

document.getElementById('minus2').addEventListener('click', function() {
  score2 = Math.max(0, score2 - 1);
  updateScoreDisplay(score2, 'score2');
});

document.getElementById('reset').addEventListener('click', function() {
  score1 = 0;
  score2 = 0;
  updateScoreDisplay(score1, 'score1');
  updateScoreDisplay(score2, 'score2');
});

// Event listener for "b" key
document.addEventListener('keydown', function(event) {
  if (event.key === 'b') {
    score2++;
    updateScoreDisplay(score2, 'score2');
  }
});

// Event listener for "r" key
document.addEventListener('keydown', function(event) {
  if (event.key === 'r') {
    score1++;
    updateScoreDisplay(score1, 'score1');
  }
});
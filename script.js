let score1 = 0;
let score2 = 0;

function updateScoreDisplay(score, elementId) {
  const formattedScore = score.toString().padStart(2, '0');
  const element = document.getElementById(elementId);
  element.textContent = formattedScore;

  // Flash effect on score change
  flashText(elementId);
  updateAvailableActions();
}

let previousAvailableActions = 0;
let previousAdditionalActions = 0;
function updateAvailableActions() {
    const totalScore = score1 + score2;
    let availableActions = 1 + Math.floor(totalScore / 15);
    let additionalActions = 1 + Math.floor(totalScore / 30);

    const actionsInfo = document.getElementById('actions-info');
    actionsInfo.innerHTML = `<p>Available Actions:</p>
                             <p><span class="numbers" id="available-actions">${availableActions}</span></p>
                             <p><span class="additional-actions" id="additional-actions">+ ${additionalActions}</span> for the loser</p>`;

    // Flash effect on available actions change
    if (availableActions > previousAvailableActions) {
        flashTextYellow('available-actions');
    }
    if (additionalActions > previousAdditionalActions) {
        flashTextYellow('additional-actions');
    }
     previousAvailableActions = availableActions;
     previousAdditionalActions = additionalActions;
}
  
document.getElementById('plus1').addEventListener('click', function () {
  score1++;
  updateScoreDisplay(score1, 'score1');
});

document.getElementById('minus1').addEventListener('click', function () {
  score1 = Math.max(0, score1 - 1);
  updateScoreDisplay(score1, 'score1');
});

document.getElementById('plus2').addEventListener('click', function () {
  score2++;
  updateScoreDisplay(score2, 'score2');
});

document.getElementById('minus2').addEventListener('click', function () {
  score2 = Math.max(0, score2 - 1);
  updateScoreDisplay(score2, 'score2');
});

document.getElementById('reset').addEventListener('click', function () {
  // Flash to white before resetting
  flashText('score1');
  flashText('score2');
  flashTextYellow('available-actions');
  flashTextYellow('additional-actions');

  score1 = 0;
  score2 = 0;
  updateScoreDisplay(score1, 'score1');
  updateScoreDisplay(score2, 'score2');
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'b') {
    score2++;
    updateScoreDisplay(score2, 'score2');
  } else if (event.key === 'r') {
    score1++;
    updateScoreDisplay(score1, 'score1');
  }
});

function flashText(elementId) {
  const element = document.getElementById(elementId);
  element.style.transition = 'color 0.5s';
  element.style.color = '#ffffff'; // Flash to white
  setTimeout(() => {
    element.style.color = ''; // Reset to original color
  }, 500);
}

function flashTextYellow(elementId) {
    const element = document.getElementById(elementId);
    element.style.transition = 'color 0.5s';
    element.style.color = '#ffcc00'; // Flash to white
    setTimeout(() => {
      element.style.color = ''; // Reset to original color
    }, 500);
  }

// Add an event listener to each checkbox in factions1
const checkboxes1 = document.querySelectorAll('#factions1 input[type="checkbox"]');
checkboxes1.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateWildWestCheckbox(checkboxes1, 'wildWestToggle1');
    updateFantasyCheckboxes('wildWestToggle1', 'fantasyGoodToggle1', 'fantasyEvilToggle1');
  });
});

// Add an event listener to each checkbox in factions2
const checkboxes2 = document.querySelectorAll('#factions2 input[type="checkbox"]');
checkboxes2.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateWildWestCheckbox(checkboxes2, 'wildWestToggle2');
    updateFantasyCheckboxes('wildWestToggle2', 'fantasyGoodToggle2', 'fantasyEvilToggle2');
  });
});

// Function to update the Wild West checkbox based on the checked checkboxes count
function updateWildWestCheckbox(checkboxes, wildWestId) {
  const wildWestCheckbox = document.getElementById(wildWestId);
  const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked && checkbox.id !== wildWestId).length;

  // If at least five checkboxes are checked (excluding Wild West), check the Wild West checkbox; otherwise, uncheck it
  wildWestCheckbox.checked = checkedCount >= 5;
}

// Function to update Fantasy checkboxes based on Wild West checkbox
function updateFantasyCheckboxes(wildWestId, fantasyGoodId, fantasyEvilId) {
  const wildWestCheckbox = document.getElementById(wildWestId);
  const fantasyGoodCheckbox = document.getElementById(fantasyGoodId);
  const fantasyEvilCheckbox = document.getElementById(fantasyEvilId);

  // If Wild West is not checked, uncheck Fantasy Good and Fantasy Evil
  if (!wildWestCheckbox.checked) {
    fantasyGoodCheckbox.checked = false;
    fantasyEvilCheckbox.checked = false;
  }
}

updateAvailableActions(); // Initial call to set up available actions on page load
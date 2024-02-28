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

  // Uncheck all checkboxes except tribal
  checkboxes1.forEach(checkbox => {
    if (checkbox.id !== 'tribalToggle1') {
      checkbox.checked = false;
    }
  });

  checkboxes2.forEach(checkbox => {
    if (checkbox.id !== 'tribalToggle2') {
      checkbox.checked = false;
    }
  });

  // Reset Wild West checkbox
  updateWildWestCheckbox(checkboxes1, 'wildWestToggle1');
  updateWildWestCheckbox(checkboxes2, 'wildWestToggle2');

  // Reset Fantasy checkboxes
  updateFantasyCheckboxes('wildWestToggle1', 'fantasyGoodToggle1', 'fantasyEvilToggle1');
  updateFantasyCheckboxes('wildWestToggle2', 'fantasyGoodToggle2', 'fantasyEvilToggle2');

  checkboxes1.forEach(checkbox => updateLabelColor(checkbox, 'red'));
  checkboxes2.forEach(checkbox => updateLabelColor(checkbox, 'blue'));
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
    updateWildWestCheckbox(checkboxes1, 'wildWestToggle1', 'red');
    updateFantasyCheckboxes('wildWestToggle1', 'fantasyGoodToggle1', 'fantasyEvilToggle1');
    updateLabelColor(checkbox, 'red');
  });
});

// Add an event listener to each checkbox in factions2
const checkboxes2 = document.querySelectorAll('#factions2 input[type="checkbox"]');
checkboxes2.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateWildWestCheckbox(checkboxes2, 'wildWestToggle2', 'blue');
    updateFantasyCheckboxes('wildWestToggle2', 'fantasyGoodToggle2', 'fantasyEvilToggle2');
    updateLabelColor(checkbox, 'blue');
  });
});

// Function to update Wild West checkbox based on the checked checkboxes count
function updateWildWestCheckbox(checkboxes, wildWestId, playerColor) {
  const wildWestCheckbox = document.getElementById(wildWestId);
  const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked && checkbox.id !== wildWestId && checkbox.id !== 'fantasyGoodToggle1' && checkbox.id !== 'fantasyGoodToggle2' && checkbox.id !== 'fantasyEvilToggle1' && checkbox.id !== 'fantasyEvilToggle2').length;

  // If at least five checkboxes are checked (excluding Wild West), check the Wild West checkbox; otherwise, uncheck it
  wildWestCheckbox.checked = checkedCount >= 5;
  updateLabelColor(wildWestCheckbox, playerColor); // Update label color for Wild West
}

// Function to update Fantasy checkboxes based on Wild West checkbox
function updateFantasyCheckboxes(wildWestId, fantasyGoodId, fantasyEvilId, playerColor) {
  const wildWestCheckbox = document.getElementById(wildWestId);
  const fantasyGoodCheckbox = document.getElementById(fantasyGoodId);
  const fantasyEvilCheckbox = document.getElementById(fantasyEvilId);
  const fantasyGoodToggle1 = document.getElementById("fantasyGoodToggle1");
  const fantasyGoodToggle2 = document.getElementById("fantasyGoodToggle2");
  const fantasyEvilToggle1 = document.getElementById("fantasyEvilToggle1");
  const fantasyEvilToggle2 = document.getElementById("fantasyEvilToggle2");


  // If Wild West is not checked, uncheck Fantasy Good and Fantasy Evil and disable them
  if (!wildWestCheckbox.checked) {
    fantasyGoodCheckbox.checked = false;
    fantasyEvilCheckbox.checked = false;
    fantasyGoodCheckbox.disabled = true;
    fantasyEvilCheckbox.disabled = true;
    updateLabelColor(fantasyGoodCheckbox, playerColor);
    updateLabelColor(fantasyEvilCheckbox, playerColor);
  } else {
    // If Wild West is checked, enable Fantasy Good and Fantasy Evil
    fantasyGoodCheckbox.disabled = false;
    fantasyEvilCheckbox.disabled = false;
  }

  // If Fantasy Good is checked, disable Fantasy Evil, and vice versa
  if (fantasyGoodCheckbox.checked) {
    fantasyEvilCheckbox.disabled = true;
  } else if (fantasyEvilCheckbox.checked) {
    fantasyGoodCheckbox.disabled = true;
  }

  // If Fantasy Good is checked for Red Player, disable it for the Blue Player and vice versa
  if (fantasyGoodToggle1.checked) {
    fantasyGoodToggle2.disabled = true;
  } else if (fantasyGoodToggle2.checked) {
    fantasyGoodToggle1.disabled = true;
  } else if (!fantasyEvilToggle1.checked) {
    fantasyGoodToggle1.disabled = false;
  } else if (!fantasyEvilToggle2.checked) {
    fantasyGoodToggle2.disabled = false;
  }

  // If Fantasy Evil is checked for Red Player, disable it for the Blue Player and vice versa
  if (fantasyEvilToggle1.checked) {
    fantasyEvilToggle2.disabled = true;
  } else if (fantasyEvilToggle2.checked) {
    fantasyEvilToggle1.disabled = true;
  } else if (!fantasyGoodToggle1.checked) {
    fantasyEvilToggle1.disabled = false;
  } else if (!fantasyGoodToggle2.checked) {
    fantasyEvilToggle2.disabled = false;
  }

  // Update label colors for Fantasy checkboxes
  updateLabelColor(fantasyGoodCheckbox, playerColor);
  updateLabelColor(fantasyEvilCheckbox, playerColor);
}

// Function to update label color based on checkbox state
function updateLabelColor(checkbox, color) {
  const label = checkbox.closest('label');
  if (checkbox.checked) {
    label.style.color = color;
  } else {
    label.style.color = ''; // Reset to default color
  }
}

// Initial call to set up available actions on page load
checkboxes1.forEach(checkbox => updateLabelColor(checkbox, 'red'));
checkboxes2.forEach(checkbox => updateLabelColor(checkbox, 'blue'));
updateAvailableActions();
// Get all the boxes for the game
const boxes = document.querySelectorAll("span.columns");

// Set players icons X and O, the current player, and a function to toggle between turns
const playerX = document.querySelector("p.player-x");
const playerO = document.querySelector("p.player-o");
playerX.icon = "X";
playerO.icon = "O";
let currentPlayer = playerX;

const setcurrentPlayer = () => {
	if (currentPlayer === playerX) {
		// add and remove css class (accordingly) to show player's turn

		playerX.classList.remove("current-player");

		playerO.classList.add("current-player");
		currentPlayer = playerO;
	} else {
		playerO.classList.remove("current-player");

		playerX.classList.add("current-player");
		currentPlayer = playerX;
	}
};

// Toggle between "start" and "reset" states
const button = document.getElementById("game-btn");
let isGameStarted = false;

button.addEventListener("click", (_event) => {
	let element = _event.target;

	if (isGameStarted === false) {
		isGameStarted = true;
		element.innerHTML = "Reset";

		// Set player's turn
		currentPlayer.classList.add("current-player");
	} else {
		document.location.reload(true);
		element.innerHTML = "Start";

		// Remove player's turn
		currentPlayer.classList.remove("current-player");
	}
});

// Loop through the boxes and listen for a click event
boxes.forEach((box, i) => {
	box.addEventListener("click", (_event) => {
		let element = _event.target;

		// Ensure user has started the game before proceeding
		if (isGameStarted === false) {
			alert("Game not yet started!");
		} else {
			// Create an inner box for the "X" or "O" icons, and place it in the selected box
			const playerIconContainer = document.createElement("h1");
			const playerIcon = document.createTextNode(currentPlayer.icon);
			playerIconContainer.appendChild(playerIcon);
			element.appendChild(playerIconContainer);

			// Add a css class to the selected box to apply a style that indicates that it has been selected
			element.classList.add("selected-column");

			// Check if the current player has won or if there's a tie
			if (checkWinner(i)) {
				alert(`player ${currentPlayer.icon} has won!`);
				document.location.reload(true);
				button.innerHTML = "Start";
			} else if (checkTie()) {
				alert("It's a tie!");
				document.location.reload(true);
				button.innerHTML = "Start";
			}

			// Toggle current player
			setcurrentPlayer();
		}
	});
});

// Function to check if there's a tie
// TODO: Check for other conditions that could lead to a tie
const checkTie = () => {
	// debugger;
	let allBoxesClicked = true;

	for (let i = 0; i < boxes.length; i++) {
		const currentBox = boxes[i];
		if (currentBox.firstChild === null) {
			allBoxesClicked = false;
			break;
		}
	}

	return allBoxesClicked;
};

// Function to check if the current player has won
const checkWinner = (currentIndex) => {
	let hasWon = false;

	// Only check for certain winning possibilities depending on which box has been clicked
	if (currentIndex === 0) {
		if (isWinner(0, 4) || isWinner(0, 3) || isWinner(0, 1)) {
			hasWon = true;
		}
	} else if (currentIndex === 1) {
		if (isWinner(0, 1) || isWinner(1, 3)) {
			hasWon = true;
		}
	} else if (currentIndex === 2) {
		if (isWinner(0, 1) || isWinner(2, 2) || isWinner(2, 3)) {
			hasWon = true;
		}
	} else if (currentIndex === 3) {
		if (isWinner(0, 3) || isWinner(3, 1)) {
			hasWon = true;
		}
	} else if (currentIndex === 4) {
		if (isWinner(0, 4) || isWinner(1, 3) || isWinner(2, 2) || isWinner(3, 1)) {
			hasWon = true;
		}
	} else if (currentIndex === 5) {
		if (isWinner(2, 3) || isWinner(3, 1)) {
			hasWon = true;
		}
	} else if (currentIndex === 6) {
		if (isWinner(0, 3) || isWinner(2, 2) || isWinner(6, 1)) {
			hasWon = true;
		}
	} else if (currentIndex === 7) {
		if (isWinner(6, 1) || isWinner(1, 3)) {
			hasWon = true;
		}
	} else if (currentIndex === 8) {
		if (isWinner(0, 4) || isWinner(2, 3) || isWinner(6, 1)) {
			hasWon = true;
		}
	}

	return hasWon;
};

/* Function that checks if a particular winning possibility is actually true.
   Since it only takes 3 boxes aligned in a particular way to win, 
   this function takes the index of the clicked box and a number to increment by 
   (while looping through the boxes). The increment number helps to know exactly 
   which 3 boxes to check for a possible win.
   It checks for a win by comparing the boxes to the first one in the set (of three).
    */
const isWinner = (currentIndex, increment) => {
	// Set the first box which the rest will be compared to, and the number of loops
	const relativeFirstBox = boxes[currentIndex];
	let numberOfLoops = 3;

	for (currentIndex; currentIndex < boxes.length; currentIndex += increment) {
		if (numberOfLoops === 0) {
			break;
		}

		// If the current box in the set hasn't even being clicked yet, then return false cos there's no win
		const currentBox = boxes[currentIndex];
		if (currentBox.firstChild === null) {
			return false;
		}

		// Compare the current box in the set with the first box.
		// If they match, then continue to check the next one, else return false
		if (currentBox.firstChild.innerHTML === relativeFirstBox.firstChild.innerHTML) {
			numberOfLoops--;
			continue;
		} else {
			return false;
		}
	}
	
	// If the loop runs sucessfully to the end, then there's a win so return true.
	return true;
};

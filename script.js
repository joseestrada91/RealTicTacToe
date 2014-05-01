// Comments are referencing/ explaining the pieces of code that 
// that are directly above them.
var myGame = angular.module("TicTacToeApp", []);

myGame.controller("TicTacToeController", function($scope) {
	$scope.cells= ['', '', '', '', '', '', '', '', ''];
	// Sets up the cells/boxes for the game board.
	// Interacts with x-ng-repeat on line 24.
	// By floating it's all repeating div's left and giving
	// their container a max-width of 318 makes them repeat
	// and creates our game board. 
	var sepArray= [];
	// This is our empty array in which we will be storing
	// all of our input index values in correlation to the index they
	// are in within our $scope.cells array
	var player = Math.floor((Math.random()*2)+1);
	if (player == 1) {
		$scope.playerStart = "'X' Starts!";
	} else {
		$scope.playerStart = "'O' Starts!";
	}
	// Generates a random number between 1 and 2 to randomly determine
	// who makes the first move.	
	var moves = 0;
	// Numbers of moves made before the game starts.
	$scope.oneScore = 0;
	// Line 13 view
	$scope.twoScore = 0;
	// Line 19 view
	
	$scope.playerTurn = function(index) {
	// Called upon on line 24 when clicked. Passes $index
	// from my view to my playerTurns' function
		if (player == 1) {
		// These actions take place if player is 1 aka Player 1.
			if ($scope.cells[index] === '') {
			// Verifies that the space you are choosing on the board
			// is empty
				sepArray[index] = 1;
				// Passes the #1 into my sepArray's exact index/$index that is 
				// being clicked on in $scope.cells array.
				console.log(sepArray);
				console.log("Index" + index);
				$scope.cells[index] = 'X';
				// Displays the letter 'X' on the view on the cell 
				// that is clicked on. 
				$scope.playerNum = "Player 1";
				// Displays which players turn it is. 
				// Called on line 25 of view.			
				maxMoves();
				// checks that moves made total in the game 
				// are less then 9
				winOrLose();
				// Checks if any of there are any win conditions present
				// on the board. 
				player++;
				// switches over to Player 2.
			} else {
				alert("Please Choose Another box.");
			}
		} else if (player == 2) {
			if ($scope.cells[index] === '') {
				sepArray[index] = 2;
				console.log(sepArray);
				$scope.cells[index] = 'O';
				$scope.playerNum = "Player 2";
				maxMoves();
				winOrLose();
				player--;
		} else {
				alert("Please Choose Another box.");
			}
		}
	};

	var maxMoves = function() {
		if (moves < 9) {
			moves++;
			console.log(moves);
		} else {
			$scope.end = ("Game Over");
		}
	};
	// Makes sure that the game can only take 9 moves

	var winOrLose = function() {
		if (moves > 4) { 
		// Only checks for win conditions after 4 moves 
		// have been made.							winningNum[0] 														winningNum[1]														winningNum[2]					
		var winningNum = [sepArray[0] + sepArray[1] + sepArray[2], sepArray[3] + sepArray[4] + sepArray[5], sepArray[6] + sepArray[7] + sepArray[8]];
		// Checks possible winning conditions of rows by the first, second and third 3 index's together.	
			for (var i = 0; i < winningNum.length; i++) {
				if (winningNum[i] === 3) {
					$scope.whoWins = "Player 1 Wins";
					console.log('winnging# '+winningNum[i]);
					resetRound();
				} else if (winningNum[i] === 6) {
					$scope.whoWins = "Player 2 Wins";
					console.log('winnging# '+winningNum[i]);
					resetRound();
				} else if (moves == 9 && winningNum[i] !== 3 && winningNum[i] !== 6 && gameNum < 4) {
					$scope.whoWins = "Its a tie";
					console.log('winnging# '+winningNum[i]);
					resetRound();
				}
			}
		// Defines winning numbers/sums for 'X' and 'O' and checks to
		// if any of the rows = those number

		var winningNum2 = [sepArray[0] + sepArray[3] + sepArray[6], sepArray[1] + sepArray[4] + sepArray[7], sepArray[2] + sepArray[5] + sepArray[8]];
			for (i = 0; i < winningNum2.length; i++) {
				if (winningNum2[i] === 3) {
					$scope.whoWins = "Player 1 Wins";
					console.log('winnging# '+winningNum2[i]);
					resetRound();
				} else if (winningNum2[i] === 6) {
					$scope.whoWins="Player 2 Wins";
					resetRound();
				} else if (moves == 9 && winningNum2[i] !== 3 && winningNum2[i] !== 6 && gameNum < 4) {
					$scope.whoWins = "Its a tie";
					console.log('winnging# ' + winningNum2[i]);
					resetRound();
				}
			}
		var winningNum3 = [sepArray[0] + sepArray[4] + sepArray[8], sepArray[2] + sepArray[4] + sepArray[6]];
			for (i = 0; i < winningNum3.length; i++) {
				if (winningNum3[i] === 3) {
					$scope.whoWins = "Player 1 Wins";
					console.log('winnging# '+winningNum3[i]);
					resetRound();
					break;
				} else if (winningNum3[i] === 6) {
					$scope.whoWins = "Player 2 Wins";
					console.log('winnging# '+winningNum3[i]);
					resetRound();
					break;
				} else if (moves == 9 && winningNum3[i] !== 3 && winningNum3[i] !== 6 && gameNum < 4) {
					$scope.whoWins = "Its a tie";
					console.log('winnging# ' + winningNum3[i]);
					resetRound();
					break;
				}
			}
		}
	};

	function resetRound() {
		if ($scope.whoWins == "Player 1 Wins") {
			$scope.oneScore += 5;
		}	else if ($scope.whoWins == "Player 2 Wins") {
			$scope.twoScore += 5;
		}
		// Seperate if statements
		if (gameNum < 4 ) {
		// This function will only run while the gameNum played
		// is less then 4	
			$scope.cells= ['', '', '', '', '', '', '', '', ''];
			sepArray= [];
			moves = 0;
			gameNum++;
			console.log('Game # ' + gameNum);
			var player = Math.floor((Math.random()*2)+1);
		} else {
			console.log('game number in else ' + gameNum);
			$scope.goNotify = 'BUTTON SMASH!';
			console.log($scope.goNotify);
			onTimeout();
		}
	}
	// Sets everything back to it's original condtions to get ready for the
	// new game/round.

  $scope.counter = 7;
  var onTimeout = function() {
	if ($scope.counter > 0) {
		setTimeout(onTimeout, 1000);
		$scope.counter--;
		console.log('counter ' + $scope.counter);
  } else {
		trueWinner();
    console.log("Timer Stopped");

    }
  };

	var gameNum = Math.floor(Math.random() * 4) + 1;
	console.log(gameNum);
	// This generates a random gameNum that is less then 5

	$scope.onKeyPress = function(keyCode) {
		if (gameNum >= 4) {
		// If gameNum is greater then 4 we go to Key Smashing
			console.log(keyCode.keyCode);
			if ($scope.counter != 1) {
				if (keyCode.keyCode == 88 || keyCode.keyCode == 65) {
					console.log($scope.oneScore);
					$scope.oneScore++;
				} else if (keyCode.keyCode == 77 || keyCode.keyCode == 76){
					console.log($scope.twoScore);
					$scope.twoScore++;
				}

			}
		}
	};

	$scope.youWin= '';
	// line 20 view

	function trueWinner() {
			if ($scope.oneScore > $scope.twoScore) {
				$scope.youWin = "Player One wins!";
				console.log($scope.youWin);
				setTimeout(resetEverything, 3000);
			}	else if ($scope.twoScore > $scope.oneScore) {
				$scope.youWin = "Player Two wins!";
				console.log($scope.youWin);
				setTimeout(resetEverything, 3000);
			}
		// Ends game tottally. Who ever gets to 60 first wins Sock em bop em.
		}

	function resetEverything() {
		location.reload();
	}
		

	});
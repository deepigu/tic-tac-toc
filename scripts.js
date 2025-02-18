document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const message = document.querySelector(".message");
    const restartButton = document.querySelector(".restart-button");

    const players = ["X", "O"];
    let currentPlayer = players[0];

    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Function to check for a winner
    function checkWinner() {
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (
                squares[a].textContent !== "" &&
                squares[a].textContent === squares[b].textContent &&
                squares[a].textContent === squares[c].textContent
            ) {
                message.textContent = `${squares[a].textContent} Wins! 🎉`;
                disableBoard();
                return;
            }
        }

        // Check for draw
        if ([...squares].every(square => square.textContent !== "")) {
            message.textContent = "It's a Draw! 😐";
        }
    }

    // Function to disable further moves after win/draw
    function disableBoard() {
        squares.forEach(square => square.removeEventListener("click", handleClick));
    }

    // Function to handle square clicks
    function handleClick(event) {
        const square = event.target;

        // Prevent overriding already occupied squares
        if (square.textContent !== "") return;

        square.textContent = currentPlayer;
        checkWinner();

        // Switch players
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

        // Update message
        message.textContent = `${currentPlayer}'s Turn`;
    }

    // Add event listeners to squares
    squares.forEach(square => square.addEventListener("click", handleClick));

    // Restart game function
    restartButton.addEventListener("click", () => {
        squares.forEach(square => (square.textContent = ""));
        message.textContent = "X's Turn";
        currentPlayer = players[0];

        // Re-enable event listeners
        squares.forEach(square => square.addEventListener("click", handleClick));
    });

    console.log("Script loaded successfully!"); // Debugging: Check if script runs
});

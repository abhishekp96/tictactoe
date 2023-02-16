let backgroundMusic = new Audio("./Music/music.mp3"); // background music
let turnMusic = new Audio("./Music/ting.mp3"); //turn music
let gameOverMusic = new Audio("./Music/gameover.mp3"); //game over music

let turn = "X";  //initializing x's turn
let gameOver = false; //setting gameover as false means game is not over

backgroundMusic.play(); //background music

//main game logic
let boxes = document.getElementsByClassName("box"); //creating boxes to hold the "box"
//using array methods...to select "from" "boxes" and running a loop to add event listener to each box
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext'); //getting the box text field
    element.addEventListener("click", () => {    //add "click" event listener to all the boxes
        turnMusic.play();  // playing the turn music
        if(boxtext.innerHTML === ""){  //checking if the inner textb in the boxes is empty
            boxtext.innerText = turn;  //setting the box text to the "turn" which we initialized at the start
            turn = changeTurn(); // calling the change turn function when the box is changed to "turn"
            checkWin(); // checking if anyone won the game by calling the function
            if(!gameOver){ // if the game is not over then we need to tell user new player's turn
                document.getElementById("turnInfo").innerText = "Player " + turn + "'s turn.";
            }
        }
    });
});

//function to change the turn
const changeTurn = () => {
    return turn === "X"? "O": "X"; //returns trun as "x" or "O" alternately
}

//function to check if someone won
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");  //get all the box texts 
    let wins = [  //these are the win conditions 
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //check for each box text is 1st column and 2nd column and 3rd column are same
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxes[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.querySelector('#turnInfo').innerText = boxtext[e[0]].innerText + " Won"; // if yes then declare the winner
            gameOver = true; //set game over to true
            gameOverMusic.play(); //play the game over music
            ( () => document.getElementById("winnerModalButton").click())(); //click on the winner modal button
            }
    });
}

//Reset everything when clicked on 'reset' button
reset.addEventListener("click", ()=>{   //add event listener for click on 'reset' button
    let boxtexts = document.querySelectorAll('.boxtext');  //select all box texts
    Array.from(boxtexts).forEach(element => { // run a loop through all the boxtexts
        element.innerText = ""; //empty all the box texts
    });
    turn = "X"; //set default player turn
    gameOver = false; //set game over as false
    document.getElementById("turnInfo").innerText = "Player " + turn + "'s turn."; //show the player turn info
});
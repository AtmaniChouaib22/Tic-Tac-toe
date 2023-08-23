const displayMessage = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message ;
    }

    return {
        renderMessage
    }
})();

const Gameboard = (function(){
    let gameBoard = ["","","","","","","","",""]; 

    const render = () => {
        let boardHTML = ""; 
        gameBoard.forEach((square, index) => {
            boardHTML+= `<div class="square" id="square-${index}">${square}</div>`; 
        }); 
        document.querySelector("#gameboard").innerHTML = boardHTML ; 
        const squares = document.querySelectorAll(".square"); 
        squares.forEach((square) => {
            square.addEventListener("click" ,Gamecontrols.handleClick);
        }); 
        
    }; 

    const update =(index , value) => {
        gameBoard[index] = value ;
        render(); 
    }; 

    const getGameboard = () => gameBoard ; 

    return {
        render ,
        update,
        getGameboard 
    }

})(); 

const CreatePlayer = (name , mark)=>{
    return {
        name ,
        mark 
    }
}

const Gamecontrols = (function() {

    let Players = []; 
    let currentPlayerIndex ; 
    let gameOver ; 

    const start = () => {
        Players = [
            CreatePlayer(document.querySelector("#player1").value , "X"),
            CreatePlayer(document.querySelector("#player1").value , "O")
        ];
        currentPlayerIndex = 0 ; 
        gameOver = false ; 
        Gameboard.render(); 
        const squares = document.querySelectorAll(".square"); 
        squares.forEach((square) => {
            square.addEventListener("click",handleClick);
        }); 

    };

    const handleClick = (e) => {
        if(gameOver === true) return ; 
        let index = parseInt(e.target.id.split("-")[1]); 
        if(Gameboard.getGameboard()[index] !=='') return ;

        Gameboard.update(index,Players[currentPlayerIndex].mark); 
        

        if(checkForWin(Gameboard.getGameboard(), Players[currentPlayerIndex].mark)=== true){
            gameOver =true ; 
            displayMessage.renderMessage(`${Players[currentPlayerIndex].name} won!`)
        }else if(checkForTie(Gameboard.getGameboard()) ===true) {
            gameOver = true ;
            displayMessage.renderMessage("It's a Tie"); 
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 :0 ; 
    }; 

    const restart = () => {
        gameOver = false ; 
        for(let i = 0 ; i < 9 ; i++){
            Gameboard.update(i, ""); 
        }
        Gameboard.render(); 
        document.querySelector("#message").innerHTML = ""; 
    }

    return {
        start,
        handleClick,
        restart
    }

})(); 

function  checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i =0 ; i<winningCombinations.length;i++){
        const [a,b,c] = winningCombinations[i]; 
        if(board[a] && board[a] === board[b] && board[a]===board[c]){
            return true ;
        }
    }
    return false ;
};

function checkForTie(board) {
    return board.every(cell => cell !== "")
}

const startButton = document.querySelector("#start-button"); 
startButton.addEventListener("click", () => {
    Gamecontrols.start(); 
})

const restartButton = document.querySelector("#restart-button"); 
restartButton.addEventListener("click", () => {
    Gamecontrols.restart(); 
});




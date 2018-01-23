// $(document).ready(function(){
//     // console.log($(".corner").length);

    
   
//     // $(".corner:eq(" + x + ")").text("X").effect( "bounce", "slow" );

//     // $("td").on("click", function(){
//     //     // alert("test");
//     //     $(this).text("O").effect("bounce", "slow");
//     //     console.log($(this).attr("id"));
//     // });
//     let turn = 1;
//     let huPlayers;
//     let whoGoesFirst = Math.floor(Math.random() * 2); // Chooses who goes first
    
//     function AILogic(){
        
//         if (whoGoesFirst){
//             console.log("Players goes first");
    
    
//         }
//         else {
//             console.log("AI goes first");
//         //     huPlayers = 0;
//         //     console.log(i, $(".corner").length);
//         //     for (var i = 0; i < $(".corner").length; i++){
//         //         if ($(".corner").text() === ""){
//         //         console.log("present");
//         //         huPlayers+=1;
//         //     }
//         // }
//         console.log(emptyBlocks);
            
//             if (turn == 1){
//                 let x = Math.floor(Math.random()*($(".corner").length));
//                 $(".corner:eq(" + x + ")").text("X").effect( "bounce", "slow" );
//             }
//             else if (turn == 2){
//                 alert("2nd turn ai")
//                 // console.log($("5").text());
//                 if ($("5").text() == ""){

//                 }
//                 let x = Math.floor(Math.random()*($(".corner").length));
//                 $(".corner:eq(" + x + ")").text("X").effect( "bounce", "slow" );
//             }
//         }
//     }
//     AILogic();

//     $("td").on("click", function(){
//         if (whoGoesFirst == 0){
//             if (turn == 1){
//                 // let x = Math.floor(Math.random()*($(".corner").length));
               
//                 $(this).text("O").effect("bounce", "slow");
//                 // console.log($(this).attr("id"));
//                 // var clickedCenter = $(this).attr("id");
//                 turn++;
//                 AILogic();
//             }
//             else if (turn == 2){
//                 let x = Math.floor(Math.random()*($(".corner").length));
//                 $(this).text("O").effect("bounce", "slow");
//                 alert("works");
//                 turn++;
                
//             }
//         }
//     });
// });



//Trying minimax algorithm

$(document).ready(function(){
    // console.log(Array.from(8));
    // var arr =  Array.from(Array(9).keys(), n => ++n);
    // var origBoard = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"];
    // var bestSpot = miniMax(origBoard, ai);
    // console.log("index: " + bestSpot.index);
    // var human = "O";
    // var ai = "X";
    // console.log();

    // function emptyBlocks(board){
    //     return board.filter(val => val != "X" && val != "O");
    //         //    board.filter(s => s != "O" && s != "X");
    // }

    // function winningBoard(board, player){
    //     if (
    //         (board[0] == player && board[1] == player && board[2] == player) ||
    //         (board[3] == player && board[4] == player && board[5] == player) ||
    //         (board[6] == player && board[7] == player && board[8] == player) ||
    //         (board[0] == player && board[3] == player && board[6] == player) ||
    //         (board[1] == player && board[4] == player && board[7] == player) ||
    //         (board[2] == player && board[5] == player && board[8] == player) ||
    //         (board[0] == player && board[4] == player && board[8] == player) ||
    //         (board[2] == player && board[4] == player && board[6] == player)
    //     ){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    // function miniMax(newBoard, player){
    //     var availBlocks = emptyBlocks(newBoard);

    //     if (winningBoard(newBoard, ai)){
    //         return {score: 10};
    //     }
    //     else if (winningBoard(newBoard, human)){
    //         return {score: -10};
    //     }
    //     else if (availBlocks.length === 0){
    //         return {score: 0};
    //     }
        
    //     var moves = [];

    //     for (var i = 0; i < availBlocks.length; i++){
    //         var move = {};
    //         move.index = newBoard[availBlocks[i]]

    //         newBoard[availBlocks[i]] = player;

    //         if (player == ai){
    //             var result = miniMax(newBoard, human);
    //             move.score = result.score;
    //         }
    //         else {
    //             var result = miniMax(newBoard, ai);
    //             move.score = result.score;
    //         }
    //         newBoard[availBlocks[i]] = move.index;
    //         moves.push(move);
    //     }

    //     var bestMove;
    //     if(player === ai){
    //       var bestScore = -10000;
    //       for(var i = 0; i < moves.length; i++){
    //         if(moves[i].score > bestScore){
    //           bestScore = moves[i].score;
    //           bestMove = i;
    //         }
    //       }
    //     }else{
      
    //   // else loop over the moves and choose the move with the lowest score
    //       var bestScore = 10000;
    //       for(var i = 0; i < moves.length; i++){
    //         if(moves[i].score < bestScore){
    //           bestScore = moves[i].score;
    //           bestMove = i;
    //         }
    //       }
    //     }
      
    //   // return the chosen move (object) from the moves array
    //     return moves[bestMove];

    // }






    var origBoard = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"];

// human
var human = "O";
// ai
var ai = "X";


// keep track of function calls
var fc = 0;

// finding the ultimate play on the game that favors the computer
var bestSpot = minimax(origBoard, ai);

//loging the results
console.log("index: " + bestSpot.index);
console.log("function calls: " + fc);

// the main minimax function
function minimax(newBoard, player){
  
  //keep track of function calls;
  fc++;

  //available spots
  var availSpots = emptyBlocks(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, human)){
     return {score:-10};
  }
	else if (winning(newBoard, ai)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == ai){
      var result = minimax(newBoard, human);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, ai);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === ai){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

// returns the available spots on the board
function emptyBlocks(board){
  return  board.filter(val => val != "O" && val != "X");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}




});
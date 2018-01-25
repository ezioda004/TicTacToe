//Trying minimax algorithm
$(document).ready(function(){
    // console.log(Array.from(8));
    // var arr =  Array.from(Array(9).keys(), n => ++n);
// var origBoard = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"];
var human;
var ai;
var versusAI;
var humanSymbol;
var aiSymbol;
   

$("#vsAI").on("click", function(e){
    e.preventDefault();
    versusAI = true;
    $("#mode").fadeOut(500, function(){
        $("#pickSide").fadeIn(500).css("display", "flex");
    });
    
});

$("#vsP").on("click", function(e){
    e.preventDefault();
    versusAI = false;
    $("#mode").fadeOut(500, function(){
        $("#pickSide").fadeIn(500).css("display", "flex");
    });
    
});
$("#pickSide a:nth-of-type(1)").on("click", function(e){
    e.preventDefault();
    human = "X"
    humanSymbol = '<i class="fas fa-times fa-3x"></i>'
    ai = "O"
    aiSymbol = '<i class="far fa-circle fa-3x"></i>';
    $("#pickSide").fadeOut(500, function(){
        $("#game").fadeIn(500);
    });
    if (versusAI){
        game();
    }
    
});
$("#pickSide a:nth-of-type(2)").on("click", function(e){
    e.preventDefault();
    human = "O"
    humanSymbol = '<i class="far fa-circle fa-3x"></i>';
    ai = "X"
    aiSymbol = '<i class="fas fa-times fa-3x"></i>';
    $("#pickSide").fadeOut(500, function(){
        $("#game").fadeIn(500);
    });
    if (versusAI){
        game();
    }
});

function game(){
    var origBoard = Array.from(Array(9).keys());
    // console.log(origBoard);
    // var human = "O";        //human
    // var ai = "X";
    var first;           
    
    
    // keep track of function calls
    var fc = 0;
    
    // finding the ultimate play on the game that favors the computer
    
    
    //loging the results
    // console.log("index: " + bestSpot.index);
    console.log("function calls: " + fc);
    
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
       // returns the available spots on the board
       function emptyBlocks(board){
        return  board.filter(val => val != "O" && val != "X");
      }
    
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
    
    // If human goes first.
    
    function whoGoesFirst(){
        first = Math.floor(Math.random() * 2);
        console.log(first);
    }
    whoGoesFirst();
    
    
    if (first){                     //Human goes first
        $("td").on("click", function(){
            $(this).find("span").hide().html(humanSymbol).fadeIn("slow");
            $(this).off("click");
            origBoard[$(this).attr("id")] = human;
            var bestSpot = minimax(origBoard, ai);
            origBoard[bestSpot.index] = ai;
            setTimeout(()=>{
                $("#" + bestSpot.index).find("span").hide().html(aiSymbol).fadeIn("slow");
                $("#" + bestSpot.index).off("click");
                if (bestSpot.score > 0){
                    var winArray = [[origBoard[0], origBoard[1], origBoard[2]],
                                    [origBoard[3], origBoard[4], origBoard[5]],
                                    [origBoard[6], origBoard[7], origBoard[8]],
                                    [origBoard[0], origBoard[3], origBoard[6]],
                                    [origBoard[1] ,origBoard[4], origBoard[7]],
                                    [origBoard[2] ,origBoard[5], origBoard[8]],
                                    [origBoard[0] ,origBoard[4], origBoard[8]],
                                    [origBoard[2] ,origBoard[4], origBoard[6]]];
                    // var winspots = winArray.filter(function(val){
                    //     var temp = val[0];
                    //     console.log(val, temp);
                    // });
                    console.log(winArray);
                    // console.log(winspots);
                    console.log("AI WON");
                    
                }
            }, 1000)
           
            
            console.log(bestSpot);
            
         
         });
    }
    else {                          //AI goes first
        var bestSpot = minimax(origBoard, ai);
        console.log(bestSpot);
        var toDisable = ("#" + bestSpot.index);
        $("#" + bestSpot.index).find("span").hide().html(aiSymbol).fadeIn("slow");
        $("#" + bestSpot.index).attr("disabled", "true");
        origBoard[bestSpot.index] = ai;
        $("td").not(toDisable).on("click", function(e){
            if ($(e.target).is(toDisable)){
                e.preventDefault();
                return;
            }
            $(this).find("span").hide().html(humanSymbol).fadeIn("slow");
            $(this).off("click");
            origBoard[$(this).attr("id")] = human;
            var bestSpot = minimax(origBoard, ai);
            console.log(bestSpot);
            
            setTimeout(()=>{
                $("#" + bestSpot.index).find("span").hide().html(aiSymbol).fadeIn("slow");
                $("#" + bestSpot.index).off("click");
                origBoard[bestSpot.index] = ai;
                if (bestSpot.score > 0){
                    var winArray = [[origBoard[0], origBoard[1], origBoard[2]],
                                    [origBoard[3], origBoard[4], origBoard[5]],
                                    [origBoard[6], origBoard[7], origBoard[8]],
                                    [origBoard[0], origBoard[3], origBoard[6]],
                                    [origBoard[1] ,origBoard[4], origBoard[7]],
                                    [origBoard[2] ,origBoard[5], origBoard[8]],
                                    [origBoard[0] ,origBoard[4], origBoard[8]],
                                    [origBoard[2] ,origBoard[4], origBoard[6]]];
                    
                    // var winspots = winArray.filter(function(val){
                    //     var temp = val[0];
                    //     val.forEach(function(b, i){
                    //         if(temp === val[i]){
                    //         }
                    //         else {
                    //             return false;
                    //         }
                    //     });
                    //     return true;
                    // });
                    // console.log(winArray);
                    // console.log(winspots);
                    console.log("AI WON");
                }
            }, 1000);
            
            
            
        });
    }
    //if AI goes first
    
}








});
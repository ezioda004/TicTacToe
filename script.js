$(document).ready(function(){
    // console.log($(".corner").length);

    
   
    // $(".corner:eq(" + x + ")").text("X").effect( "bounce", "slow" );

    // $("td").on("click", function(){
    //     // alert("test");
    //     $(this).text("O").effect("bounce", "slow");
    //     console.log($(this).attr("id"));
    // });
    let turn = 1;
    let whoGoesFirst = Math.floor(Math.random() * 2); // Chooses who goes first
    
    function AILogic(){
        if (whoGoesFirst){
            console.log("Players goes first");
    
    
        }
        else {
            console.log("AI goes first");
            let x = Math.floor(Math.random()*($(".corner").length));
            if (turn == 1){
                $(".corner:eq(" + x + ")").text("X").effect( "bounce", "slow" );
            }
            else if (turn == 2){
                alert("2nd turn ai")
                let x = Math.floor(Math.random()*($(".corner").length));
                $(".corner:eq(" + x + ")").text("X").effect( "bounce", "slow" );
            }
        }
    }
    AILogic();

    $("td").on("click", function(){
        if (whoGoesFirst == 0){
            if (turn == 1){
                // let x = Math.floor(Math.random()*($(".corner").length));
               
                $(this).text("O").effect("bounce", "slow");
                console.log($(this).attr("id"));
                turn++;
            }
            else if (turn == 2){
                let x = Math.floor(Math.random()*($(".corner").length));
                $(this).text("O").effect("bounce", "slow");
                alert("works");
                turn++;
                AILogic();
            }
        }
    });
});
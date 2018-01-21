$(document).ready(function(){
    console.log($(".corner").length);
    let x = Math.floor(Math.random()*($(".corner").length));
    // $(".corner")[x].animate("animated bounce").text("X")
    // $(".corner")[x].text("X").animate({ marginTop: "80px" }, 1500 )
    //            .animate({ marginTop: "40px" }, 800 );
    // console.log($(".corner")[1]);
    // let  y = $(".corner")[1]
    // y.text("HELLO")
    // console.log(x);
    // console.log($(".corner:nth-of-type(" + x+1 + ")"), x);
    $(".corner:eq(" + x + ")").text("X").animate({ marginTop: "80px" }, 1500 )
               .animate({ marginTop: "40px" }, 800 );
    // console.log($(".corner:eq(0)"))
    // console.log($(".corner:eq(1)"))
    // console.log($(".corner:eq(2)"))
    // console.log($(".corner:eq(3)"))
});
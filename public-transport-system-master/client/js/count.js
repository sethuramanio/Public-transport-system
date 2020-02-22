function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
var c=0;

$(document).ready(function () {
    
    console.log(c);
    $('#a').empty();
    $("#a").append("<h2>Count Of People: " + c + "<h2>");
    $("#heading").click(function () {
        c = c + 1;
        console.log(c);
        $('#a').empty();
        $("#a").append("<h2>Count Of People: "+c+"<h2>");
    });
    
});




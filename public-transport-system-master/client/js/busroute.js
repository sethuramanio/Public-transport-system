function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function () {
    console.log("ready");
    console.log("ready");
    $.ajax({
        type: "POST",
        data: '{"hi":"hi"}',
        dataType: "json",
        url: "http://54.160.238.67:5000/busroute",
        cache: false,
        success: function (data) {
            console.log(data);
            console.log(data['Items']);

       
            var i;
            for (i = 0; i < data['Count']; i++) {
                var s = '<div class="item">' +
                    
                    '<p> <b>Bus Route: </b>' + data['Items'][i]['busno'] + '<br></p>' +
                    '<p> <b>Start: </b>' + data['Items'][i]['start'] + '<br></p>' +
                    '<p> <b>End: </b>' + data['Items'][i]['end'] + '<br></p>' +
                    '<p> <b>Mid Points: </b>' + data['Items'][i]['mid'] + '<br></p>' +
                    '<p> <b>Time: </b>' + data['Items'][i]['time'] + '<br></p>' +
                    
                    ' </div > ';
                $("#division").append(s + "<br>");

            };


        }
    });
});

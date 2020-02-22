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
        type: "GET",
        dataType: "json",
        url: "http://54.160.238.67:5000/history",
        cache: false,
        success: function (data) {
            console.log(data);
            console.log(data['Items'][0]['photo']);

            console.log(data['Count']);

            data['Items'].sort(function (a, b) {
                if (a.dateandtime > b.dateandtime) {
                    return 1;
                } else if (a.dateandtime < b.dateandtime) {
                    return -1;
                } else {
                    return 0;
                }
            });
            var i;
            for (i = 0; i < data['Count']; i++) {
                var s = '<div class="item">' +
                    '<p> <b>Date And Time: </b>' + data['Items'][i]['dateandtime'] + '<br></p>' +
                    '<p> <b>X1: </b>' + data['Items'][i]['x1'] + '<br></p>' +
                    '<p> <b>Y1: </b>' + data['Items'][i]['y1'] + '<br></p>' +
                    '<p> <b>X2: </b>' + data['Items'][i]['x2'] + '<br></p>' +
                    '<p> <b>Y2: </b>' + data['Items'][i]['y2'] + '<br></p>' +
                    '<p> <b>Cost: </b>' + data['Items'][i]['cost'] + '<br></p>' +
                    '<p> <b>Distance: </b>' + data['Items'][i]['distance'] + '<br></p>' +
                    
                    
                    ' </div > ';
                $("#division").append(s + "<br>");

            };


        }
    });
});



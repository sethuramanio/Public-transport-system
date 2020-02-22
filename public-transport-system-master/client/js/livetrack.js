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
        url: "http://54.160.238.67:5000/images",
        cache: false,
        success: function (data) {
            console.log(data);
            console.log(data['Items']);
            
            console.log(data['Items'][0]['photo']);
     
            console.log(data['Count']);

            data['Items'].sort(function (a, b) {
                if (a.dateandtime < b.dateandtime) {
                    return 1;
                } else if (a.dateandtime > b.dateandtime) {
                    return -1;
                } else {
                    return 0;
                }
            });
            
            var s = '<img src="'+data['Items'][0]['url']+'" >';
            $("#pic").append(s + "<br>");

            


        }
    });
});
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function () {
    console.log("ready");

    $("#click").click(function () {
        console.log("clicked");

        var x1= $("#x1").val();
        var y1 = $("#y1").val();
        var x2 = $("#x2").val();
        var y2 = $("#y2").val();
       

        if (x1.length > 0 && x2.length > 0 && y1.length > 0 && y2.length > 0) {
            var d = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
            d = Math.round(d);
            $("#dist").append(d);
            
            var c = d * 6;
            c = Math.round(c);
            $("#cost").append(c);
            
            console.log(d);
            var text = '{"x1": ' + x1 + ',"y1":' + y1 + ',"x2":' + x2 + ',"y2":' + y2 + ',"d":' + d + ',"c":' + c + '}';
            console.log(text);

            obj = JSON.parse(text);
            console.log(obj);
            $.ajax({
                data: obj,
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                crossOrigin: null,
                url: "http://54.160.238.67:5000/bustrack"
            })
                .done(function (data) {
                    if (data.error) {
                        console.log(data.Outcome);

                    }
                    else {
                        console.log(data);
                        var obj = JSON.parse(data);
                        console.log(obj);
                        

                    }

                });


        } else {
            console.log("Enter all Values");
        }
    });
});
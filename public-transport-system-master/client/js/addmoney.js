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

        var rfid = $("#rfid").val();
        var amt = $("#amt").val();
      

        if (rfid.length > 0 && amt.length > 0) {
            console.log("no error");
            var text = '{' + '"id": "' + rfid +
                '","amount": ' + amt +
                '}';
            console.log(text);
            obj = JSON.parse(text);
            console.log(obj);
            $.ajax({
                data: obj,
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                crossOrigin: null,
                url: "http://54.160.238.67:5000/addmoney"
            })
                .done(function (data) {
                    if (data.error) {
                        console.log(data.Outcome);

                    }
                    else {
                        console.log(data);
                           
                  
                    }

                });


        } else {
            console.log("Enter all Values");
        }
    });
});
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

        var userid = $("#login").val();
        var password = $("#password").val();
        console.log(userid);
        console.log(password);

        if (userid.length > 0 && password.length > 0 ) {
            console.log("no error");
            var text = '{' + '"userid": "' + userid +
                '","password": "' + password +
                '"}';
            console.log(text);
            obj = JSON.parse(text);
            console.log(obj);
            $.ajax({
                data: obj,
                type: 'POST',
                crossDomain: true,
                dataType: "json",
                crossOrigin: null,
                url: "http://54.160.238.67:5000/verifylogin"
            })
                .done(function (data) {
                    if (data.error) {
                        console.log(data.Outcome);

                    }
                    else {
                        console.log(data);
                        alert("Success");
                        var obj = JSON.parse(data);
                        console.log(obj);
                        var a = obj.Outcome;
                        
                   
                    }

                });


        } else {
            console.log("Enter all Values");
        }
    });
});
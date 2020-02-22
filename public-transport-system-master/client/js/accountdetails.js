function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function () {
    console.log("ready");

          
    $.ajax({
        data:'{"hi":"hi"}',
        type: 'POST',
        crossDomain: true,
        dataType: "json",
        crossOrigin: null,
        url: "http://54.160.238.67:5000/accountdetails"
    })
        .done(function (data) {
            if (data.error) {
                console.log(data);

            }
            else {
                console.log(data);
                $("#acc").append("<br><br><p><b>Name: </b>" + data.name +
                    "</p><p><b>Rfidtag: </b>" + data.rfidtag +
                    "</p/><p><b>Userid: </b>" + data.userid+
                    "</p/><p><b>Address: </b>" + data.address +
                    "</p><p><b>Age: </b>" + data.age +"</p>"
                );

            }

        });


        
    
});


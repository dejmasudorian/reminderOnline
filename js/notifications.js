apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#tabs a').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });


    getNotifications();

});

function getNotifications() {
    $.ajax({
        url: apiUrl + "/notifications",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, notification) {
            $('#notifications > tbody:last-child').append("<tr><td hidden>" + notification.id +
                "</td><td>" + notification.details +
                "</td><td>" + notification.reminderCreatedDate +
                "</td><td>" + notification.importance +
                "</td></tr>");
        });
    });
}

apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#tabs a').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });


    getNotifications();

});



function addNotifications() {
    var details = $("input[title='Details']").val();
    var reminderCreatedDate = new Date();

    var data = {
        'details': details,
        'reminderCreatedDate': reminderCreatedDate
    };

    $.ajax({
        url: apiUrl + "/notifications",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        console.log(response);
    });
}



function getNotifications() {
    $.ajax({
        url: apiUrl + "/notifications",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(notification) {
            $('#reminders > tbody:last-child').append("<tr><td hidden>" + notification.id +
                "</td><td>" + notification.details +
                "</td><td>" + notification.reminderCreatedDate +
                "</td><td><input type=\"checkbox\" class=\"mark-done\" title=\"Done\">" +
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>" +
                "<a href=\'#\' class=\'fa fa-trash delete\' data-id=\'${reminder.id}\'></a></td></tr>");
        });
    });
}

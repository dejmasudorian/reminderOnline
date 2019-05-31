apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#view-notification-tab').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });


    getNotifications();


    $('#notifications tbody').delegate('.delete', 'click', function () {
        var id = $(this).data('id');
        deleteNotification(id);
    });

    $('#notifications tbody').delegate('.edit', 'click', function () {
        var id = $(this).data('id');
        startEdit(id);
    });





});

function addNotifications() {
    var details = $("input[title='Details']").val();
    var reminderCreatedDate = new Date();

    var data = {
        'details': details,
        'reminderCreatedDate': reminderCreatedDate,
    };

    $.ajax({
        url: apiUrl + "/notifications",
        method:"POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        console.log(response);
    });
}



function dateFormat(inputDate) {
    var dateFormated = new Date(inputDate).toLocaleDateString('ro-RO');
    return dateFormated;
}

function checks(input) {
    var checkedAttribute = input ? 'checked' : '';
    return checkedAttribute;

}

function getNotifications() {
    $.ajax({
        url: apiUrl + "/notifications",
        method:"GET"
    }).done(function (response) {
        $.each(response, function(i, notification) {
            $('#notifications > tbody:last-child').append("<tr><td hidden>" + notification.id +
                "</td><td>" + notification.details +
                "</td><td>" + dateFormat(notification.reminderCreatedDate) +
                "</td><td><input type='checkbox' ${checks(notification.importance)} class='mark-important' title='Important'>" +
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a><a href='#' class='fa fa-trash delete' methods='DELETE'></a></td></tr>");
        });
    });
}

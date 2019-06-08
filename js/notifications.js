apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#view-notification-tab').on('click', function (e) {
        $(this).tab('show');
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getNotifications();

    $("#create-reminder").submit(function (event) {
        event.preventDefault();
        addNotificationCreationForReminders();
    });

    $("#create-event").submit(function (event) {
        event.preventDefault();
        addNotificationCreationForEvents();
    });

    $('#notifications').delegate('.delete', 'click', function () {
        event.preventDefault();
        let id = $(this).data('id');
        deleteNotification(id);
    });


});


function addNotificationCreationForReminders() {
    var details = "You have created a new reminder.";
    var reminderCreatedDate = new Date();
    var data = {
        'details': details,
        'reminderCreatedDate': reminderCreatedDate,

    };

    $.ajax({
        url: apiUrl + "/notifications",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        console.log(response);
    }).fail(function (jqXHR, textStatus, error) {
        alert(textStatus);
    });
}


function addNotificationCreationForEvents() {
    var details = "You have created a new event.";
    var reminderCreatedDate = new Date();
    var data = {
        'details': details,
        'reminderCreatedDate': reminderCreatedDate,

    };

    $.ajax({
        url: apiUrl + "/notifications",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        console.log(response);
    }).fail(function (jqXHR, textStatus, error) {
        alert(textStatus);
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
        $("#nrNotification").text(response.length);
        $.each(response, function(i, notification) {
            $('#notifications > tbody:last-child').append(`<tr><td hidden>${notification.id}</td>
                <td>${notification.details}</td>
                <td>${dateFormat(notification.reminderCreatedDate)}</td>
                <td><input type='checkbox' ${checks(notification.importance)} class='mark-important' title='Important' checked></td>
                <td><a href='#' class='fa fa-trash delete' data-id=${notification.id}></td></tr>`
            );
        });
    });
}



function deleteNotification(id) {
    $.ajax({
        url: apiUrl + "/notifications/" + id,
        method: "DELETE",
        headers: {
            'Access-Control-Allow-Origin': '*'}
    }).done(function (response) {
        console.log(response);
        $('#notifications tbody').find("tr#" + id).remove();
        location.reload();
    });
}

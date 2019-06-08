$(document).ready(function() {

    $('#view-reminder-tab').on('click', function (e) {
        $(this).tab('show');
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getReminders();

    $('#reminders').delegate('.delete', 'click', function () {
        event.preventDefault();
        let id = $(this).data('id');
        deleteReminder(id);
        addNotificationDeletionForReminders();
    });

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();


});

function getReminders() {
    $.ajax({
        url: apiUrl + "/reminders",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, reminder) {
            $('#reminders > tbody:last-child').append(`<tr data-toggle="collapse" data-target="#${reminder.id}" class="clickable"><td hidden>${reminder.id}</td>
                <td><a href='#' data-toggle='tooltip' title='You can verify this reminder in the notification tab.'>${reminder.title}</a></td>
                <td>${dateFormat(reminder.remindDate)}</td>
                <td>${remainingTime(reminder.remindDate)}</td>
                <td><a href='updateReminder.html?id=${reminder.id}' class='edit'>&#9998;</a>
                <a href='#' class='fa fa-trash delete' data-id=${reminder.id}></td></tr>
                <tr id="${reminder.id}" class="collapse"><td colspan="4"></td></tr>`
            );
        });
    });
}

function addNotificationDeletionForReminders() {
    var details = "You have deleted a reminder.";
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

function deleteReminder(id) {
    $.ajax({
        url: apiUrl + "/reminders/" + id,
        method: "DELETE",
        headers: {
            'Access-Control-Allow-Origin': '*'}
    }).done(function (response) {
        console.log(response);
        $('#reminders tbody').find("tr#" + id).remove();
        location.reload();
    });
}









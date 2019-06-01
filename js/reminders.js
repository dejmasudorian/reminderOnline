apiUrl = "http://localhost:8082";

reminderList=[];
    editId='';

$(document).ready(function() {
    $('#view-reminder-tab').on('click', function (e) {
        $(this).tab('show');
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getReminders();

    $("#create-reminder").submit(function (event) {
        event.preventDefault();
        addReminder();
    });

    $('#reminders tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            deleteReminder(id);
    });

    $('#reminders tbody').delegate('.edit', 'click', function () {
        var id = $(this).data('id');
        update(id);
    });
});


function remainingTime(index) {

    var dateObject = new Date(index);
    var countDownDate = dateObject.getTime();
    var now = new Date().getTime();
    var remaining = countDownDate - now;
    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    var daysString = days.toString();;
    var hoursString = hours.toString();
    var minutesString = minutes.toString();
    var secondsString = seconds.toString();
    var message= daysString + "d:" + hoursString + "h:" + minutesString + "m:" + secondsString + "s";
    if (remaining < 0)
       message = "EXPIRED";
    return message;
}


function addReminder() {
    var title = $("input[title='title']").val();
    var remindDate = $("input[title='remindDate']").val();

    var data = {
        'title': title,
        'remindDate': remindDate,

    };

    $.ajax({
        url: apiUrl + "/reminders",
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


function getReminders() {
    $.ajax({
        url: apiUrl + "/reminders",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, reminder) {
            $('#reminders > tbody:last-child').append("<tr><td hidden>" + reminder.id +
                "</td><td>" + reminder.title +
                "</td><td>" + dateFormat(reminder.remindDate) +
                "</td><td>" + remainingTime(reminder.remindDate)+
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a><a href='#' class='fa fa-trash delete'></a></td></tr>"
            );
        });
    });
}
/*
function startEdit(id) {
    var editReminder = reminderList.find(function (reminder) {
        console.log(reminder.title);
        return reminder.id == id;
    });
    console.debug('startEdit', editReminder);

    $('input[name=title]').val(editReminder.title);
    $('input[name=remindDate]').val(editReminder.remindDate);
    editId = id;
}
*/
function deleteReminder(id) {
    $.ajax({
        url: apiUrl + "/reminders/" + id,
        method: "DELETE",
        type: "DELETE"
    }).done(function (response) {
        console.log(response);
        $('#reminders tbody').find("tr#" + id).remove();
    });
}



function update(id) {
    var url = "http://localhost:8082/reminders";

    var data = {};
    $('input[name=title]').val(reminder.title);
    $('input[name=remindDate]').val(reminder.remindDate);
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url + '/' + id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var reminder = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(reminder);
        } else {
            console.error(reminder);
        }
    }
    xhr.send(json);
}









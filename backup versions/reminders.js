apiUrl = "http://localhost:8082";

reminderList=[];


$(document).ready(function() {
    $('#view-reminder-tab').on('click', function (e) {
        $(this).tab('show');
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getReminders();

    var queryParams=getQueryParams();
    getReminder(queryParams["id"]);

    $("#create-reminder").submit(function (event) {
        event.preventDefault();
        addReminder();
    });

    $('#reminders').delegate('.delete', 'click', function () {
        event.preventDefault();
        let id = $(this).data('id');
        deleteReminder(id);
        addNotificationDeletionForReminders();
    });

    $("#update-reminder").submit(function (event) {
        event.preventDefault();
        updateReminder();
    });

    //Tooltip
    $('[data-toggle="tooltip"]').tooltip();


});


//get query params for current Url
function getQueryParams(){

    var queryParams={};
    var queryString= window.location.href.split('?')[1];
    var queryParamsStrings=queryString.split('&');
    queryParamsStrings.forEach(function (param) {
        var keyValue=param.split('=');
        var key=keyValue[0];
        var value=keyValue[1];
        queryParams[key]=value;
    });
    return queryParams;
}


bootstrap_alert = function() {}
bootstrap_alert.success = function(message) {
    $('#alert_success_add').html('<div class="alert alert-success" role="alert">'
        + message +
    '</div>')
    $("#alert_success_add").fadeOut(3000);
}
bootstrap_alert.warning = function(message) {
    $('#alert_warning_add').html('<div class="alert alert-warning" role="alert">'
        + message +
        '</div>')
    $("#alert_warning_add").fadeOut(3000);
}

bootstrap_alert.error = function(message) {
    $('#alert_error_add').html('<div class="alert alert-error" role="alert">'
        + message +
        '</div>')
    $("#alert_error_add").fadeOut(3000);
}

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
    console.log( $("#remindDate"));

    if(title == "" || remindDate == ""){
        bootstrap_alert.warning("Title and/or date can't be empty!");
        return
    }

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
        bootstrap_alert.success('Reminder added successfully!');
    }).fail(function (jqXHR, textStatus, error) {
        bootstrap_alert.error(error);
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
            $('#reminders > tbody:last-child').append(`<tr><td hidden>${reminder.id}</td>
                <td><a href='#' data-toggle='tooltip' title='You can verify this reminder in the notification tab.'>${reminder.title}</a></td>
                <td>${dateFormat(reminder.remindDate)}</td>
                <td>${remainingTime(reminder.remindDate)}</td>
                <td><a href='updateReminder.html?id=${reminder.id}' class='edit'>&#9998;</a>
                <a href='#' class='fa fa-trash delete' data-id=${reminder.id}></td></tr>`
            );
        });
    });
}


function getReminder(id) {
    $.ajax({
        url: apiUrl + "/reminders/" + id,
        method: "GET"
    }).done(function (response) {

        $("#inputId").val(response.id);
        $("#inputTitle").val(response.title);
        $("#inputDate").val(response.remindDate.split("T")[0]);

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





function updateReminder() {

    var id = $("#inputId").val();
    var title = $("#inputTitle").val();
    var remindDate = $("#inputDate").val();

    if(title == "" || remindDate == ""){
        bootstrap_alert.warning("Title and/or date can't be empty!");
        return
    }

    var reminder = {
        'id' : id,
        'title': title,
        'remindDate': remindDate
    };

    $.ajax({
        url: apiUrl + "/reminders/" + id,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(reminder),
        method: "PUT",
        headers: {
            'Access-Control-Allow-Origin': '*'},
    }).done(function (response) {
        bootstrap_alert.success("Reminder updated successfully!");
    }).fail(function (jqXHR, textStatus, error) {
        bootstrap_alert.error(error);
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


/*
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
*/








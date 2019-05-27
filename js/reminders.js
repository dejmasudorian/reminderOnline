apiUrl = "http://localhost:8082";

$(document).ready(function() {
    $('#tabs a').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });


    getReminders();

    $("#create-reminder").submit(function (event) {
        event.preventDefault();

        add();

        $('#reminders tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            deleteReminder(id);
        });

    });


});

function countdownTimer(reminder) {

var x = setInterval(function() {
    var dateObject = new Date(reminder.remindDate);
    var countDownDate = dateObject.getTime();
    var now = new Date().getTime();
    var remaining = countDownDate - now;
    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    if (remaining < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);}





function add() {
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



function getReminders() {
    $.ajax({
        url: apiUrl + "/reminders",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, reminder) {
            $('#reminders > tbody:last-child').append("<tr><td hidden>" + reminder.id +
                "</td><td>" + reminder.title +
                "</td><td>" + reminder.remindDate +
                "</td><td>" + countdownTimer(reminder) +
                "<p id=\"timer\"></p></td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>" +
                "<a href=\"#\" class=\"fa fa-trash delete\" data-id=\"${reminder.id}\"></a></td></tr>");
        });
    });
}




function deleteReminder(id) {
    $.ajax({
        url: apiUrl + "/reminders/" + id,
        method: "DELETE"
    }).done(function (response) {
        console.log(response);
        $('#reminders tbody').find("tr#" + id).remove();

    });
}

/*
function createReminder() {
    var title = $("input[title='title']").val();
    var remindDate = $("input[title='remindDate']").val();

//json data
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
        $('#reminders tbody').append(getRow(response));

    }).fail(function (jqXHR, textStatus, error) {
        alert(textStatus);
    })
}

function getReminders() {
    $.ajax({
        url: apiUrl + "/reminders",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, reminder) {
            $('#reminders > tbody:last-child').append("<tr><td hidden>" + reminder.id +
                "</td><td>" + reminder.title +
                "</td><td>" + reminder.remindDate +
                "</td><td><p id=\"timer\"></p>" +
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>" +
                "<a href=\"#\" class=\"fa fa-trash delete\" data-id=\"${reminder.id}\" onclick='deleteReminder(reminder.id)'></a></td></tr>");
        });
    });
}


function getRow(reminder) {
    var dateCorrection = new Date(reminder.remindDate).toLocaleDateString('ro-RO');

    return `<tr id="${reminder.id}">
<td class="title">${reminder.title}</td>
<td class="remindDate">${dateCorrection}</td>
<td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>
<a href="#" class="fa fa-trash delete" data-id="${reminder.id}"></a></td>
</tr>
`
}*/





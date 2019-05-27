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
    });

        $('#reminders tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            deleteReminder(id);
        });

    $('#reminders tbody').delegate('.edit', 'click', function () {
        var id = $(this).data('id');
        startEdit(id);
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
                "</td><td>" + remainingTime(reminder.remindDate)+
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>" +
                "<a href='#' class='fa fa-trash delete'></a></td></tr>");
        });
    });
}

function startEdit(id) {
    // ES5 function systax inside find
    var editPhone = PhoneBook.phoneBookList.find(function (phone) {
        console.log(phone.first_name);
        return phone.id == id;
    });
    console.debug('startEdit', editPhone);

    var title = $("input[title='title']").val();
    var remindDate = $("input[title='remindDate']").val();
    PhoneBook.editId = id;
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





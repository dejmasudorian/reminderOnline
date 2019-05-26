apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#tabs a').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getReminders();
    bindingEvents();

});

$('#reminders tbody').delegate('.delete', 'click', function () {
    var id = $(this).data('id');
    deleteReminder(id);
});

function getReminders() {
    $.ajax({
        url: apiUrl + "/reminders",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, reminder) {
            $('#reminders > tbody:last-child').append("<tr><td hidden>" + event.id +
                "</td><td>" + reminder.title +
                "</td><td>" + reminder.remindDate +
                "</td><td>" + "Press to hide/show" +
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>\n" +
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

function createReminder() {
    var title = $("input[title='title']").val();
    var remindDate = $("input[title='remindDate']").val();

//json data
    var data = {
        'title': title,
        'remindDate': remindDate,

    };

    $.ajax({
        url: apiUrl + "/reminders/" ,
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

function getRow(reminder) {
    var dateCorrection = new Date(reminder.remindDate).toLocaleDateString('ro-RO');

    return `<tr id="${reminder.id}">
<td class="title">${reminder.title}</td>
<td class="remindDate">${dateCorrection}</td>
<td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>
<a href="#" class="fa fa-trash delete" data-id="${reminder.id}"></a></td>
</tr>
`
}


function bindingEvents() {

} {

    $("#create-reminder").submit(function (event) {
        event.preventDefault();

        console.log('Submitting form');

        createReminder();

        return false;
    });

    $('#reminders tbody').delegate('.delete', 'click', function () {
        var id = $(this).data('id');
        deleteReminder(id);
    });

    $('#reminders tbody').delegate('.edit', 'click', function () {
        var id = $(this).data('id');
        Reminder.startEdit(id);
    });
}

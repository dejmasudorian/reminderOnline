$(document).ready(function() {

    $("#create-reminder").submit(function (event) {
        event.preventDefault();
        addReminder();
    });

});

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









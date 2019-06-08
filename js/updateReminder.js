apiUrl = "http://localhost:8082";

reminderList=[];


$(document).ready(function() {

    var queryParams=getQueryParams();
    getReminder(queryParams["id"]);

    $("#update-reminder").submit(function (event) {
        event.preventDefault();
        updateReminder();
    });

});

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








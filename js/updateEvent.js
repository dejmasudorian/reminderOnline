apiUrl = "http://localhost:8082";

$(document).ready(function() {

    var queryParams=getQueryParams();
    getEvent(queryParams["id"]);

    $("#update-event").submit(function (event) {
        event.preventDefault();
        updateEvent();
        addNotificationUpdateForEvents();
    });

});

function getEvent(id) {
    $.ajax({
        url: apiUrl + "/events/" + id,
        method: "GET"
    }).done(function (response) {

        $("#inputId").val(response.id);
        $("#inputName").val(response.name);
        $("#inputDateEvent").val(response.dateEvent.split("T")[0]);
        $("#inputLocation").val(response.location);
        $("#inputDescription").val(response.description);

    });
}

function updateEvent() {

    var id = $("#inputId").val();
    var name = $("#inputName").val();
    var dateEvent = $("#inputDateEvent").val();
    var location = $("#inputLocation").val();
    var description = $("#inputDescription").val();

    if(name == "" || dateEvent == ""){
        bootstrap_alert.warning("Name and date can't be empty!");
        return
    }

    var event = {
        'id' : id,
        'title': name,
        'location': location,
        'dateEvent': dateEvent,
        'description': description
    };

    $.ajax({
        url: apiUrl + "/events/" + id,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(event),
        method: "PUT",
        headers: {
            'Access-Control-Allow-Origin': '*'},
    }).done(function (response) {
        bootstrap_alert.success("Event updated successfully!");
    }).fail(function (jqXHR, textStatus, error) {
        bootstrap_alert.error(error);
    });
}

function addNotificationUpdateForEvents() {
    var details = "You have updated your event.";
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







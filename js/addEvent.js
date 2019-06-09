apiUrl = "http://localhost:8082";

$(document).ready(function(){

    $("#create-event").submit(function (event) {
        event.preventDefault();
        createEvent();
    });
});


function createEvent() {
    var name = $("input[title='name']").val();
    var location = $("input[title='location']").val();
    var dateEvent = $("input[title='dateEvent']").val();
    var description = $("input[title='description']").val();

    if(name == "" || dateEvent== ""){
        bootstrap_alert.warning("Your event need at least a name and a date!");
        return
    }

    var data = {
        'name': name,
        'location': location,
        'dateEvent': dateEvent,
        'description': description,

    };

    $.ajax({
        url: apiUrl + "/events",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        bootstrap_alert.success('Event added successfully!');
    }).fail(function (jqXHR, textStatus, error) {
        bootstrap_alert.error(error);
    });
}
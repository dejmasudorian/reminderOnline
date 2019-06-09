apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#view-event-tab').on('click', function (e) {
        $(this).tab('show');
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getEvents();

    $('#events').delegate('.delete', 'click', function () {
        event.preventDefault();
        let id = $(this).data('id');
        deleteEvent(id);
        addNotificationDeletionForEvents();
    });
});


function getEvents() {
    $.ajax({
        url: apiUrl + "/events",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, event) {
            $('#events > tbody:last-child').append(`<tr><td hidden>${event.id}</td>
                 <td>${event.name}</td>
                 <td>${event.location}</td>
                 <td>${dateFormat(event.dateEvent)}</td>
                 <td>${event.description}</td>
                 <td><a href='updateEvent.html?id=${event.id}' class='edit'>&#9998;</a>
                 <a href='#' class='fa fa-trash delete' data-id=${event.id}></td></tr>"`
            );
        });
    });
}



function deleteEvent(id) {
    $.ajax({
        url: apiUrl + "/events/" + id,
        method: "DELETE",
        headers: {
            'Access-Control-Allow-Origin': '*'}
    }).done(function (response) {
        console.log(response);
        $('#events tbody').find("tr#" + id).remove();
        location.reload();
    });
}

function addNotificationDeletionForEvents() {
    var details = "You have deleted an event.";
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
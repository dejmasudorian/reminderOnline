apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#view-event-tab').on('click', function (e) {
        $(this).tab('show');
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });

    getEvents();

    $('#events').delegate('.add_to_cart_button', 'click', function () {
        var id = $(this).data('reminder_id');
        addEventToReminder(id);
    });

});


function addEventToReminder(reminderId){
    var description = $("input[title='description']").val();
    var reminderId = $("input[title='reminderId']").val();

    var data = {
        'description': description,
        'reminderId': reminderId,
    };

    $.ajax({
        url: apiUrl + "/events",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        console.log(response);
    });
}


function getEvents() {
    $.ajax({
        url: apiUrl + "/events",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, event) {
            $('#events > tbody:last-child').append("<tr><td hidden>" + event.id +
                "</td><td>" + event.description +
                "</td><td><button class='button' data-reminder_id='${reminder.id}'><span>Add event to reminder </span></button></td></tr>");
        });
    });
}
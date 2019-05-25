apiUrl = "http://localhost:8082"

$(document).ready(function(){
    $('#tabs a').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    })

    getReminders()

    $('#events tbody').delegate('.delete', 'click', function () {
        var id = $(this).data('id');
        deleteEvent(id);
    });

})

function getReminders() {
    $.ajax({
        url: apiUrl + "/reminders",
        method: "GET"
    }).done(function (response) {
        $.each(response, function(i, reminder) {
            $('#events > tbody:last-child').append("<tr><td hidden>" + event.id +
                "</td><td>" + reminder.title +
                "</td><td>" + reminder.remindDate +
                "</td><td><a href='#' class='delete' data-id='${event.id}'>Delete</a></td></tr>");
        });
    });
}


function deleteEvent(id) {
    $.ajax({
        url: apiUrl + '/events',
        data: { id: id },
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).done(function (response) {
        console.log(response);
        $('#events tbody').find("tr#" + id).remove();

    });


}
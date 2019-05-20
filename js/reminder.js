window.reminderApi = {

    apiUrl: "http://localhost:8082",

    addEvent: function () {
        var title = $("input[title='title']").val();
        var description = $("input[title='description']").val();
        var eventDate = $("input[title='eventDate']").val();

        var data = {
            'title': title,
            'description': description,
            'eventDate': eventDate
        };

        $.ajax({
            url: reminderApi.apiUrl + "/events",
            method: "CREATE",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            $('#reminder tbody').append(reminderApi.getEvents(response));

        }).fail(function (jqXHR, textStatus, error) {
            alert(textStatus);
        })
    },

    getEventRowForTable: function (event) {
        var eventDate = new Date(event.eventDate).toLocaleDateString('ro-RO');

        return `<tr>
<td class="title">${event.title}</td>
<td class="description">${event.description}</td>
<td class="eventDate">${eventDate}</td>
<td><a href="#" class="fa fa-trash delete" data-id="${eventDate.id}"></a></td>
</tr>
`
    },

    addEventToReminder: function (eventId) {
        var data = {
            'noticeId': 1,
            'eventIds': [eventId]
        };

        $.ajax({
            url: reminderApi.apiUrl + "/reminders",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
        });
    },

    getEvents: function () {
        $.ajax({
            url: reminderApi.apiUrl + "/events",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            // reload items table

            reminderApi.displayEvents(response.content);
        });
    },

    getEventDiv: function (event) {
        return `<div class="col-md-3 col-sm-6">
                    <div class="single-reminder">
                       
                        <h2><a href="">${event.title}</a></h2>
                        
                        
                        <div class="event-option-reminder">
                            <a class="add_to_reminder_button" data-event_id="${product.id}" rel="nofollow" href="/reminder.html">Add to reminder</a>
                        </div>                       
                    </div>
                  </div>
`
    },

    displayEvents: function (events) {
        console.log('Displaying events.');

        var divs = '';

        events.forEach(event => divs += reminderApi.getEventDiv(event));

        console.log(divs);

        $('#events-row').html(divs);
    },

    update: function(event) {
        $.ajax({
            url: reminderApi.apiUrl + '?id' + id,
            method: "POST",
            data: event
        }).done(function (response) {

        });
    },

    deleteItem: function (id) {
        $.ajax({
            url: reminderApi.apiUrl + '?id=' + id,
            method: "DELETE"
        }).done(function (response) {
            console.log(response);
            $('#reminder tbody').find("tr#" + id).remove();
        });
    },

    bindEvents: function () {
        $('#events-row').delegate('.add_to_reminder_button', 'click', function () {
            var id = $(this).data('event_id');
            reminderApi.addEventToReminder(id);
        });
    }
};

reminderApi.getEvents();
reminderApi.bindEvents();
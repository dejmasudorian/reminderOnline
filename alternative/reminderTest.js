window.reminderProject = {

    //declare var for update
    reminderList:[],
    editId:'',

    apiUrl: "http://localhost:8082",

    const: API = {
        POST: "http://localhost:8082/reminders",
        GET: "http://localhost:8082/reminders",
        PUT: "http://localhost:8082/reminders",
        DELETE: "http://localhost:8082/reminders"
    },
    const:ACTION_METHODS = {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
        DELETE: "DELETE"
    },


    add: function () {
        var title = $("input[title='title']").val();
        var remindDate = $("input[title='remindDate']").val();

//json data
        var data = {
            'title': title,
            'remindDate': remindDate,

        };

        $.ajax({
            url: API.POST,
            method: ACTION_METHODS.POST,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            $('#reminders tbody').append(reminderProject.getReminderRow(response));

        }).fail(function (jqXHR, textStatus, error) {
            alert(textStatus);
        })
    },




    get: function () {
        $.ajax({
            url: reminderProject.apiUrl + "/reminders",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            // reload items table

            reminderProject.displayReminders(response.content);
        });
    },


    getReminderRow: function (reminder) {
        return `<tr><td hidden>" + reminder.id +
                "</td><td>" + reminder.title +
                "</td><td>" + reminder.remindDate +
                "</td><td>" + "Press to hide/show" +
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>\\n" +
                "<a href=\\"#\\" class=\\"fa fa-trash delete\\" data-id=\\"${reminder.id}\\" onclick="deleteReminder(reminder.id)"></a></td></tr>
`
    },

    displayReminders: function (items) {
        console.log('Displaying reminders.');

        var rows = '';

        items.forEach(item => rows += reminderProject.getReminderRow(item));

        console.log(rows);

        $('#reminders tbody').html(rows);
    },


    startEdit: function (id) {
        // ES5 function systax inside find
        var editReminder = reminderProject.reminderList.find(function (reminder) {
            console.log(reminder.title);
            return reminder.id == id;
        });
        console.debug('startEdit', editReminder);

        $('input[name=title]').val(editReminder.title);
        $('input[name=remindDate]').val(editReminder.remindDate);
        reminderProject.editId = id;
    },

    cancelEdit: function() {
        reminderProject.editId = '';
        document.querySelector(".create-reminder-form").reset();
    },

    delete: function (id) {
        $.ajax({
            url: API.DELETE + '?id=' + id,
            method: ACTION_METHODS.DELETE
        }).done(function (response) {
            console.log(response);
            $('#reminders tbody').find("tr#" + id).remove();

        });
    },

    update: function(reminder) {
        $.ajax({
            url: API.PUT + '?id' + id,
            method: ACTION_METHODS.UPDATE,
            data: reminder
        }).done(function (response) {

        });
    },



    bindEvents: function () {

        $("#create-reminder-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting form');

            reminderProject.add();

            return false;
        });

        $('#reminders tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            reminderProject.delete(id);
        });

        $('#reminders tbody').delegate('.edit', 'click', function () {
            var id = $(this).data('id');
            reminderProject.startEdit(id);
        });
    }
};


reminderProject.get();
reminderProject.bindEvents();
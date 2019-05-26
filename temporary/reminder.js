window.Reminder = {

    //declare var for update
    reminderList:[],
    editId:'',

    apiUrl: "http://localhost:8082",

    const: API = {
        CREATE: "http://localhost:8082/reminders",
        READ: "http://localhost:8082/reminders",
        UPDATE: "http://localhost:8082/reminders",
        DELETE: "http://localhost:8082/reminders"
    },
    const:ACTION_METHODS = {
        CREATE: "POST",
        READ: "GET",
        UPDATE: "PUT",
        DELETE: "DELETE"
    },


    add: function () {
        var title = $("input[title='Title']").val();
        var remindDate = $("input[title='Date']").val();

//json data
        var data = {
            'title': title,
            'remindDate': remindDate,

        };

        $.ajax({
            url: API.CREATE,
            method: ACTION_METHODS.CREATE,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            $('#reminders tbody').append(Reminder.getRow(response));

        }).fail(function (jqXHR, textStatus, error) {
            alert(textStatus);
        })
    },



    getRow: function (reminder) {
        var dateCorrection = new Date(reminder.remindDate).toLocaleDateString('ro-RO');

        return `<tr id="${reminder.id}">
<td class="title">${reminder.title}</td>
<td class="remindDate">${dateCorrection}</td>
<td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>
<a href="#" class="fa fa-trash delete" data-id="${reminder.id}"></a></td>
</tr>
`
    },

    display: function (reminders) {
        console.log('Displaying reminders:');

        var rows = '';

        reminders.forEach(reminder => rows += Reminder.getRow(reminder));

        console.log(rows);

        $('#reminders tbody').html(rows);
    },

    get: function () {
        $.ajax({
            url: API.READ,
            method: ACTION_METHODS.READ
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
    },


    startEdit: function (id) {
        // ES5 function systax inside find
        var editReminder = Reminder.reminderList.find(function (reminder) {
            console.log(reminder.title);
            return reminder.id == id;
        });
        console.debug('startEdit', editReminder);

        $('input[name=title]').val(editReminder.title);
        $('input[name=remindDate]').val(editReminder.remindDate);
        Reminder.editId = id;
    },

    cancelEdit: function() {
        Reminder.editId = '';
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
            url: API.UPDATE + '?id' + id,
            method: ACTION_METHODS.UPDATE,
            data: reminder
        }).done(function (response) {

        });
    },



    bindEvents: function () {

        $("#create-reminder-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting form');

            Reminder.add();

            return false;
        });

        $('#reminders tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            Reminder.delete(id);
        });

        $('#reminders tbody').delegate('.edit', 'click', function () {
            var id = $(this).data('id');
            Reminder.startEdit(id);
        });
    }
};


Reminder.get();
Reminder.bindEvents();
apiUrl = "http://localhost:8082";

$(document).ready(function(){
    $('#tabs a').on('click', function (e) {
        $(this).tab('show')
        $("a.active").removeClass("active");
        $(this).addClass("active");
    });


    get();

});



function addNotifications() {
    var details = $("input[title='Details']").val();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    var reminderCreatedDate = today;

    var data = {
        'details': details,
        'reminderCreatedDate': reminderCreatedDate
    };

    $.ajax({
        url: apiUrl + "/notifications",
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data)
    }).done(function (response) {
        console.log(response);
    });
}

function getRow(item) {
    var checkedAttribute = notification.importance ? 'checked' : '';

    return `<tr>
<td class="description">${item.description}</td>
<td class="deadline">${deadline}</td>
<td><input type="checkbox" ${checkedAttribute} class="mark-done" title="Done"></td>
<td><a href="#" class="fa fa-trash delete" data-id="${item.id}"></a></td>
</tr>
`
}


function getNotifications() {
    $.ajax({
        url: apiUrl + "/notifications",
        method: "GET"
    }).done(function (response) {


        $.each(response, function(notification) {
            $('#reminders > tbody:last-child').append("<tr><td hidden>" + notification.id +
                "</td><td>" + notification.details +
                "</td><td>" + notification.reminderCreatedDate +
                "</td><td><input type=\"checkbox\" ${checkedAttribute} class=\"mark-done\" title=\"Done\">" +
                "</td><td><a href='#' data-id='${reminder.id}' class='edit'>&#9998;</a>" +
                "<a href=\'#\' class=\'fa fa-trash delete\' data-id=\'${reminder.id}\'></a></td></tr>");
        });
    });
}

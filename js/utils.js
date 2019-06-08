apiUrl = "http://localhost:8082";

bootstrap_alert = function() {}
bootstrap_alert.success = function(message) {
    setTimeout(function(){
        $("#alert_success_add").html('');
    },2000);
    $('#alert_success_add').html('<div class="alert alert-success" role="alert">'
        + message +
        '</div>');
}
bootstrap_alert.warning = function(message) {
    setTimeout(function(){
        $("#alert_warning_add").html('');
    },2000);
    $('#alert_warning_add').html('<div class="alert alert-warning" role="alert">'
        + message +
        '</div>');
}

bootstrap_alert.error = function(message) {
    setTimeout(function(){
        $("#alert_error_add").html('');
    },2000);
    $('#alert_error_add').html('<div class="alert alert-error" role="alert">'
        + message +
        '</div>');
}

//get query params for current Url
function getQueryParams(){

    var queryParams={};
    var queryString= window.location.href.split('?')[1];
    var queryParamsStrings=queryString.split('&');
    queryParamsStrings.forEach(function (param) {
        var keyValue=param.split('=');
        var key=keyValue[0];
        var value=keyValue[1];
        queryParams[key]=value;
    });
    return queryParams;
}

function remainingTime(index) {

    var dateObject = new Date(index);
    var countDownDate = dateObject.getTime();
    var now = new Date().getTime();
    var remaining = countDownDate - now;
    var days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    var daysString = days.toString();;
    var hoursString = hours.toString();
    var minutesString = minutes.toString();
    var secondsString = seconds.toString();
    var message= daysString + "d:" + hoursString + "h:" + minutesString + "m:" + secondsString + "s";
    if (remaining < 0)
        message = "EXPIRED";
    return message;
}

function dateFormat(inputDate) {
    var dateFormated = new Date(inputDate).toLocaleDateString('ro-RO');
    return dateFormated;
}

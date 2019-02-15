//call functions when page fully loads
document.addEventListener("DOMContentLoaded", function(event) {
  funStartTime();
  document.getElementById("icon-expand").onclick = function() {
      var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
       if (!isInFullScreen) {
           funOpenFullscreen();
       } else {
           funCloseFullscreen();
       }
  };
});

//display date and time
function funStartTime() {
  var ldNow = new Date();
  var larrWeekday = new Array(7);
  larrWeekday[0] = "Sun";
  larrWeekday[1] = "Mon";
  larrWeekday[2] = "Tue";
  larrWeekday[3] = "Wed";
  larrWeekday[4] = "Thu";
  larrWeekday[5] = "Fri";
  larrWeekday[6] = "Sat";
  var lsDay = larrWeekday[ldNow.getDay()];

  var liDayDate = ldNow.getDate();

  var larrMonth = new Array();
  larrMonth[0] = "Jan";
  larrMonth[1] = "Feb";
  larrMonth[2] = "Mar";
  larrMonth[3] = "Apr";
  larrMonth[4] = "May";
  larrMonth[5] = "Jun";
  larrMonth[6] = "Jul";
  larrMonth[7] = "Aug";
  larrMonth[8] = "Sep";
  larrMonth[9] = "Oct";
  larrMonth[10] = "Nov";
  larrMonth[11] = "Dec";
  var lsMonthName = larrMonth[ldNow.getMonth()];

  var liYear = ldNow.getFullYear();

  var liHour = ldNow.getHours();
  var liMin = ldNow.getMinutes();
  liMin = funCheckTime(liMin);
  document.getElementById("time-date").innerHTML = lsDay + " " + liDayDate + " " + lsMonthName + " " + liYear + " " + liHour + ":" + liMin;
  var t = setTimeout(funStartTime, 500);
}

function funCheckTime(pNo) {
  if (pNo < 10) {pNo = "0" + pNo};  // add zero in front of numbers < 10
  return pNo;
}

function funOpenFullscreen() {
  var elem = document.body;
  if (elem.requestFullscreen) {
    var lobjFullscreen = elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    var lobjFullscreen = elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    var lobjFullscreen = elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    var lobjFullscreen = elem.msRequestFullscreen();
  }
  document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-compress-arrows-alt";
  return lobjFullscreen;
}

/* Close fullscreen */
function funCloseFullscreen() {
  if (document.exitFullscreen) {
    var lobjClose = document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    var lobjClose = document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    var lobjClose = document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    var lobjClose = document.msExitFullscreen();
  }
  document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-expand-arrows-alt";

  return lobjClose;

}

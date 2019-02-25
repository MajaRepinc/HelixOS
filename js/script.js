//call functions when page fully loads
document.addEventListener("DOMContentLoaded", function(event) {
  funStartTime();
  document.getElementById("icon-expand").onclick = function() {
      funFullscreen();
  };
});

function funFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
     if (!isInFullScreen) {
         funOpenFullscreen();
     } else {
         funCloseFullscreen();
     }
}

var Draggable = function (id) {
    var el = document.querySelector(id),
        isDragReady = false,
        dragoffset = {
            x: 0,
            y: 0
        };
    this.init = function () { this.events(); };

    //events for the element
    this.events = function () {
        var self = this;
        _on(document.getElementsByClassName('modal-header')[0], 'mousedown', function (e) {
            isDragReady = true;
            e.preventDefault();
            var modalMousedown = document.querySelectorAll(".modal-wrapper")
            for (var count = 0; count < modalMousedown.length; count++) {
              modalMousedown[count].style.zIndex = 1;
            }
            e.target.closest(".modal-wrapper").style.zIndex = 100;
            //corssbrowser mouse pointer values
            e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            dragoffset.x = e.pageX - el.offsetLeft;
            dragoffset.y = e.pageY - el.offsetTop;
        });
        _on(document.getElementsByClassName('modal-header')[0], 'mouseup', function () {
            isDragReady = false;
            var modalMouseup = document.querySelectorAll(".modal-wrapper")
            if(modalMouseup.length <= 1) {
                for (var count = 0; count < modalMouseup.length; count++) {
                  modalMouseup[count].style.zIndex = 1;
                }
            }
        });
        _on(document, 'mousemove', function (e) {
            if (isDragReady) {
                e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                // left/right constraint
                if (e.pageX - dragoffset.x < 0) {
                    offsetX = 0;
                } else if (e.pageX - dragoffset.x + el.offsetWidth > document.body.clientWidth) {
                    offsetX = document.body.clientWidth - el.offsetWidth;
                } else {
                    offsetX = e.pageX - dragoffset.x;
                }

                // top/bottom constraint
                if (e.pageY - dragoffset.y < 40) {
                    offsetY = 40;
                } else if (e.pageY - dragoffset.y + el.offsetHeight > document.body.clientHeight) {
                    offsetY = document.body.clientHeight - el.offsetHeight;
                } else {
                    offsetY = e.pageY - dragoffset.y;
                }

                el.style.top = offsetY + "px";
                el.style.left = offsetX + "px";
            }
        });
    };
    //cross browser event Helper function
    var _on = function (el, event, fn) {
        document.attachEvent ? el.attachEvent('on' + event, fn) : el.addEventListener(event, fn, !0);
    };
    this.init();
}

//new Draggable('#icon-about .modal-wrapper');

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

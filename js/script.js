//call functions when page fully loads
document.addEventListener("DOMContentLoaded", function(event) {
  funStartTime();
  document.getElementById("icon-expand").onclick = function() {
      funFullscreen();

  };
});

function funFullscreen() {
    const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
     if (!isInFullScreen) {
         funOpenFullscreen();
         console.log("opened fullscreen");
     } else {
         funCloseFullscreen();
         console.log("closed fullscreen");
     }
}

function funDraggable(id) {
    var element = document.querySelector(id),
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
            console.log("started dragging");
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
            dragoffset.x = e.pageX - element.offsetLeft;
            dragoffset.y = e.pageY - element.offsetTop;
        });
        _on(document.getElementsByClassName('modal-header')[0], 'mouseup', function () {
            console.log("stopped dragging");
            isDragReady = false;
        });
        _on(document, 'mousemove', function (e) {
            if (isDragReady) {
                e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                // left/right constraint
                if (e.pageX - dragoffset.x < 0) {
                    offsetX = 0;
                } else if (e.pageX - dragoffset.x + element.offsetWidth > document.body.clientWidth) {
                    offsetX = document.body.clientWidth - element.offsetWidth;
                } else {
                    offsetX = e.pageX - dragoffset.x;
                }

                // top/bottom constraint
                if (e.pageY - dragoffset.y < 40) {
                    offsetY = 40;
                } else if (e.pageY - dragoffset.y + element.offsetHeight > document.body.clientHeight) {
                    offsetY = document.body.clientHeight - element.offsetHeight;
                } else {
                    offsetY = e.pageY - dragoffset.y;
                }

                element.style.top = offsetY + "px";
                element.style.left = offsetX + "px";
            }
        });
    };
    //cross browser event Helper function
    var _on = function (element, event, functionality) {
        document.attachEvent ? element.attachEvent('on' + event, functionality) : element.addEventListener(event, functionality, !0);
    };
    this.init();
}

//display date and time
function funStartTime() {
  var now = new Date();
  var weekdayArray = new Array(7);
  weekdayArray[0] = "Sun";
  weekdayArray[1] = "Mon";
  weekdayArray[2] = "Tue";
  weekdayArray[3] = "Wed";
  weekdayArray[4] = "Thu";
  weekdayArray[5] = "Fri";
  weekdayArray[6] = "Sat";
  var day = weekdayArray[now.getDay()];

  var dayDate = now.getDate();

  var monthArray = new Array();
  monthArray[0] = "Jan";
  monthArray[1] = "Feb";
  monthArray[2] = "Mar";
  monthArray[3] = "Apr";
  monthArray[4] = "May";
  monthArray[5] = "Jun";
  monthArray[6] = "Jul";
  monthArray[7] = "Aug";
  monthArray[8] = "Sep";
  monthArray[9] = "Oct";
  monthArray[10] = "Nov";
  monthArray[11] = "Dec";
  var month = monthArray[now.getMonth()];

  var year = now.getFullYear();

  var hour = now.getHours();
  var minute = now.getMinutes();
  minute = funCheckTime(minute);
  document.getElementById("time-date").innerHTML = day + " " + dayDate + " " + month + " " + year + " " + hour + ":" + minute;
  var timeout = setTimeout(funStartTime, 500);
}

function funCheckTime(number) {
  if (number < 10) {number = "0" + number};  // add zero in front of numbers < 10
  return number;
}

function funOpenFullscreen() {
  const element = document.body;
  var fullscreen;
  if (element.requestFullscreen) {
    fullscreen = element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { /* Firefox */
    fullscreen = element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    fullscreen = element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE/Edge */
    fullscreen = element.msRequestFullscreen();
  }
  document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-compress-arrows-alt";
  return fullscreen;
}

/* Close fullscreen */
function funCloseFullscreen() {
  var close;
  if (document.exitFullscreen) {
    close = document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    close = document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    close = document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    close = document.msExitFullscreen();
  }
  document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-expand-arrows-alt";

  return close;

}


//Make the window module resizable
function makeResizableDiv(div) {
  const header = document.querySelector(div + ' .modal-header');
  const element = document.querySelector(div + ' .modal-container');
  const elementBody = element.querySelector('.modal-body')
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimumSize = 20;
  let originalWidth = 0;
  let originalHeight = 0;
  let originalX = 0;
  let originalY = 0;
  let originalMouseX = 0;
  let originalMouseY = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      originalX = element.getBoundingClientRect().left;
      originalY = element.getBoundingClientRect().top;
      originalMouseX = e.pageX;
      originalMouseY = e.pageY;
      element.classList.add("resizing");
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = originalWidth + (e.pageX - originalMouseX);
        const height = originalHeight + (e.pageY - originalMouseY)
        if (width > minimumSize) {
          element.style.width = width + 'px'

        }
        if (height > minimumSize) {
          element.style.height =  height + 'px'
          elementBody.style.height = (element.offsetHeight - header.offsetHeight) + 'px'
        }
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize)
      element.classList.remove("resizing");
    }
  }
}

function expandShrinkWindow(div){

    const element = document.querySelector(div + ' .modal-wrapper');

    if(element.classList.contains("fullscreenWindow")) {
        element.querySelector(".modal-container").style.height = ""
        element.classList.remove("fullscreenWindow")
    } else {
        element.querySelector(".modal-container").style.height = (document.body.offsetHeight - 40) + "px"
        element.classList.add("fullscreenWindow")
    }
}

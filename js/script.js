//call functions when page fully loads

document.addEventListener("DOMContentLoaded", function(event) {

    //set postion of the apps dropdown
    document.getElementById("apps-dropdown").style.left = document.getElementById("icon-apps").offsetLeft + "px";
    window.onresize = function() {
        document.getElementById("apps-dropdown").style.left = document.getElementById("icon-apps").offsetLeft + "px";
    }

    document.oncontextmenu = function() {
        return false;
    }

    document.getElementById("workspace").oncontextmenu = function(event) {
        document.getElementById("context-menu").style.left = event.clientX + "px"
        document.getElementById("context-menu").style.top = event.clientY + "px"
        document.getElementById("context-menu").style.display = "block"
        document.getElementById("workspace").addEventListener('mousedown', hideContextMenu, false);
    }

    //create loading screen to fully load all content
    loadingScreen(document.getElementById("loading-label"), 100);

    setTimeout(function() { document.getElementById("loading").style.display = "none";}, 3500);

    //start clock
    startTime();

    //enable listeners on hover
    changeHover();
    changeContextMenuHover();

    document.getElementById("icon-expand").onclick = function() {
        triggerFullscreen();
    };



    document.addEventListener('keyup', function (event) {
      if (event.defaultPrevented) { return; }
      var key = event.key || event.keyCode;

      if (key === 'F11' || key === "Escape") { keyFullscreen(key) }
    });

    //check for mobile browser
    window.mobilecheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
    if(window.mobilecheck()) {
        document.querySelector("body").setAttribute("class","mobile-view")
    }


});

function hideContextMenu() {
    document.getElementById("context-menu").style.display = "none";
}


function loadingScreen(elementClass, typingSpeed){
    var cursor = document.createElement("div");
    cursor.setAttribute("id", "loading-cursor")
  var thhis = elementClass;
  thhis.style.position =  "relative";
  thhis.style.display =  "inline-block"

  thhis.append(cursor);
  var loadCursor = document.getElementById("loading-cursor");
  thhis = document.getElementById("loading-text");
  var text = thhis.innerText.trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.innerText = "";
  var loaded = false;
  setTimeout(function(){
    thhis.style.opacity = 1;
    thhis.innerText = "";
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {
          newString += char;
          thhis.innerText = newString;
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },1500);


}

var themes = [
    {
        "name": "Default",
        "topBarColour": "#89bdd3",
        "topBarFontColour": "#ffffff",
        "innerWindowColour": "#ffffff",
        "innerWindowFontColour": "#000000",
        "background": "",
    },
    {
        "name": "Dark",
        "topBarColour": "#191919",
        "topBarFontColour": "#e5e5e5",
        "innerWindowColour": "#4c4c4c",
        "innerWindowFontColour": "#e5e5e5",
        "background": "#242424",
    },
    {
        "name": "Light",
        "topBarColour": "#e5e5e5",
        "topBarFontColour": "#333333",
        "innerWindowColour": "#f2f2f2",
        "innerWindowFontColour": "#333333",
        "background": "#ffffff",
    }
]



function keyFullscreen(key) {
    console.log("clicked f11");
    const fullScreenIcon =  document.getElementById("icon-expand").getElementsByTagName("i")[0].className;

      if (fullScreenIcon === "fas fa-expand-arrows-alt" && key !== "Escape") {
          document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-compress-arrows-alt";
          console.log("opened fullscreen");
      } else {
          document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-expand-arrows-alt";
          console.log("closed fullscreen");
      }
}

function triggerFullscreen() {

    const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
     if (!isInFullScreen) {
         openFullscreen();
         document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-compress-arrows-alt";
         console.log("opened fullscreen");
     } else {
         closeFullscreen();
         document.getElementById("icon-expand").getElementsByTagName("i")[0].className = "fas fa-expand-arrows-alt";
         console.log("closed fullscreen");
     }
}

function makeDraggable(id) {
    var element = document.querySelector(id  + " .modal-wrapper"),
        isDragReady = false,
        dragoffset = {
            x: 0,
            y: 0
        };
    this.init = function () { this.events(); };
    //events for the element
    this.events = function () {
        var self = this;
        _on(element.getElementsByClassName('modal-header')[0], 'mousedown', function (e) {
            var elementClass = (e.target || e.srcElement).getAttribute('class');
            if(elementClass !== "window-buttons") {
                isDragReady = true;
                e.preventDefault();
                //crossbrowser mouse pointer values
                e.pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                e.pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                dragoffset.x = e.pageX - element.offsetLeft;
                dragoffset.y = e.pageY - element.offsetTop;
            }
        });
        _on(element.getElementsByClassName('modal-header')[0], 'mouseup', function () {
            //console.log("stopped dragging");
            isDragReady = false;
        });
        _on(document.getElementById("workspace"), 'mousemove', function (e) {

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
        _on(element.getElementsByClassName('modal-header')[0], 'touchstart', function (e) {
            var elementClass = (e.targetTouches[0].target || e.srcElement).getAttribute('class');
            if(elementClass !== "window-buttons" || elementClass !== "fas") {
                isDragReady = true;
                e.preventDefault();
                //crossbrowser mouse pointer values
                e.touches[0].clientX = e.pageX || e.touches[0].clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                e.touches[0].clientY = e.pageY || e.touches[0].clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                dragoffset.x = e.touches[0].clientX - element.offsetLeft;
                dragoffset.y = e.touches[0].clientY - element.offsetTop;
            }
        });
        _on(element.getElementsByClassName('modal-header')[0], 'touchend', function () {
            //console.log("stopped dragging");
            isDragReady = false;
        });
        _on(element.getElementsByClassName('modal-header')[0], 'touchmove', function (e) {

            if (isDragReady) {
                e.touches[0].clientX = e.pageX || e.touches[0].clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                e.touches[0].clientY = e.pageY || e.touches[0].clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                // left/right constraint
                if (e.touches[0].clientX - dragoffset.x < 0) {
                    offsetX = 0;
                } else if (e.touches[0].clientX - dragoffset.x + element.offsetWidth > document.body.clientWidth) {
                    offsetX = document.body.clientWidth - element.offsetWidth;
                } else {
                    offsetX = e.touches[0].clientX - dragoffset.x;
                }

                // top/bottom constraint
                if (e.touches[0].clientY - dragoffset.y < 40) {
                    offsetY = 40;
                } else if (e.touches[0].clientY - dragoffset.y + element.offsetHeight > document.body.clientHeight) {
                    offsetY = document.body.clientHeight - element.offsetHeight;
                } else {
                    offsetY = e.touches[0].clientY - dragoffset.y;
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
function startTime() {
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
  var timeout = setTimeout(startTime, 1000);
}

function funCheckTime(number) {
  if (number < 10) {number = "0" + number};  // add zero in front of numbers < 10
  return number;
}

function openFullscreen() {
  const element = window.document.documentElement;
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

  return fullscreen;
}

/* Close fullscreen */
function closeFullscreen() {
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
  elementBody.style.height = (element.offsetHeight - header.offsetHeight) + 'px'
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
    const header = document.querySelector(div + ' .modal-header');
    const element = document.querySelector(div + ' .modal-wrapper');
    const container = document.querySelector(div + ' .modal-container');
    if(element.classList.contains("fullscreenWindow")) {
        element.querySelector(".modal-container").style.height = "";
        element.classList.remove("fullscreenWindow");
        element.querySelector(".window-expand-shrink div").classList.remove("fa-compress");
        element.querySelector(".window-expand-shrink div").classList.add("fa-expand");
        setTimeout(function() { container.classList.remove("resizing"); }, 10);
    } else {
        container.classList.add("resizing");
        element.querySelector(".modal-container").style.height = (document.body.offsetHeight - 40) + "px"
        element.classList.add("fullscreenWindow")
        element.querySelector(".window-expand-shrink div").classList.remove("fa-expand");
        element.querySelector(".window-expand-shrink div").classList.add("fa-compress");
    }
    element.querySelector(".modal-body").style.height = (container.offsetHeight - header.offsetHeight) + 'px'

}

function onMobileWindowModal(div) {
    const header = document.querySelector(div + ' .modal-header');
    const element = document.querySelector(div + ' .modal-container');
    const container = document.querySelector('#workspace');

    element.querySelector(".modal-body").style.height = (container.offsetHeight - header.offsetHeight) + 'px'
    element.style.height = container.offsetHeight + 'px';
    element.style.width = "100%";
    element.style.minWidth = 0;
    element.style.transition = "none";
    element.style.position = "fixed";
}




function checkColourSettings() {
    var contextMenu = document.getElementById("context-menu");
    var contextSubMenuPrograms = document.getElementById("contex-submenu-programs");
    if(settingsAppWindow.topBarCol !== "") {
        var allHeaders = document.getElementsByClassName("modal-header");
        for(var i = 0; i < allHeaders.length; i++) {
            allHeaders[i].style.backgroundColor = settingsAppWindow.topBarCol;
        }
    }

    if(settingsAppWindow.topBarFontCol !== "") {
        var allHeadersFont = document.getElementsByClassName("modal-header");
        for(var i = 0; i < allHeadersFont.length; i++) {
            allHeadersFont[i].style.color = settingsAppWindow.topBarFontCol;
        }
    }

    if(settingsAppWindow.innerWindowCol !== "") {
        var allInnerWindows = document.getElementsByClassName("modal-container");
        var allDropItems = document.getElementsByClassName("options");

        for(var i = 0; i < allInnerWindows.length; i++) {
            allInnerWindows[i].style.backgroundColor = settingsAppWindow.innerWindowCol;
        }
        for(var i = 0; i < allDropItems.length; i++) {
            allDropItems[i].style.backgroundColor = settingsAppWindow.innerWindowCol;
        }
        contextMenu.style.backgroundColor = settingsAppWindow.innerWindowCol;
        contextSubMenuPrograms.style.backgroundColor = settingsAppWindow.innerWindowCol;
    }
    if(settingsAppWindow.innerWindowFontCol !== "") {
        var allInnerWindowsFont = document.getElementsByClassName("modal-container");
        for(var i = 0; i < allInnerWindowsFont.length; i++) {
            allInnerWindowsFont[i].style.color = settingsAppWindow.innerWindowFontCol;
        }
        contextMenu.style.color = settingsAppWindow.innerWindowFontCol;
        contextSubMenuPrograms.style.color = settingsAppWindow.innerWindowFontCol;
    }

}

function changeColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

function focusWindow(element) {
    var allOpenWindows = document.querySelectorAll(".modal-wrapper")
    for (var count = 0; count < allOpenWindows.length; count++) {
        allOpenWindows[count].style.zIndex = 1;
        allOpenWindows[count].style.opacity = 0.7;
    }
    document.querySelector("#" + element.$el.parentNode.id + " .modal-wrapper").style.zIndex = 100
    document.querySelector("#" + element.$el.parentNode.id + " .modal-wrapper").style.opacity = 1
}


function changeHover() {

    var topBarElement =document.querySelectorAll('#top-bar .hover-element');
    for(var i=0;i<topBarElement.length;i++){
        topBarElement[i].addEventListener('mouseover',topBarHover,false);
        topBarElement[i].addEventListener('mouseout',topBarHover,false);
    }
    function topBarHover(event) {
        if (event.type == 'mouseover') {
            event.target.style.background = settingsAppWindow.hover
        }
        if (event.type == 'mouseout') {
            event.target.style.background = ""
        }
    }
}

function changeSearchHover() {

    var searchElement =document.querySelector('#search-modal .hover-element');
    searchElement.addEventListener('mouseover',searchHover,false);

    function searchHover(event) {
        if (event.type == 'mouseover') {
            event.target.style.backgroundColor = settingsAppWindow.hover
        }
        if (event.type == 'mouseout') {
            event.target.style.backgroundColor = "";
            event.target.style.background = "";
        }
    }
}

function changeContextMenuHover() {

    var topBarElement =document.querySelectorAll('#context-menu .hover-element');
    for(var i=0;i<topBarElement.length;i++){
        topBarElement[i].addEventListener('mouseover',contextMenuHover,false);
        topBarElement[i].addEventListener('mouseout',contextMenuHover,false);
    }

    function contextMenuHover(event) {
        if (event.type == 'mouseover') {
            event.target.style.background = settingsAppWindow.hoverContext;
            event.target.style.color = settingsAppWindow.topBarFontCol;
        }
        if (event.type == 'mouseout') {
            event.target.style.background = "";
            event.target.style.color = "";
        }
    }
}

function changeHighlightedColour() {
    var topBarHighlighted = document.querySelectorAll('#top-bar .highlighted');

    for(var i=0;i<topBarHighlighted.length;i++){
        topBarHighlighted[i].style.backgroundColor = settingsAppWindow.hover
    }
}

function changeMiddleBarColour() {
    var topBarHighlighted = document.querySelectorAll('#top-bar .top-bar-element');

    for(var i=0;i<topBarHighlighted.length;i++){
        topBarHighlighted[i].style.borderBottomColor = settingsAppWindow.topBarFontCol
    }
}

function changeMiddleElementHover() {
    var topBarElement =document.querySelectorAll('#top-bar .top-bar-element');
    for(var i=0;i<topBarElement.length;i++){
        if(topBarElement[i].classList.contains("hover-middle-element")) {
            topBarElement[i].addEventListener('mouseover',topMiddleHover,false);
            topBarElement[i].addEventListener('mouseout',topMiddleHover,false);
        } else {
            topBarElement[i].removeEventListener('mouseover',topMiddleHover,false);
            topBarElement[i].removeEventListener('mouseout',topMiddleHover,false);
        }
    }

    function topMiddleHover(event) {
        if (event.type == 'mouseover') {
            event.target.style.background = settingsAppWindow.hover
        }
        if (event.type == 'mouseout') {
            event.target.style.background = ""
        }
    }
}

function changeOptionColour() {
    var optionElement =document.querySelectorAll('#settings-modal .option');

    for(var i=0;i<optionElement.length;i++){
        optionElement[i].style.backgroundColor = ""
        optionElement[i].style.color = ""
        optionElement[i].classList.remove("option-focus");
        if(optionElement[i].getElementsByClassName("s-c")[0].checked) {
            optionElement[i].classList.add("option-focus");
            optionElement[i].style.backgroundColor = settingsAppWindow.topBarCol
            optionElement[i].style.color = settingsAppWindow.topBarFontCol

        }
    }
}

function changeOptionHover() {
    var optionElement =document.querySelectorAll('#settings-modal .option');
    var optionElementChecked =document.querySelectorAll('#settings-modal .option input[type="radio"]:checked');

    for(var i=0;i<optionElement.length;i++){
        optionElement[i].addEventListener('mouseover',optionHover,false);
        optionElement[i].addEventListener('mouseout',optionHover,false);

    }

    for(var j=0;j<optionElementChecked.length;j++) {
        optionElementChecked[j].parentNode.removeEventListener('mouseover',optionHover,false);
        optionElementChecked[j].parentNode.removeEventListener('mouseout',optionHover,false);
        optionElementChecked[j].removeEventListener('mouseover',optionHover,false);
        optionElementChecked[j].removeEventListener('mouseout',optionHover,false);
    }

    function optionHover(event) {
        if (event.type == 'mouseover' && !event.target.parentNode.classList.contains("option-focus")) {
            event.target.parentNode.style.background = settingsAppWindow.hover
            event.target.parentNode.style.color = settingsAppWindow.topBarFontCol
        }
        if (event.type == 'mouseout' && !event.target.parentNode.classList.contains("option-focus")) {
            event.target.parentNode.style.background = ""
            event.target.parentNode.style.color = ""
        }
    }
}


function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

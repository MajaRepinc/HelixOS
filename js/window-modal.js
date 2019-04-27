// register modal component
var windowModalComponent = Vue.component("modal", {
  template:`
  <transition name="modal" @after-enter="initalizeFunctions();">
      <div class="modal-wrapper"  @mousedown="putFocusOnCurrent()">
          <div class="modal-container">
              <div class='resizers'>
                  <div class="modal-header">
                      <slot name="header">
                          default header
                      </slot>
                      <div class="window-buttons">
                          <div class="window-expand-shrink" @click="expandShrink()">
                              <div class="fas fa-expand" title="Expand"></div>
                          </div>
                          <div class="window-minimize">
                              <div class="fas fa-minus-circle" title="Minimize"></div>
                          </div>
                          <div class="window-close">
                              <div class="fas fa-times-circle" title="Close" @click="$emit('close')"></div>
                          </div>
                      </div>
                  </div>
                  <div style="clear:both"></div>

                  <div class="modal-body">
                      <slot name="body">
                          default body
                      </slot>
                  </div>
                  <div class='resizer bottom-right fas fa-caret-right'></div>
              </div>
          </div>
      </div>
  </transition>
  `,
  methods: {
      initalizeFunctions: function () {
          makeDraggable("#" + this.$el.parentNode.id);
          makeResizableDiv("#" + this.$el.parentNode.id);
          checkColourSettings();
          focusWindow(this);
      },
      expandShrink: function () {
          expandShrinkWindow("#" + this.$el.parentNode.id);
      },
      putFocusOnCurrent: function () {
          focusWindow(this);
      },
      removeMinimizeIcon: function() {
          var topbarelement = this.$el.parentNode.id.split("-")[0]
          var currentIndex = document.getElementById(topbarelement + "id").getAttribute;
          currentIndex = Number(currentIndex);
          middleBarComponent.removeIcon(currentIndex);
      }
  }

});


// start about app
var aboutAppButton = new Vue({
    el: "#icon-about",
    data: {
        name: "about",
        css: "fas fa-info-circle",
        showMinimizeElement: false
    },
    methods: {
      showAboutWindow: function() {
          console.log("clicked " + aboutAppWindow.name);
          aboutAppWindow.showModal = true;
          // if(!this.showMinimizeElement) {
          //     this.toggleTopMiddleElement();
          //     this.showMinimizeElement = true;
          // }

      },
      toggleTopMiddleElement: function() {
          middleBarComponent.noOfWindows++;
          middleBarComponent.addIcon(this.name, this.css, middleBarComponent.noOfWindows);
      }
    }
});

var aboutAppWindow = new Vue ({
    el: "#about-modal",
    data: {
		name: "about",
        showModal: false
	}
});

// start settings app
var settingsAppButton = new Vue({
  el: "#icon-settings",
  data: {
      name: "settings",
      css: "fas fa-cog"
  },
  methods: {
    showAboutWindow: function() {
        console.log("clicked " + settingsAppWindow.name)
        settingsAppWindow.showModal = true;
        setTimeout(function(){ settingsAppWindow.checkColourInputs(); }, 10);

        // if(!this.showMinimizeElement) {
        //     this.toggleTopMiddleElement();
        //     this.showMinimizeElement = true;
        // }

    },
    toggleTopMiddleElement: function() {
        middleBarComponent.noOfWindows++;
        middleBarComponent.addIcon(this.name, this.css, middleBarComponent.noOfWindows);
    }
  }
});

var settingsAppWindow = new Vue ({
    el: "#settings-modal",
    data: {
		name: "Settings Window",
        showModal: false,
        showPictures: false,
        showColours: false,
        topBarCol: "",
        topBarFontCol: "",
        innerWindowCol: "",
        innerWindowFontCol: "",
        theme: "Default",
        font: "Courier New",
        background: ""
	},
    updated: function() {
        this.$nextTick(function () {
            document.getElementById("selected-theme").innerText = this.theme
            document.getElementById("selected-font").innerText = this.font
            document.getElementById("selected-background").style.background = this.background;
        })
    },
    methods: {

        toggleDropdown: function(div) {
            document.querySelector(div + " .options-view-button").checked = false;
        },
        toggleTheme: function() {
            var label = document.querySelector("#theme-selected-value span")
            var chs = document.querySelectorAll("#toggle-theme .option input");
            for(var i = 0; i < chs.length; i++) {
                if(chs[i].checked) {
                    var fontOption = chs[i].value + "";
                }
            }

            for(var j = 0; j < themes.length; j++) {
                if(fontOption === themes[j].name) {
                    this.topBarCol = themes[j].topBarColour;
                    this.topBarFontCol = themes[j].topBarFontColour;
                    this.innerWindowCol = themes[j].innerWindowColour;
                    this.innerWindowFontCol = themes[j].innerWindowFontColour;
                    document.getElementById("top-bar").style.backgroundColor = themes[j].topBarColour;
                    document.getElementById("top-bar").style.color = themes[j].topBarFontColour;
                    label.innerText = themes[j].name;
                    this.theme = themes[j].name;
                    document.getElementById("selected-theme").innerText = themes[j].name;
                    this.background = themes[j].background;
                    document.getElementById("workspace").style.background = themes[j].background;
                    document.getElementById("selected-background").style.background = themes[j].background;


                }
            }
            checkColourSettings();
            this.checkColourInputs();

        },

        toggleBackgroundStyle: function() {

            var chs = document.querySelectorAll("#toggle-background .option input");
            var label = document.querySelector("#background-selected-value span")
            for(var i = 0; i < chs.length; i++) {
                if(chs[i].checked) {
                    var backgroundOption = chs[i].value + "";
                }
            }
            switch(backgroundOption) {
                case "picture":
                    this.showPictures = true;
                    this.showColours = false;
                    label.innerText = "Picture"
                    break;
                case "solid":
                    this.showPictures = false;
                    this.showColours = true;
                    label.innerText = "Solid Colour"
                    break;
                default:
                    this.showPictures = false;
                    this.showColours = false;
                    label.innerText = "Change background"
            }
        },
        changeBackgroundPicture: function() {

            this.disableSelectedTheme();
        },
        togglePictureStyle: function() {
            this.disableSelectedTheme();
        },
        changeBackgroundColour: function() {
            var backgroundColor = document.querySelector("#colour-search .colour-search-picker input").value;
            this.background = backgroundColor;
            document.getElementById("workspace").style.background = backgroundColor;
            document.getElementById("selected-background").style.background = backgroundColor;
            this.disableSelectedTheme();
        },
        toggleFont: function() {
            var chs = document.querySelectorAll("#toggle-font .option input");
            var label = document.querySelector("#font-selected-value span")
            for(var i = 0; i < chs.length; i++) {
                if(chs[i].checked) {
                    var fontOption = chs[i].value + "";
                }
            }

            if(fontOption !== "" && typeof(fontOption) !== "undefined") {
                document.body.style.fontFamily = fontOption;
                this.font = fontOption;
                label.innerText = fontOption;
                document.getElementById("selected-font").innerText = fontOption;
            }
        },
        changeColourTopBar: function() {
            var colourTopBar = document.querySelector("#colour-topbar input").value;
            this.topBarCol = colourTopBar;
            document.getElementById("top-bar").style.backgroundColor = colourTopBar;
            checkColourSettings();
            this.disableSelectedTheme();
        },
        changeColourTopBarFont: function() {
            var colourTopBarFont = document.querySelector("#colour-topbar-font input").value;
            this.topBarFontCol = colourTopBarFont;
            document.getElementById("top-bar").style.color = colourTopBarFont;
            checkColourSettings();
            this.disableSelectedTheme();
        },
        changeColourInnerWindow: function() {
            var colourInnerWindow = document.querySelector("#colour-innerwindow input").value;
            this.innerWindowCol = colourInnerWindow;
            checkColourSettings();
            this.disableSelectedTheme();
        },
        changeColourInnerWindowFont: function() {
            var colourInnerWindowFont = document.querySelector("#colour-innerwindow-font input").value;
            this.innerWindowFontCol = colourInnerWindowFont;
            checkColourSettings();
            this.disableSelectedTheme();
        },
        disableSelectedTheme: function() {
            var radioButtons = document.querySelectorAll("#toggle-theme .options input");
            for(var i = 0; i < radioButtons.length; i++) {
                if(radioButtons[i].checked) {
                    radioButtons[i].checked = false;
                }
            }
            this.theme = "None";
            document.getElementById("selected-theme").innerText = this.theme;
            document.querySelector("#theme-selected-value span").innerText = "Change theme"
        },
        disableSelectedBackground: function() {
            var radioButtons = document.querySelectorAll("#toggle-background .options input");
            for(var i = 0; i < radioButtons.length; i++) {
                if(radioButtons[i].checked) {
                    radioButtons[i].checked = false;
                }
            }
            this.background = "";
            document.getElementById("selected-background").background = this.background;
            this.toggleBackgroundStyle()
        },
        checkColourInputs: function() {
            if(this.topBarCol !== "") {
                document.querySelector("#colour-topbar input").value = this.topBarCol
            } else {
                document.querySelector("#colour-topbar input").value = "#89bdd3"
            }

            if(this.topBarFontCol !== "") {
                document.querySelector("#colour-topbar-font input").value = this.topBarFontCol
            } else {
                document.querySelector("#colour-topbar-font input").value = "#ffffff"
            }

            if(this.innerWindowCol !== "") {
                document.querySelector("#colour-innerwindow input").value = this.innerWindowCol
            } else {
                document.querySelector("#colour-innerwindow input").value = "#ffffff"
            }

            if(this.innerWindowFontCol !== "") {
                document.querySelector("#colour-innerwindow-font input").value = this.innerWindowFontCol
            } else {
                document.querySelector("#colour-innerwindow-font input").value = "#000000"
            }
        }
    }
});

// start settings app
var settingsAppButton = new Vue({
  el: "#icon-settings",
  data: {
      name: "settings",
      css: "fas fa-cog",
      showMinimizeElement: false
  },
  methods: {
    showSettingsWindow: function() {
        console.log("clicked " + settingsAppWindow.name)
        settingsAppWindow.showModal = true;

        if(!this.showMinimizeElement) {
            this.toggleTopMiddleElement();
            this.showMinimizeElement = true;
        }

    },
    toggleTopMiddleElement: function() {
        middleBarComponent.noOfWindows++;
        middleBarComponent.addIcon(this.name, this.css);
    }
  }
});

var settingsAppButtonMobile = new Vue({
  el: "#dropdown-icon-settings",
  data: {
      name: "settings",
      css: "fas fa-cog",
      showMinimizeElement: false
  },
  methods: {
    showSettingsWindow: function() {
        console.log("clicked " + settingsAppWindow.name)
        settingsAppWindow.showModal = true;

        if(!this.showMinimizeElement) {
            this.toggleTopMiddleElement();
            this.showMinimizeElement = true;
        }

    },
    toggleTopMiddleElement: function() {
        middleBarComponent.noOfWindows++;
        middleBarComponent.addIcon(this.name, this.css);
    }
  }
});

var settingsAppContext = new Vue({
  el: "#context-settings",
  data: {
      name: "settings",
      css: "fas fa-cog",
      showMinimizeElement: false
  },
  methods: {
    showSettingsWindow: function() {
        document.getElementById("context-menu").style.display = "none"
        console.log("clicked " + settingsAppWindow.name)
        settingsAppWindow.showModal = true;

        if(!this.showMinimizeElement) {
            this.toggleTopMiddleElement();
            this.showMinimizeElement = true;
        }

    },
    toggleTopMiddleElement: function() {
        middleBarComponent.noOfWindows++;
        middleBarComponent.addIcon(this.name, this.css);
    }
  }
});

var settingsAppWindow = new Vue ({
    el: "#settings-modal",
    data: {
		name: "settings",
        showModal: false,
        showPictures: false,
        showColours: false,
        topBarCol: "#89bdd3",
        topBarFontCol: "#ffffff",
        innerWindowCol: "#ffffff",
        innerWindowFontCol: "#000000",
        theme: "Default",
        font: "Courier New",
        background: "",
        hover: "#9ad3de",
        hoverContext: "#9ad3de"
	},
    updated: function() {
        this.$nextTick(function () {
            document.getElementById("selected-theme").innerText = this.theme
            document.getElementById("selected-font").innerText = this.font
            document.getElementById("selected-background").style.background = this.background;
            this.checkColourInputs();
            changeHover();
            changeContextMenuHover();
            changeOptionColour();
            changeOptionHover();

        })
    },
    methods: {
        removeSettingsIcon: function() {
            var currentIndex = document.getElementById("settings-id").getAttribute("index");
            currentIndex = parseInt(currentIndex);
            middleBarComponent.removeIcon(currentIndex);
            settingsAppButton.showMinimizeElement = false;
            settingsAppContext.showMinimizeElement = false;
            settingsAppButtonMobile.showMinimizeElement = false;
        },
        toggleDropdown: function(div) {
            document.querySelector(div + " .options-view-button").checked = false;
            changeHover();
            changeOptionColour();
            changeOptionHover();
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
                    document.getElementById("apps-dropdown").style.backgroundColor = themes[j].innerWindowColour;
                    document.getElementById("apps-dropdown").style.color = themes[j].innerWindowFontColour;
                    document.getElementById("mobile-dropdown-items").style.backgroundColor = themes[j].innerWindowColour;
                    document.getElementById("mobile-dropdown-items").style.color = themes[j].innerWindowFontColour;
                    label.innerText = themes[j].name;
                    this.theme = themes[j].name;
                    document.getElementById("selected-theme").innerText = themes[j].name;
                    this.background = themes[j].background;
                    document.getElementById("workspace").style.background = themes[j].background;
                    document.getElementById("selected-background").style.background = themes[j].background;
                    if(this.theme === "Light") {
                        this.hover = "#cccccc";
                        this.hoverContext = "#cccccc";
                    } else if (this.theme === "Default") {
                        this.hover = "#9ad3de";
                        this.hoverContext = "#9ad3de";
                    } else {
                        this.hover = "" + changeColorLuminance(this.topBarCol, 0.9)
                        this.hoverContext = "" + changeColorLuminance(this.topBarCol, 0.9)
                    }

                }
            }



            checkColourSettings();
            this.checkColourInputs();
            changeHover();
            changeContextMenuHover();
            changeOptionColour();
            changeOptionHover();
            changeHighlightedColour();
            changeMiddleBarColour();

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
                    setTimeout(function() {
                        if(document.getElementById("error-picture")) {
                            document.getElementById("error-picture").style.display = "none"
                        }
                    },10)
                    break;
                case "solid":
                    this.showColours = true;
                    this.showPictures = false;
                    label.innerText = "Solid Colour"
                    setTimeout(function() {
                        if(document.querySelector("#colour-search .colour-search-picker")) {
                            document.querySelector("#colour-search .colour-search-picker").style.display = "inline-block"
                        }
                    },10)
                    break;
                default:
                    this.showPictures = false;
                    this.showColours = false;
                    label.innerText = "Change background"
            }
        },
        changeBackgroundPicture: function() {
            var urlValue = document.getElementById("change-picture").value;
            if(checkURL(urlValue)) {
                document.getElementById("error-picture").style.display = "none"
                this.background = "url(" + urlValue + ")"
                document.getElementById("workspace").style.backgroundImage = this.background
                document.getElementById("selected-background").style.backgroundImage = this.background;
                this.disableSelectedTheme();
            } else {
                document.getElementById("error-picture").style.display = "block"
            }
        },
        togglePictureStyle: function() {
            this.disableSelectedTheme();
        },
        changeBackgroundColour: function() {
            var backgroundColor = document.querySelector("#colour-search .colour-search-picker input").value;
            this.background = backgroundColor;
            document.getElementById("workspace").style.backgroundImage = "none";
            document.getElementById("selected-background").style.backgroundImage = "none";
            document.getElementById("workspace").style.backgroundColor = backgroundColor;
            document.getElementById("selected-background").style.backgroundColor = backgroundColor;
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
            this.hover = "" + changeColorLuminance(colourTopBar, 0.9)
            document.getElementById("top-bar").style.backgroundColor = colourTopBar;
            checkColourSettings();
            changeOptionColour();
            changeOptionHover();
            this.disableSelectedTheme();
            changeHighlightedColour();
            changeMiddleBarColour();
            //changeMiddleElementHover();
        },
        changeColourTopBarFont: function() {
            var colourTopBarFont = document.querySelector("#colour-topbar-font input").value;
            this.topBarFontCol = colourTopBarFont;
            document.getElementById("top-bar").style.color = colourTopBarFont;
            checkColourSettings();
            this.disableSelectedTheme();
            changeMiddleBarColour();
        },
        changeColourInnerWindow: function() {
            var colourInnerWindow = document.querySelector("#colour-innerwindow input").value;
            this.hoverContext = "" + changeColorLuminance(colourInnerWindow, 0.7)
            this.innerWindowCol = colourInnerWindow;
            document.getElementById("apps-dropdown").style.backgroundColor = colourInnerWindow;
            document.getElementById("mobile-dropdown-items").style.backgroundColor = colourInnerWindow;
            checkColourSettings();
            this.disableSelectedTheme();
            changeContextMenuHover();
        },
        changeColourInnerWindowFont: function() {
            var colourInnerWindowFont = document.querySelector("#colour-innerwindow-font input").value;
            this.innerWindowFontCol = colourInnerWindowFont;
            document.getElementById("apps-dropdown").style.color = colourInnerWindowFont;
            document.getElementById("mobile-dropdown-items").style.color = colourInnerWindowFont;
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
            document.getElementById("selected-background").backgroundImage = this.background;
            document.getElementById("selected-background").backgroundColor = this.background;
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

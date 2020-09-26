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

var aboutAppButtonMobile = new Vue({
    el: "#dropdown-icon-about",
    data: {
        name: "about",
        css: "fas fa-info-circle",
        showMinimizeElement: false
    },
    methods: {
      showAboutWindow: function() {
          console.log("clicked " + aboutAppWindow.name);
          aboutAppWindow.showModal = true;
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

var aboutAppWindow = new Vue ({
    el: "#about-modal",
    data: {
		name: "about",
        showModal: false
	},
    methods: {
        removeAboutIcon: function() {
            var currentIndex = document.getElementById("about-id").getAttribute("index");
            currentIndex = parseInt(currentIndex);
            middleBarComponent.removeIcon(currentIndex);
            aboutAppButton.showMinimizeElement = false;
            aboutAppButtonMobile.showMinimizeElement = false;
        }
    }
});

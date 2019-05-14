//start search app
var searchAppButton = new Vue({
    el: "#icon-search",
    data: {
        name: "search",
        css: "fas fa-search",
        showMinimizeElement: false
    },
    methods: {
      showSearchWindow: function() {
          console.log("clicked " + searchAppWindow.name);
          searchAppWindow.showModal = true;
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

var searchAppButtonMobile = new Vue({
    el: "#dropdown-icon-search",
    data: {
        name: "search",
        css: "fas fa-search",
        showMinimizeElement: false
    },
    methods: {
      showSearchWindow: function() {
          console.log("clicked " + searchAppWindow.name);
          searchAppWindow.showModal = true;
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


var searchAppContext = new Vue({
  el: "#context-search",
  data: {
      name: "search",
      css: "fas fa-search",
      showMinimizeElement: false
  },
  methods: {
    showSearchWindow: function() {
        document.getElementById("context-menu").style.display = "none"
        console.log("clicked " + searchAppWindow.name)
        searchAppWindow.showModal = true;

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

var searchAppWindow = new Vue ({
    el: "#search-modal",
    data: {
		name: "search",
        showModal: false
	},
    methods: {
        removeSearchIcon: function() {
            var currentIndex = document.getElementById("search-id").getAttribute("index");
            currentIndex = parseInt(currentIndex);
            middleBarComponent.removeIcon(currentIndex);
            searchAppButton.showMinimizeElement = false;
            searchAppContext.showMinimizeElement = false;
            searchAppButtonMobile.showMinimizeElement = false;
        },
        keymonitor: function(event) {
            var searchValue = document.getElementById("search-text").value;
            if(event.key == "Enter" && searchValue !== "") {
               window.open("http://google.com/search?q=" + searchValue, "_blank");
            }
        },
        searchContent: function() {
            var searchValue = document.getElementById("search-text").value;
            if(searchValue !== "") {
                window.open("http://google.com/search?q=" + searchValue, '_blank');
            }
        }
    }
});

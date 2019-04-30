// register modal component
var topBarComponent = Vue.component("bar-component", {
    props: ["elementid","css"],
    template:`
    <div v-bind:id="elementid" class="top-bar-element highlighted" @click="putFocusOnIcon()">
      <i v-bind:class="css"></i>
    </div>
    `,
    methods: {
      showMinimize: function() {
          console.log("highlighted")
      },
      putFocusOnIcon: function() {
          middleBarComponent.toggleHighlighted();
          var currentIcon = document.getElementById(this.$el.id + "");

          if(!currentIcon.classList.contains("highlighted")) {
              currentIcon.classList.add("highlighted");
              //currentIcon.classList.remove("hover-middle-element");
              currentIcon.style.background = settingsAppWindow.hover;
          }
          var topbarelement = this.$el.id.split("-")[0]
          var currentWindow = topbarelement + "-modal"

          console.log(currentWindow)
          var allOpenWindows = document.querySelectorAll(".modal-wrapper")
          for (var count = 0; count < allOpenWindows.length; count++) {
              allOpenWindows[count].style.zIndex = 1;
          }
          document.querySelector("#" + currentWindow + " .modal-wrapper").style.zIndex = 100
      }
    }
});



var middleBarComponent = new Vue({
    el: "#middle-top",
    data: {
        noOfWindows: -1,
        icons: []
    },
    methods: {
        addIcon: function (name, css) {
            this.toggleHighlighted();
            this.icons.push({
                name: name,
                css: css,
                elementid: name + "-id"
            })
        },
        removeIcon: function(index) {
            this.noOfWindows--;
            this.icons.splice(index, 1);
        },
        toggleHighlighted: function() {
            var elements = document.querySelectorAll("#middle-top .top-bar-element");
            for(var i = 0; i < elements.length; i++) {
                if(elements[i].classList.contains("highlighted")) {
                    elements[i].classList.remove("highlighted")
                    elements[i].style.background = "";
                    //elements[i].classList.add("hover-middle-element");
                }
            }
        }
    }
})

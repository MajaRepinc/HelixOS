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
                          <div class="window-minimize" @click="minimizeWindow()">
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
          var id = "#" + this.$el.parentNode.id
          window.onresize = function() {
              if(window.mobilecheck()) {
                  onMobileWindowModal(id);
              }
          }
          if(window.mobilecheck()) {
              console.log("on mobile")
              onMobileWindowModal("#" + this.$el.parentNode.id)
          } else {
              makeDraggable("#" + this.$el.parentNode.id);
              makeResizableDiv("#" + this.$el.parentNode.id);
          }
          changeHover();
          checkColourSettings();
          this.putFocusOnCurrent();
          changeHighlightedColour();
          changeMiddleBarColour();
          //changeMiddleElementHover();

      },
      minimizeWindow: function() {
          document.getElementById(this.$el.parentNode.id).style.display = "none";
          var currentWindow = this.$el.parentNode.id.split("-")[0]
          var topBarElement = document.getElementById(currentWindow + "-id");
          if(topBarElement.classList.contains("highlighted")) {
              topBarElement.classList.remove("highlighted");
              topBarElement.style.background = "";
          }
      },
      expandShrink: function () {
          expandShrinkWindow("#" + this.$el.parentNode.id);
      },
      putFocusOnCurrent: function () {
          focusWindow(this);
          middleBarComponent.toggleHighlighted();
          var currentWindow = this.$el.parentNode.id.split("-")[0]
          var topBarElement = document.getElementById(currentWindow + "-id");
          if(!topBarElement.classList.contains("highlighted")) {
              topBarElement.classList.add("highlighted");
              //topBarElement.classList.remove("hover-middle-element");
              topBarElement.style.background = settingsAppWindow.hover;
          }
          changeHighlightedColour();
      }
    }

});

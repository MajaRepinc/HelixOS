// register modal component
var windowModalComponent = Vue.component("modal", {
  template:`
  <transition name="modal" @after-enter="draggableResizable();">
      <div class="modal-wrapper">
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
      draggableResizable: function () {
          funDraggable("#" + this.$el.parentNode.id + " .modal-wrapper");
          makeResizableDiv("#" + this.$el.parentNode.id);
      },
      expandShrink: function () {
          expandShrinkWindow("#" + this.$el.parentNode.id);
      }
  }

});


// start about app
var aboutAppButton = new Vue({
    el: "#icon-about",
    methods: {
      showAboutWindow: function() {
          console.log("clicked " + aboutAppWindow.name);
          aboutAppWindow.showModal = true;
      }
    }
});

var aboutAppWindow = new Vue ({
    el: "#about-modal",
    data: {
		name: "About Window",
        showModal: false
	}
});

// start settings app
var settingsAppButton = new Vue({
  el: "#icon-settings",
  methods: {
    showAboutWindow: function() {
        console.log("clicked " + settingsAppWindow.name)
        settingsAppWindow.showModal = true;
    }
  }
});

var settingsAppWindow = new Vue ({
    el: "#settings-modal",
    data: {
		name: "Settings Window",
        showModal: false
	}
});

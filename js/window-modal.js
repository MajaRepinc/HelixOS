// register modal component
Vue.component("modal", {
  template: "#window-modal-template",
  props: ['el'],
  methods: {
      draggableResizable: function () {
          funDraggable("#" + this.$el.parentNode.id + " .modal-wrapper");
          makeResizableDiv("#" + this.$el.parentNode.id);
      },
      expandShrink: function () {
          expandShrinkWindow("#" + this.$el.parentNode.id);
      }
  }

})

// start app
var about = new Vue({
  el: "#icon-about",
  data: {
    showModal: false,
    expand: false
  }
})

// start app
var settings = new Vue({
  el: "#icon-settings",
  data: {
    showModal: false,
    expand: false
  }
})

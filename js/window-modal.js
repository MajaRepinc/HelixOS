// register modal component
var clickedElement;
document.getElementById("left-top").addEventListener('click', function (event) {
  // Log the clicked element in the console
  clickedElement = "#" + event.target.parentNode.id;
}, false);

Vue.component('modal', {
  template: '#window-modal-template',
  methods: {
      draggable: function () {
          new Draggable(clickedElement + ' .modal-wrapper');
      }
  }

})

// start app
var about = new Vue({
  el: '#icon-about',
  data: {
    showModal: false
  }
})

// start app
var settings = new Vue({
  el: '#icon-settings',
  data: {
    showModal: false
  }
})

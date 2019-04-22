var topBarComponent = Vue.component("bar-component", {
    props: ["elementid","css"],
    template:`
    <div v-bind:id="elementid" class="top-bar-element" @click="showMinimize()">
      <i v-bind:class="css"></i>
    </div>
    `,
    methods: {
      showMinimize: function() {
          console.log("clicked")
      }
    }
});



var middleBarComponent = new Vue({
    el: "#middle-top",
    data: {
        icons: []
    },
    methods: {
        addIcon: function (name, css, index) {
            this.icons.push({
                name: name,
                css: css,
                elementid: name + "Id",
                index: index
            })
        },
        removeIcon: function(index) {
            //this.icons.splice(index, 1)
            console.log("clicked")
        }
    }
})

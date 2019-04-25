var topBarComponent = Vue.component("bar-component", {
    props: ["elementid","css"],
    template:`
    <div v-bind:id="elementid" class="top-bar-element highlighted" @click="showMinimize">
      <i v-bind:class="css"></i>
    </div>
    `,
    methods: {
      showMinimize: function() {
          console.log("highlighted")
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
        addIcon: function (name, css, index) {
            this.icons.push({
                name: name,
                css: css,
                elementid: name + "id",
                index: index
            })
        },
        removeIcon: function(index) {
            this.icons.splice(index, 1);
            this.noOfWindows--;
        }
    }
})

//start calculator app
var calculatorAppButton = new Vue({
    el: "#icon-calculator",
    data: {
        name: "calculator",
        css: "fas fa-calculator",
        showMinimizeElement: false
    },
    methods: {
        showCalculatorWindow: function() {
            console.log("clicked " + calculatorAppWindow.name)
            calculatorAppWindow.showModal = true;

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

var calculatorAppButtonMobile = new Vue({
    el: "#dropdown-icon-calculator",
    data: {
        name: "calculator",
        css: "fas fa-calculator",
        showMinimizeElement: false
    },
    methods: {
        showCalculatorWindow: function() {
            console.log("clicked " + calculatorAppWindow.name)
            calculatorAppWindow.showModal = true;

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

var calculatorAppContext = new Vue({
  el: "#context-calculator",
  data: {
      name: "calculator",
      css: "fas fa-calculator",
      showMinimizeElement: false
  },
  methods: {
    showCalculatorWindow: function() {
        document.getElementById("context-menu").style.display = "none"
        console.log("clicked " + calculatorAppWindow.name)
        calculatorAppWindow.showModal = true;

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

var calculatorAppWindow = new Vue({
    el: "#calculator-modal",
    data: {
		name: "calculator",
        showModal: false,
        state: {
            previouslyClicked: "num",
            current: "",
            toEval: ""
        }
	},
    methods: {
        removeCalculatorIcon: function() {
            var currentIndex = document.getElementById("calculator-id").getAttribute("index");
            currentIndex = parseInt(currentIndex);
            middleBarComponent.removeIcon(currentIndex);
            calculatorAppButton.showMinimizeElement = false;
            calculatorAppContext.showMinimizeElement = false;
            calculatorAppButtonMobile.showMinimizeElement = false;
        },
        handleClick: function(val) {
            const className = (val.target || val.srcElement).getAttribute('class');
            const value = (val.target || val.srcElement).getAttribute('value');
            const current = this.state.current;
            const toEval = this.state.toEval;
            const previouslyClicked = this.state.previouslyClicked;
            if (className === "num") {
                if (value === "0" && current === "0") {
                    return;
                } else if (previouslyClicked === "operator") {
                    this.state.current = value;
                    this.state.toEval = toEval + value;
                    this.state.previouslyClicked = className;
                } else if (previouslyClicked === "equals") {
                    this.state.current = value;
                    this.state.toEval = value;
                    this.state.previouslyClicked = className;
                }
                else if (current === "0" && className === "num" && toEval.length === 1) {
                    this.state.current = value;
                    this.state.toEval = value;
                    this.state.previouslyClicked = className;
                } else {
                    this.state.current = current + value;
                    this.state.toEval = toEval + value;
                    this.state.previouslyClicked = className;
                }
            }
            // Handle decimal
            if (className === "decimal") {
                if (previouslyClicked === "equals") {
                    this.state.previouslyClicked = className;
                    this.state.current =  value;
                    this.state.toEval = value;
                } else if (previouslyClicked !== "num" || /[.]/.test(current)) {
                    return;
                } else {
                    this.state.previouslyClicked = className;
                    this.state.current = current + value;
                    this.state.toEval = toEval + value;
                }
            }
            // Handle Operators
            if (className === "operator") {
                if (previouslyClicked === "operator") {
                    this.state.toEval = toEval.substring(0, toEval.length - 1) + value;
                    this.state.current = value;
                } else if (previouslyClicked === "equals") {
                    this.state.toEval = current + value;
                    this.state.current =  value;
                    this.state.previouslyClicked = className;
                } else {
                    this.state.previouslyClicked = className;
                    this.state.current = value;
                    this.state.toEval = toEval + value;
                }

            }
            // Handle  Equals
            if (className === "equals") {
                let expression = toEval;
                if (previouslyClicked === "equals") {
                    return;
                } else if (previouslyClicked === "operator") {
                    expression = expression.substring(0, toEval.length - 1);
                } else {
                    // eslint-disable-next-line no-eval
                    const result = eval(expression.replace(/x/g, "*").replace(/÷/g, "/"));
                    this.state.current = result;
                    this.state.toEval = expression + value + result;
                    this.state.previouslyClicked = className;
                }
            }
            // Handle Clear
            if (className === "clear") {
                this.state.previouslyClicked =  "num";
                this.state.current = "";
                this.state.toEval = "";
            }
        }
    }
});

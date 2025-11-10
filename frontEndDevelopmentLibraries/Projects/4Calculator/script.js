(function(){
    const isOperator = /[x/+-]/;
    const endsWithOperator = /[x+-/]$/;
    const endsWithNegativeSign = /\d[x/+-]{1}-$/;

    class Buttons extends React.Component {
        render() {
            return React.createElement("div", {id:"buttons"}, 
                React.createElement("button", {id:"clear", onClick:this.props.clear, value:"AC"},"AC"),
                React.createElement("button", {id:"divide", className:"operator", onClick:this.props.operators, value:"/"},"/"),
                                       
                React.createElement("button", {id:"seven", className:"number",  onClick:this.props.numbers, value:"7"},"7"),
                React.createElement("button", {id:"eight", className:"number", onClick:this.props.numbers, value:"8"},"8"),
                React.createElement("button", {id:"nine", className:"number", onClick:this.props.numbers, value:"9"},"9"),
                React.createElement("button", {id:"multiply", className:"operator", onClick:this.props.operators, value:"x"},"x"),
                                       
                React.createElement("button", {id:"four", className:"number", onClick:this.props.numbers, value:"4"},"4"),
                React.createElement("button", {id:"five", className:"number", onClick:this.props.numbers, value:"5"},"5"),
                React.createElement("button", {id:"six", className:"number", onClick:this.props.numbers, value:"6"},"6"),
                React.createElement("button", {id:"subtract", className:"operator", onClick:this.props.operators, value:"-"},"-"),
                                       
                React.createElement("button", {id:"one", className:"number", onClick:this.props.numbers, value:"1"},"1"),
                React.createElement("button", {id:"two", className:"number", onClick:this.props.numbers, value:"2"},"2"),
                React.createElement("button", {id:"three", className:"number", onClick:this.props.numbers, value:"3"},"3"),
                React.createElement("button", {id:"add", className:"operator", onClick:this.props.operators, value:"+"},"+"),
               
                React.createElement("button", {id:"zero", className:"number", onClick:this.props.numbers, value:"0"},"0"),
                React.createElement("button", {id:"decimal", onClick:this.props.decimal, value:"."},"."),
                React.createElement("button", {id:"equals", onClick:this.props.evaluate, value:"="},"="),
            );
        }
    };
    class Output extends React.Component{
        render(){
            return React.createElement("div", {
                className:"output", id:"display"
            }, this.props.curVal)
        }
    }
    class Formula extends React.Component{
        render(){
            return React.createElement("div", {
                className:"formula"
            }, this.props.formula)
        }
    }
    class Calculator extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                curVal: "0",
                prevVal: "0",
                formula:"",
                curSign: "pos",
                lastClicked: ""
            },
            //this.maxDigitWarning = this.maxDigitWarning.bind(this)
            this.handleEvaluate = this.handleEvaluate.bind(this),
            this.handleOperators = this.handleOperators.bind(this),
            this.handleNumbers = this.handleNumbers.bind(this),
            this.handleDecimal = this.handleDecimal.bind(this),
            this.clear = this.clear.bind(this)
        }

        handleEvaluate(){
            let expression = this.state.formula;
            while(endsWithOperator.test(expression)){
                expression = expression.slice(0, -1);
            }
                expression = expression.replace(/x/g, "*").replace(/-/g, "-").replace("--", "-");
                let answer = Math.round(1e12 * eval(expression)) / 1e12;
                this.setState({
                    curVal: answer.toString(),
                    formula: expression.replace(/\*/g, "⋅").replace(/-/g, "-").replace(/(x|\/|\+)-/, "$1-").replace(/^-/, "-") + "=" + answer,
                    prevVal: answer,
                    evaluated: true
                })
        } 
        handleOperators(op) {
            const t = op.target.value;
            const {formula:a, prevVal:r, evaluated:s} = this.state;
            this.setState({curVal: t,evaluated: false});
            if(s){
                this.setState({formula: r+t});
            }else if(endsWithOperator.test(a)){
                if (endsWithNegativeSign.test(a) && t!=="-") {
                    this.setState({formula: r + t});
                }else{
                    this.setState({formula: (endsWithNegativeSign.test(a + t) ? a : r) + t});
                }
            }else{
                this.setState({prevVal: a, formula: a + t});
            } 
        }
        
        handleNumbers(num){
            const s = num.target.value;
            const {curVal: t, formula: a, evaluated: r} = this.state
            this.setState({evaluated: false})
            if(r){
                this.setState({curVal: s, formula: "0" !== s ? s : ""});
            }else{
                this.setState({
                    curVal: "0" === t || isOperator.test(t) ? s : t + s,
                    formula: "0" === t && "0" === s ? "" === a ? s : a : /([^.0-9]0|^0)$/.test(a) ? a.slice(0, -1) + s : a + s
                });
            }

        }
        handleDecimal(){
            if(this.state.evaluated){
                this.setState({curVal: "0.", formula: "0.", evaluated: false})
            }else{
                if(!this.state.curVal.includes(".")){
                    this.setState({evaluated:false});
                    if(endsWithOperator.test(this.state.formula) || "0" === this.state.curVal && "" === this.state.formula){
                        this.setState({curVal: "0.", formula: this.state.formula + "0."})
                    }else{
                        this.setState({
                            curVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
                            formula: this.state.formula + "."})
                    }
                }
            }
        }
        clear(){
            this.setState({
                curVal: "0",
                prevVal: "0",
                formula: "",
                curSign: "pos",
                lastClicked: "",
                evaluated: false
            })
        }
        render(){
            return React.createElement("div", {className: "calculator"}, 
                React.createElement(Formula, {formula: this.state.formula.replace(/x/g, "⋅")}), 
                React.createElement(Output, {curVal: this.state.curVal}), 
                React.createElement(Buttons, {
                    decimal: this.handleDecimal,
                    evaluate: this.handleEvaluate,
                    clear: this.clear,
                    numbers: this.handleNumbers,
                    operators: this.handleOperators
                })
            )
        }
    }
    ReactDOM.render(<Calculator />, document.getElementById('container'));
})();

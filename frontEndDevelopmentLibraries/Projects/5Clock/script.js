const audio = document.getElementById("beep");

class Timer extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        const id=this.props.title.toLowerCase();
        return (
            <div class="timer"> 
                <div id={`${id}-label`} class="label">{this.props.title} Length</div>
                <div id="timer-functions">
                    <button id={`${id}-decrement`} onClick={this.props.handleDecrement}>&#8593;</button>
                    <span id={`${id}-length`}>{this.props.count}</span>
                    <button id={`${id}-increment`} onClick={this.props.handleIncrement}>&#8595;</button>
                </div>
            </div>
        );
    };
}


class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: "Session",
            isPlaying: false
        },
        this.handleStartStop = this.handleStartStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
        this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
        this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
        this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
        this.loop = undefined;
    };

    convertTime(t){
        let mins = Math.floor(t/60);
        let secs = t%60
        if(mins<10){mins="0"+mins;}
        if(secs<10){secs="0"+secs;}
        return `${mins}:${secs}`
    };

    handleStartStop(){
        const {isPlaying} = this.state;
        if(isPlaying){
            clearInterval(this.loop)
            this.setState({isPlaying:false});
        }else{
            this.setState({isPlaying:true});
            this.loop = setInterval(()=>{
                const {clockCount, currentTimer, breakCount, sessionCount} = this.state;
                if(clockCount===0){
                    if(currentTimer==="Session"){this.setState({currentTimer:"Break", clockCount:breakCount*60});}
                    else{this.setState({currentTimer:"Session", clockCount:sessionCount*60});}
                    audio.play();
                }else{
                    this.setState({clockCount:clockCount-1});
                }                
            },1000)
        }
    };

    handleReset(){
        this.setState({
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: "Session",
            isPlaying: false
        });
        clearInterval(this.loop);
        audio.pause();
        audio.currentTime = 0;
    };

    handleBreakDecrement(){
        const {breakCount, isPlaying, currentTimer} = this.state;
        if(breakCount>1){
            if(!isPlaying && currentTimer==="Break"){
                this.setState({breakCount:breakCount-1, clockCount:(breakCount-1)*60});
            }else{
                this.setState({breakCount:breakCount-1});
            }
        }
    };

    handleBreakIncrement(){
        const {breakCount, isPlaying, currentTimer} = this.state;
        if(breakCount<60){
            if(!isPlaying && currentTimer==="Break"){
                this.setState({breakCount:breakCount+1, clockCount:(breakCount+1)*60});
            }else{
                this.setState({breakCount:breakCount+1});
            }
        }
    };

    handleSessionDecrement(){
        const {sessionCount, isPlaying, currentTimer} = this.state;
        if(sessionCount>1){
            if(!isPlaying && currentTimer==="Session"){
                this.setState({sessionCount:sessionCount-1, clockCount:(sessionCount-1)*60});
            }else{
                this.setState({sessionCount:sessionCount-1});
            }
        }
    };

    handleSessionIncrement(){
        const {sessionCount, isPlaying, currentTimer} = this.state;
        if(sessionCount<60){
            if(!isPlaying && currentTimer==="Session"){
                this.setState({sessionCount:sessionCount+1, clockCount:(sessionCount+1)*60});
            }else{
                this.setState({sessionCount:sessionCount+1});
            }
        }
        
    };

    render(){
        const breakProps = {
            title:"Break",
            count: this.state.breakCount,
            handleDecrement: this.handleBreakDecrement,
            handleIncrement: this.handleBreakIncrement,
        }
        const sessionProps = {
            title:"Session",
            count: this.state.sessionCount,
            handleDecrement: this.handleSessionDecrement,
            handleIncrement: this.handleSessionIncrement, 
        }
        return(
            <div class="container">
                <div class="timers">
                <Timer {...breakProps} />
                <Timer {...sessionProps} />
                </div>
                <div class="clock">
                    <div id="timer-label">{this.state.currentTimer}</div>
                    <div id="time-left">{this.convertTime(this.state.clockCount)}</div>
                    <span class="clock-buttons">
                    <button id="start_stop" onClick={this.handleStartStop}>Start/Stop</button>
                    <button id="reset" onClick={this.handleReset}>Reset</button>
                    </span>
                </div>
            </div>
        );
    };
}




ReactDOM.render(<App />, document.getElementById("app"))
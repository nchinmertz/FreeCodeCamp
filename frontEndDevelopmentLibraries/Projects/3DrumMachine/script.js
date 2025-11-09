const audioClips = [
  {keycode:67, keyTrigger:"Q", id:"Heater 1", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"},
  {keycode:67, keyTrigger:"W", id:"Heater 2", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"},
  {keycode:67, keyTrigger:"E", id:"Heater 3", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"},
  {keycode:67, keyTrigger:"A", id:"Heater 4", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"},
  {keycode:67, keyTrigger:"S", id:"Clap", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"},
  {keycode:67, keyTrigger:"D", id:"Open-HH", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"},
  {keycode:67, keyTrigger:"Z", id:"Kick-n'-Hat", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"},
  {keycode:67, keyTrigger:"X", id:"Kick", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"},
  {keycode:67, keyTrigger:"C", id:"Closed-HH", url:"https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"}
];


class Drum extends React.Component{
  constructor(props){
    super(props);
  };
  render(){ return (
    <div id="drum-machine">
      {audioClips.map(clip=><Button info={clip}/>) }
      <p id="display"></p>
    </div>)
  };
}
class Button extends React.Component{
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  };
  playSound(){
    const audioTag=document.getElementById(this.props.info.keyTrigger);
    audioTag.currentTime = 0;
    audioTag.play();
    const display = document.getElementById("display");
    display.innerText = this.props.info.id;
  };
  render(){return(
    <button className="drum-pad" id={this.props.info.id} onClick={this.playSound}>
      <audio class="clip" id={this.props.info.keyTrigger} src={this.props.info.url}></audio>
      {this.props.info.keyTrigger}
    </button>
  )};
}
          
ReactDOM.render(<Drum />, document.getElementById('container'));
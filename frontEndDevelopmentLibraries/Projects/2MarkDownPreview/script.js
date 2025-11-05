class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "# Welcome to my React Markdown Previewer!\n## This is a sub-heading\nHeres some code, `<div></div>`, between 2 backticks.\n```\n// this is multi-line code:\nfor(int i=0; i<6;i++){\n   console.log(i);\n  }\n}\n```\n\nYou can also make text **bold**\n\nCreate [links](https://www.freecodecamp.org)\n\nMake\n > Block Quotes!\n\nThere are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\nThere are also images like\n\n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n"
    }
    this.changeContent = this.changeContent.bind(this);
  }
  changeContent(event) {
    this.setState({input: event.target.value});
  }
  render() {
    return (
      <div>
      <textarea id="editor" onChange={this.changeContent} value={this.state.input}></textarea>
        <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.input) }}></div>
        </div>
    );
  }
};

ReactDOM.render(<Markdown />, document.getElementById('container'));

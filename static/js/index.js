marked.setOptions({
    breaks: true
  });
  
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        markdown: placeholder,
        editorMax: false,
        previewerMax: false,
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleEditorMaximized = this.handleEditorMaximized.bind(this);
      this.handlePreviewerMaximized = this.handlePreviewerMaximized.bind(this);
      this.normal = ['editor-container', 'previewer-container', 'fa fa-arrows-alt'];
      this.editorMax = ['editor-container maximized', 'previewer-container hide', 'fa fa-compress'];
      this.previewerMax = ['editor-container hide', 'previewer-container maximized', 'fa fa-compress'];
    }
    handleChange (event) {
      this.setState({
        markdown: event.target.value
      });
    }
    handleEditorMaximized () {
      this.setState({
        editorMax: !this.state.editorMax
      })
    }
    handlePreviewerMaximized () {
      this.setState({
        previewerMax: !this.state.previewerMax
      })
    }
    render () {
      const classes = this.state.editorMax ? this.editorMax : this.state.previewerMax ? this.previewerMax : this.normal;
      return (
       <div>
        <h1 className="heading">Markdown Previewer</h1>
        <div id="app-container">
          {/*<h1 className="heading">React Markdow Previewer</h1>*/}
          <div className={classes[0]}>
            <Toolbar text="Editor" icon={classes[2]} onClick={this.handleEditorMaximized}/>
            <Editor markdown={this.state.markdown} onChange={this.handleChange}/>
          </div>
          
          <div className={classes[1]}>
            <Toolbar text="Previewer" icon={classes[2]} onClick={this.handlePreviewerMaximized}/>
            <Previewer markdown={this.state.markdown} />
          </div>
        </div>
       </div>
      )
    } 
  }
  
  function Editor (props) {
    return (
      <div className="textarea-container">
        <textarea id="editor" onChange={props.onChange} type="text" value={props.markdown}></textarea>
      </div>
    )
  }
  
  function Previewer (props) {
    // console.log(marked(props.markdown))
    return (
      <div className="preview-container">
      <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.markdown)}}>
        {/* <p>{props.markdown}</p> */}      
      </div>
      </div>
    )
  }
  
  const Toolbar = (props) => {
    return (
      <div className="toolbar">
        {props.text}
        <i className={props.icon} aria-hidden="true" onClick={props.onClick}></i>
      </div>
    )
  }
  
  const placeholder = `# Welcome to my React Markdown Previewer!
  
  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
     - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `;
  ReactDOM.render(<App />, document.getElementById('root'));

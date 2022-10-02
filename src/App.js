import './App.css';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';


const content = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other<br> cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

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


class markDownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: content,
      click1: true,
      click2: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }

handleChange(event){
  this.setState({
    input: event.target.value
  });
}

handleClick1(){
  let change = document.getElementById("changeIcon1").classList;

  if(this.state.click1){
    document.getElementById("box1").style = "height: 95vh"
    document.getElementById("editor").style= "padding: 5px; height: 90vh;";
    document.getElementById("box2").style = "visibility: hidden;";
    document.body.style.overflow = "hidden";
    change.remove("fa-expand");
    change.add("fa-compress");
  }
  else{
    document.getElementById("box1").style = "height: auto;"
    document.getElementById("editor").style= "padding: 5px; height: 200px; min-height: 200px; max-height: 500px;";
    document.getElementById("box2").style = "visibility: visible";
    document.body.style.overflow = "scroll";
    change.remove("fa-compress");
    change.add("fa-expand");
  }
  this.state.click1 = !(this.state.click1);
}
handleClick2(){
  let change = document.getElementById("changeIcon2").classList;

  if(this.state.click2){
    document.getElementById("box1").style = "position: absolute; clip:rect(0px, 0px, 0px, 0px)";
    change.remove("fa-expand");
    change.add("fa-compress");
  }
  else{
    document.getElementById("box1").style = "position: static";
    change.remove("fa-compress");
    change.add("fa-expand");
  }

  this.state.click2 = !(this.state.click2);
}

  render() {

    return (<div>

      <div id="container">
        <div id="box1">
          <header><i className="fa fa-code" aria-hidden="true"></i> Editor<button className="clickable" onClick={this.handleClick1}><i id="changeIcon1" className="fa fa-expand" aria-hidden="true"></i></button></header>
          <textarea id="editor" onChange={this.handleChange}>
          
            {this.state.input}
          </textarea>
        </div>

        <div id="box2">
          <header><i className="fa fa-code" aria-hidden="true"></i> Previewer<button className="clickable" onClick={this.handleClick2}><i id="changeIcon2" className="fa fa-expand" aria-hidden="true"></i></button></header>
          <div id="preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {this.state.input}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default markDownPreviewer;

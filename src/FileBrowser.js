import React, { Component } from "react";
import FileList from "./FileList";
const fs = require('fs')
const os = require('os')
const path = require('path')

export default class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.createFileObject = this.createFileObject.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.backButton = this.backButton.bind(this)
    this.state = {
      activeDirectory: os.homedir(),
      fileList: fs.readdirSync(os.homedir()).map( (elem) => {
        return this.createFileObject(os.homedir(), elem)
      }
      )
    };
  }

  buildFileListObject(parentDir, fileList) { //takes an array of strings
    output = {};
    fileList.forEach( (elem) => {
      output[elem] = this.createFileObject(parentDir, elem)
    }
    )
    return output
  }

  createFileObject(parent, name = null) {
    if (name) {
      var fullPath = path.join(parent, name)
    } else {
      var fullPath = parent
      var name = path.basename(parent)
      parent = path.dirname(parent)
    }
    const isDirectory= fs.statSync(fullPath).isDirectory()
    
    return {
      name,
      parent,
      fullPath: fullPath,
      isDirectory,
      }
    }
    
  backButton() {
    const { activeDirectory } = this.state
    this.setState({activeDirectory: activeDirectory.parent})
  }  

  handleClick(event) {
    event.preventDefault();
    const fileList = fs.readdirSync(path.join(this.state.activeDirectory, event.target.innerText)).map(
      (elem) => {
        return {name: elem }
      }
      
    )
    this.setState({activeDirectory: event.target.innerText, fileList })
  }
  

  render() {
    console.log('fileList in filebrowswer', this.state.fileList)
    const { activeDirectory, fileList } = this.state;
    return (
      <div className="file-browser">
      {activeDirectory.name}
      <button onClick={this.backButton}> Back </button>
        <FileList fileList={fileList} handleClick = {this.handleClick} />
      </div>
    );
  }
}

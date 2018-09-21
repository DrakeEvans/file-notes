import React, { Component } from "react";
import FileList from "./FileList";
const fs = require("fs");
const os = require("os");
const path = require("path");

export default class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.createFileObject = this.createFileObject.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.backButton = this.backButton.bind(this);

    const activeDirectory = this.createFileObject(os.homedir());
    const fileList = this.buildFileListObject(activeDirectory);
    this.state = {
      activeDirectory,
      fileList
    };
  }

  buildFileListObject(parentObj) {
    let output = {};
    fs.readdirSync(parentObj.fullPath).forEach((elem) => {
      output[elem] = this.createFileObject(parentObj.fullPath, elem);
    });
    return output;
  }

  createFileObject(parentDir, name = null) {
    if (name) {
      var fullPath = path.join(parentDir, name);
    } else {
      var fullPath = parentDir;
      var name = path.basename(parentDir);
      parentDir = path.dirname(parentDir) || null;
    }
    const isDirectory = fs.statSync(fullPath).isDirectory();
    return {
      name,
      parentDir,
      fullPath,
      isDirectory
    };
  }

  updateActiveDirectory(activeDirectoryObj) {
    let { fileList } = this.state;
    const activeDirectory = activeDirectoryObj;
    fileList = this.buildFileListObject(activeDirectory);
    this.setState({ activeDirectory, fileList });
  }

  backButton() {
    const { activeDirectory } = this.state;
    this.updateActiveDirectory(
      this.createFileObject(activeDirectory.parentDir)
    );
  }

  handleClick(event) {
    event.preventDefault();
    this.updateActiveDirectory(this.state.fileList[event.target.innerText]);
  }

  render() {
    const { activeDirectory, fileList } = this.state;
    return (
      <div className="file-browser">
        {activeDirectory.name}
        <button onClick={this.backButton}> Back </button>
        <FileList fileList={fileList} handleClick={this.handleClick} />
      </div>
    );
  }
}

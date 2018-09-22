import React, { Component } from "react";
import FileList from "./FileList";
import {
  buildFileListObject,
  createFileObject,
  defaultDirectory, db, updateDatabase
} from "../fileHelperFunctions";

export default class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.backButton = this.backButton.bind(this);

    const activeDirectory = createFileObject(defaultDirectory());
    const fileList = buildFileListObject(activeDirectory);
    this.state = {
      activeDirectory,
      fileList
    };
  }

  updateActiveDirectory(activeDirectoryObj) {
    let { fileList } = this.state;
    const activeDirectory = activeDirectoryObj;

    fileList = buildFileListObject(activeDirectory);

    this.setState({ activeDirectory, fileList });
  }

  backButton() {
    const { activeDirectory } = this.state;
    this.updateActiveDirectory(createFileObject(activeDirectory.parentDir));
  }

  handleClick(event) {
    event.preventDefault();
    this.updateActiveDirectory(this.state.fileList[event.target.innerText]);
  }

  handleNoteChange(event) {
    event.preventDefault();
    let newStateObj = this.state.fileList;
    newStateObj[event.target.name].note = event.target.value;
    this.setState({ fileList: newStateObj });
    db[newStateObj[event.target.name].fileHash] = event.target.value
    updateDatabase()
  }

  render() {
    const { activeDirectory, fileList } = this.state;
    console.log('state', this.state)
    return (
      <div className="file-browser">
        <button onClick={this.backButton}> Back </button>
        {activeDirectory.fullPath.split(String.raw`/`).map((elem) => {
          return <span key={elem.name}> {elem} ⇾</span>;
        })}
        <FileList fileList={fileList} handleClick={this.handleClick} handleNoteChange={this.handleNoteChange} />
      </div>
    );
  }
}

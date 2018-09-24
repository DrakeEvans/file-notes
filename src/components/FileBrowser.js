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
    this.textAreaAdjust = this.textAreaAdjust.bind(this)
    this.backHistoryButton = this.backHistoryButton.bind(this)

    const history = []
    const activeDirectory = createFileObject(defaultDirectory());
    const fileList = buildFileListObject(activeDirectory);
    history.push(activeDirectory)
    this.state = {
      activeDirectory,
      fileList,
      history,
    };
  }

  updateActiveDirectory(activeDirectoryObj, pushHistory = true) {
    let { history } = this.state
    const activeDirectory = activeDirectoryObj;

    const fileList = buildFileListObject(activeDirectory);
    if (pushHistory) {
      history = history.concat([activeDirectoryObj])
    }
    return { activeDirectory, fileList, history };
  }

  backHistoryButton() {
    let { history } = this.state
    console.log('history', history)
    console.log('historyObj', history[history.length-2])
    const newState = this.updateActiveDirectory(history[history.length-2], false)
    newState.history = history.slice(0,history.length -1)
    console.log('newHistory', history)
    this.setState(newState)
  }

  backButton() {
    const { activeDirectory } = this.state;
    this.setState(this.updateActiveDirectory(createFileObject(activeDirectory.parentDir)));
  }

  handleClick(event) {
    event.preventDefault();
    this.setState(this.updateActiveDirectory(this.state.fileList[event.target.innerText]));
  }

  textAreaAdjust(event) {
    event.target.style.height = "1px";
    event.target.style.height = (1+event.target.scrollHeight)+"px";
  }

  handleNoteChange(event) {
    event.preventDefault();
    let newStateObj = JSON.parse(JSON.stringify(this.state.fileList));
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
        <div className="file-browser-header">
          <button onClick={this.backButton}> ../ </button>
          {activeDirectory.fullPath.split(String.raw`/`).map((elem) => {
            return <span key={elem.name}> {elem} ⇾</span>;
          })}
          <button onClick={this.backHistoryButton}>Back</button>
        </div>
        <FileList fileList={fileList} textAreaAdjust={this.textAreaAdjust} handleClick={this.handleClick} handleNoteChange={this.handleNoteChange} />
      </div>
    );
  }
}

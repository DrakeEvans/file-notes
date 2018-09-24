import React from "react";

function FileList(props) {
  const { fileList: files, handleClick, handleNoteChange, textAreaAdjust } = props;
  return (
    <div className="file-list">
    <div className="file-row">
              <div
                className="file-item-header"
              >
                File Name
              </div>
              <div
                className="file-note-header"
              >
              Note
            </div>
            </div>
      {Object.values(files)
        .filter((elem) => {
          return elem.name[0] !== ".";
        })
        .map((elem) => {
          return (
            <div key={elem.name} className="file-row">
              <div
                className="file-item"
                onClick={elem.isDirectory ? handleClick : ''}
              >
                {elem.name}
              </div>
              <textarea
                className="file-note"
                name={elem.name}
                value={elem.note ? elem.note : ''}
                onChange={handleNoteChange}
                onKeyUp={textAreaAdjust}
              />
            </div>
          );
        })}
    </div>
  );
}

export default FileList;

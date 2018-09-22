import React from "react";

function FileList(props) {
  const { fileList: files, handleClick, handleNoteChange } = props;
  return (
    <div className="file-list">
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
                value={elem.note}
                onChange={handleNoteChange}
              />
            </div>
          );
        })}
    </div>
  );
}

export default FileList;

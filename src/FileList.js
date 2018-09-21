import React from 'react'

function FileList(props) {

  const { fileList: files, handleClick } = props
  console.log('files', files)
  return (
    <div className="file-list">
      <ul>
      {
        Object.values(files).filter( (elem) => {
          return elem.name[0] !== '.'
        })
         .map( (elem) => {
           if (elem.isDirectory) {
             return <div className="file-row" onClick={handleClick} data-name={elem.name}> {elem.name} </div>
            } else {
              return <div className="file-row"> {elem.name} </div>
           }
        }
        )
      }
      </ul>
    </div>
  )
}

export default FileList;

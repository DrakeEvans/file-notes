import React from 'react'

function FileList(props) {

  const { fileList: files, handleClick } = props
  console.log('files', files)
  console.log('files[0].name', files[0].name)
  return (
    <div className="file-list">
      <ul>
      {
        files.filter( (elem) => {
          return elem.name[0] !== '.'
        })
         .map( (elem) => {
           if (true) {
             return <div className="file-row" onClick={handleClick}> {elem.name} </div>
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

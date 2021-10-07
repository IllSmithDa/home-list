import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import HomeList from './components/HomeList';
import './App.css';

function App() {
  const data: any = null;
  const [currentFile, setCurrentFile] = useState(data);
  const [allHomeData, setAllHomeData] = useState([]);
  const [retrievingData, setRetrievingData] = useState(false);
  const [error, setError] = useState(data);

  const submitData = (dragFile: any) => {
  
    let reader = new FileReader();
    let binaryData : String;
    reader.onload = function(evt) {
      binaryData = String(evt?.target?.result);
      axios({
        method: 'POST',
        url: 'http://localhost:5000/server/parseHome',
        data: {
          currentFile: binaryData
        }
      })
        .then((res: AxiosResponse<any>) => {
          setAllHomeData(res.data.homeData);
          setRetrievingData(false);
        })
        .catch((err) => {
          setError(err);
        })
    };
    if (currentFile !== null && dragFile !== null){
      setRetrievingData(true);
      reader.readAsBinaryString(currentFile === null ? dragFile : currentFile);
    } 
  }
  const getNewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.files) {
      console.log(event.currentTarget.files[0]);
      setCurrentFile(event.currentTarget.files[0]);
    }

  }
  const dragNewFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[i].kind === 'file') {
        const file = event.dataTransfer.files[0];
        setCurrentFile(file);
        submitData(file);
      }
    }
  }
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }
  return (
    <div
      style={{
        textAlign: 'center',
      }}
      onDragOver={handleDragOver} 
    >
      <div 
        style={{
          border: '1px solid #000',
          width: '40%',
          margin: '2rem auto',
          padding: '50px'
        }}
        draggable="true"
        onDrop={dragNewFile}
        onDragOver={handleDragOver}
      >
        <h3>Drag and Drop CSV Files Here</h3>
      </div>
      <div>
        {
          error ? 
          <div>
            <h1>Error: {error}</h1>
          </div>:
          <div />
        }
      </div>
      <div>
        <input
          id="csv"
          type="file"
          accept=".csv"
          style={{
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1em',
            fontWeight: 500,
            padding: '10px 16px',
            cursor: 'pointer'
          }}
          onChange={getNewFile} />
      </div>
      <div
        style={{
          margin: '1em'
        }}
      >
        <button
          onClick={submitData}
          style={{
            backgroundColor: '#DDD',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1em',
            fontWeight: 500,
            padding: '10px 16px',
            cursor: 'pointer'
          }}
        >
            Submit
        </button>
      </div>
      <div>
      {
        retrievingData ? 
          <div>
            <h1>Loading ....</h1>
          </div> : 
          <div>
            <HomeList homeList={allHomeData} />
          </div>
      }
      </div>
    </div>
  );
}

export default App;

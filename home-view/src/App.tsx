import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import HomeList from './components/HomeList';
import { csv } from 'd3-fetch';
import './App.css';

function App() {
  const data: any = null;
  const [currentFile, setCurrentFile] = useState(data);
  const [allHomeData, setAllHomeData] = useState([]);
  const [displayHomeData, setDisplayHomeData] = useState([]);
  const [retrievingData, setRetrievingData] = useState(false);
  const csvJSON = (csv: any) => {

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj: any = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  const submitData = async () => {
    setRetrievingData(true);
    console.log(currentFile);
    let reader = new FileReader();
    let binaryData : String;
    reader.onload = function(evt) {
      console.log(evt?.target?.result);
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
          setDisplayHomeData(res.data.homeData);
          setRetrievingData(false);
        })
        .catch((err) => {
          
        })
  
    };
    reader.readAsBinaryString(currentFile);

  }
  const getNewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.files) {
      console.log(event.currentTarget.files[0]);
      setCurrentFile(event.currentTarget.files[0]);
    }

  }

  return (
    <div className="App">
      <div>
        <input id="csv" type="file" multiple onChange={getNewFile} />
      </div>
      <div>
        <button onClick={() => { submitData(); }} >Submit</button>
      </div>
      <div>
      {
        retrievingData ? 
          <div>
            <h1>Loading ....</h1>
          </div> : 
          <div>
            <HomeList homeList={displayHomeData} />
          </div>
      }
      </div>
    </div>
  );
}

export default App;

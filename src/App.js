import React, {useState, useEffect} from "react";
import './App.css';

const kintoneRecords = 'http://localhost:5000/getData';

const callRestApi = async () => {
  const response = await fetch(kintoneRecords);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  //return JSON.stringify(jsonResponse);
  const arrayOfLists = jsonResponse.records.map(
    record => <dl><dt>{record.title.value}</dt><dd className="ddimg"><img src={getQRCodeUrl(record.URL.value)} alt={record.URL.value} title={record.title.value} /> </dd><dd className="descriptions">{record.descriptions.value}</dd></dl>
    )
    return arrayOfLists;
};

function getQRCodeUrl(url) {
  return `http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100`;
}
function App() {
  const [apiResponse, setApiResponse] =
  useState('*** now loading ***');
  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result));
  },[]);
  return(
    <div>
      <h1>kintoneアプリから取得したURLのリスト</h1>
      <div className="container">{apiResponse}</div>
  </div>
  );
  };

export default App;

import React, { useState } from 'react';
import DataInput from './components/DataInput';
import ValidationSummary from './components/ValidationSummary';
import DataDisplay from './components/DataDisplay';

function App() {
  const [validData, setValidData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);

  return (
    <div className="App">
      <h1>Data Cleaning App</h1>
      <DataInput setValidData={setValidData} setInvalidData={setInvalidData} />
      <ValidationSummary validData={validData} invalidData={invalidData} />
      <DataDisplay />
    </div>
  );
}

export default App;
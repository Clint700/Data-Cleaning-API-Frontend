import React, { useState, useEffect } from 'react';
import axios from '../api';

function DataDisplay() {
  const [validData, setValidData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [validRes, invalidRes] = await Promise.all([
          axios.get('/validData'),
          axios.get('/invalidData'),
        ]);
        setValidData(validRes.data);
        setInvalidData(invalidRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Backend</h2>
      <h3>Valid Data</h3>
      <ul>
        {validData.map((record) => (
          <li key={record.id}>
            {record.full_name} - {record.email}
          </li>
        ))}
      </ul>
      <h3>Invalid Data</h3>
      <ul>
        {invalidData.map((record) => (
          <li key={record.id}>
            {record.full_name || 'N/A'} - {record.email || 'N/A'} - {record.error_reason}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataDisplay;
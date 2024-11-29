import React, { useState } from 'react';
import axios from '../api';

function DataInput({ setValidData, setInvalidData }) {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState('');

  const validateData = (data) => {
    const valid = [];
    const invalid = [];
    const emailRegex = /^\S+@\S+\.\S+$/;

    data.forEach((record) => {
      const errors = [];
      if (!record.full_name || typeof record.full_name !== 'string' || record.full_name.trim() === '') {
        errors.push('Name is required.');
      }
      if (!record.email || !emailRegex.test(record.email)) {
        errors.push('Invalid email format.');
      }

      if (errors.length === 0) {
        valid.push(record);
      } else {
        invalid.push({ ...record, error_reason: errors.join(' ') });
      }
    });

    return { valid, invalid };
  };

  const handleSubmit = async () => {
    setError('');
    try {
      const parsedData = JSON.parse(jsonData);
      if (!Array.isArray(parsedData)) {
        throw new Error('Input must be an array of objects.');
      }

      const { valid, invalid } = validateData(parsedData);
      setValidData(valid);
      setInvalidData(invalid);

      // Post to backend
      await axios.post('/submitData', { records: valid.concat(invalid) });

      alert('Data submitted successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (
    <div>
      <h2>Enter JSON Data</h2>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        rows="10"
        cols="50"
        placeholder='[{ "full_name": "John Doe", "email": "john@example.com" }]'
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Validate & Submit</button>
    </div>
  );
}

export default DataInput;
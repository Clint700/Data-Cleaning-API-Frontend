import React from 'react';

function ValidationSummary({ validData, invalidData }) {
  return (
    <div>
      <h2>Validation Summary</h2>
      <h3>Valid Data</h3>
      <ul>
        {validData.map((record, index) => (
          <li key={index}>
            {record.full_name} - {record.email}
          </li>
        ))}
      </ul>
      <h3>Invalid Data</h3>
      <ul>
        {invalidData.map((record, index) => (
          <li key={index}>
            {record.full_name || 'N/A'} - {record.email || 'N/A'} - {record.error_reason}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ValidationSummary;
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setResponseData(null); // Reset response data state

    let parsedData;
    try {
      parsedData = JSON.parse(jsonData);
    } catch (parseError) {
      setError('Invalid JSON format.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/bfhl', parsedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponseData(response.data);
    } catch (error) {
      setError('An error occurred. Please check your input and try again.');
      console.error('Error making request:', error);
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Input</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='Enter JSON here'
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {responseData && (
          <>
            <h2>Response Data</h2>
            <select multiple onChange={handleSelectChange}>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>
            <div>
              {selectedOptions.includes('numbers') && (
                <div>
                  <h3>Numbers</h3>
                  <p>{JSON.stringify(responseData.numbers)}</p>
                </div>
              )}
              {selectedOptions.includes('alphabets') && (
                <div>
                  <h3>Alphabets</h3>
                  <p>{JSON.stringify(responseData.alphabets)}</p>
                </div>
              )}
              {selectedOptions.includes('highest_alphabet') && (
                <div>
                  <h3>Highest Alphabet</h3>
                  <p>{JSON.stringify(responseData.highest_alphabet)}</p>
                </div>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

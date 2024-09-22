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
    setError(null);
    setResponseData(null);

    if (!jsonData.trim()) {
      setError('JSON input cannot be empty.');
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(jsonData);
    } catch (parseError) {
      setError('Invalid JSON format.');
      return;
    }

    try {
      const response = await axios.post('https://bajajqualifier-1.netlify.app/.netlify/functions/bfhl', parsedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponseData(response.data);
    } catch (error) {
      setError('An error occurred while making the request. Please check your input and try again.');
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>RA2111047010113</h1>  {/* Set as per roll number */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='Enter JSON here'
            rows="10"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {responseData && (
          <>
            <h2>Response Data</h2>
            <select multiple onChange={handleSelectChange} value={selectedOptions}>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            <div>
              {selectedOptions.includes('numbers') && (
                <div>
                  <h3>Numbers</h3>
                  <p>{responseData.numbers.length > 0 ? JSON.stringify(responseData.numbers) : 'No numbers found.'}</p>
                </div>
              )}
              {selectedOptions.includes('alphabets') && (
                <div>
                  <h3>Alphabets</h3>
                  <p>{responseData.alphabets.length > 0 ? JSON.stringify(responseData.alphabets) : 'No alphabets found.'}</p>
                </div>
              )}
              {selectedOptions.includes('highest_lowercase_alphabet') && (
                <div>
                  <h3>Highest Lowercase Alphabet</h3>
                  <p>{responseData.highest_lowercase_alphabet.length > 0 ? JSON.stringify(responseData.highest_lowercase_alphabet) : 'No highest lowercase alphabet found.'}</p>
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

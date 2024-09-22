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
      console.error('Error making request:', error);
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div className="container">
      <header className="mt-5">
        <h1 className="text-center mb-4">JSON Input</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <textarea
              className="form-control"
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='Enter JSON here'
              rows="5"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
        {error && <p className="text-danger text-center">{error}</p>}
        {responseData && (
          <>
            <h2 className="text-center mt-4">Filtered Response</h2>
            <div className="form-group">
              <select multiple onChange={handleSelectChange} value={selectedOptions} className="form-control">
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_alphabet">Highest Alphabet</option>
              </select>
            </div>
            <div className="mt-4">
              {selectedOptions.includes('numbers') && (
                <div>
                  <h3>Numbers</h3>
                  <p>{responseData.numbers.length > 0 ? responseData.numbers.join(', ') : 'No numbers found.'}</p>
                </div>
              )}
              {selectedOptions.includes('alphabets') && (
                <div>
                  <h3>Alphabets</h3>
                  <p>{responseData.alphabets.length > 0 ? responseData.alphabets.join(', ') : 'No alphabets found.'}</p>
                </div>
              )}
              {selectedOptions.includes('highest_alphabet') && (
                <div>
                  <h3>Highest Alphabet</h3>
                  <p>{responseData.highest_alphabet.length > 0 ? responseData.highest_alphabet.join(', ') : 'No highest alphabet found.'}</p>
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

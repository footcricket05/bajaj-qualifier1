# JSON Processing Application

## Overview

This project consists of two main components: a backend REST API and a frontend React application. The backend API processes JSON data, while the frontend application provides an interface for users to interact with the API.

## Backend

### Objective

Build and deploy a REST API with the following specifications:

1. **POST Method**: 
   - Endpoint: `/bfhl`
   - Accepts JSON data and returns:
     - Status
     - User ID
     - College Email ID
     - College Roll Number
     - Array of numbers
     - Array of alphabets

2. **GET Method**:
   - Endpoint: `/bfhl`
   - Returns an operation code.

### Hosting

You can use any hosting provider of your choice. For demonstration, use Heroku, Netlify, Vercel, Firebase, or similar platforms.

### Logic

1. **POST Route: `/bfhl`**:
   - **Request Example**:
     ```json
     {
       "data": ["M", "1", "334", "4", "B"]
     }
     ```
   - **Response Example**:
     ```json
     {
       "is_success": true,
       "user_id": "john_doe_17091999",
       "email": "john@xyz.com",
       "roll_number": "ABCD123",
       "numbers": ["1", "334", "4"],
       "alphabets": ["M", "B"],
       "highest_alphabet": ["M"]
     }
     ```

2. **GET Route: `/bfhl`**:
   - **Request**: No input required.
   - **Response Example**:
     ```json
     {
       "operation_code": 1
     }
     ```

### Note

- The `highest_alphabet` is the alphabet from the input array that is the last in the A-Z series (case insensitive).
- Follow best practices for exception handling, input validation, and other relevant aspects.

## Frontend

### Objective

Develop and deploy a frontend application that interacts with the backend API to process input data and display the response.

### Logic

1. **User Interface**:
   - Text input field for JSON data.
   - Submit button to send data to the backend API.
   - Multi-select dropdown to choose which part of the response to display.

2. **Features**:
   - Validates JSON format and displays an error message for invalid input.
   - Calls the REST API and displays the response based on selected dropdown options:
     - Alphabets
     - Numbers
     - Highest alphabet

3. **Example Output**:
   - **Selected Options**: Numbers & Highest Alphabet
     - Response displays numbers and the highest alphabet.
   - **Selected Options**: Only Numbers
     - Response displays only numbers.

### Additional Information

- The website title should be set to your roll number.



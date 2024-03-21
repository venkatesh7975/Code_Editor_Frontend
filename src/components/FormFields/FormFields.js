import React, { Component } from 'react';
import './FormFields.css';

class FormFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      preferred_code_language: 'Python',
      std_in: '',
      source_code: '',
      output: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleRun = async () => {
    try {
      console.log('Source code:', this.state.source_code); // Add logging

      const response = await fetch('http://localhost:4000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferred_code_language: this.state.preferred_code_language,
          std_in: this.state.std_in,
          source_code: this.state.source_code
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({ output: data.output, error: '' });
      } else {
        const error = await response.json();
        this.setState({ output: '', error: error.error });
      }
    } catch (error) {
      console.error('Error running code:', error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: this.state.user_name,
          preferred_code_language: this.state.preferred_code_language,
          std_in: this.state.std_in,
          source_code: this.state.source_code
        })
      });

      if (response.ok) {
        alert('Code snippet submitted successfully!');
      } else {
        throw new Error('Failed to submit code snippet. Please try again.');
      }
    } catch (error) {
      alert(error.message);
      console.error('Error submitting code snippet:', error);
    }
  };

  handleReset = () => {
    this.setState({ source_code: '' });
  };

  render() {
    const { user_name, preferred_code_language, std_in, source_code, output, error } = this.state;

    return (
      <div className="editor-container mt-5">
        <form onSubmit={this.handleSubmit}>
          <div className="editor-header">
           
          
            <button type="submit" className="btn btn-primary">Submit</button>
            
          </div>
          <div className="editor-body">
            <label htmlFor="user_name" className="form-label">Username:</label>
            <input
              type="text"
              id="user_name"
              value={user_name}
              onChange={this.handleChange}
              className="form-control mb-3"
              required
            />

            <label htmlFor="preferred_code_language" className="form-label">Preferred Code Language:</label>
            <select
              id="preferred_code_language"
              value={preferred_code_language}
              onChange={this.handleChange}
              className="form-select mb-3"
              required
            >
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>

            <label htmlFor="std_in" className="form-label">Standard Input (stdin):</label>
            <input
              type="text"
              id="std_in"
              value={std_in}
              onChange={this.handleChange}
              className="form-control mb-3"
            />

            <label htmlFor="source_code" className="form-label">Source Code:</label>
            <textarea
              id="source_code"
              value={source_code}
              onChange={this.handleChange}
              className="form-control mb-3"
              rows="10"
              required
            ></textarea>
            <div className="editor-header">
              <button type="button" className="btn btn-primary m-2" onClick={this.handleRun}>Run</button>
            <button type="button" className="btn btn-secondary" onClick={this.handleReset}>Reset</button>
            </div>
            <div className="output-console">
              <h4>Output Console:</h4>
              {output && <pre>{output}</pre>}
              {error && <pre className="text-danger">{error}</pre>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormFields;

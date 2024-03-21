import React, { Component } from 'react';
import './SubmittedEntries.css';

class SubmittedEntries extends Component {
  state = {
    entries: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:4000/entries');
      if (!response.ok) {
        throw new Error('Failed to fetch submitted entries.');
      }
      const data = await response.json();

      this.setState({ entries: data, loading: false });
    } catch (error) {
      console.error('Error fetching submitted entries:', error);
      this.setState({ error: 'Failed to fetch submitted entries.', loading: false });
    }
  };

  render() {
    const { entries, loading, error } = this.state;

    return (
      <div>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Language</th>
                <th>Stdin</th>
                <th>Timestamp</th>
                <th>Code</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.id}</td>
                  <td>{entry.user_name}</td>
                  <td>{entry.preferred_code_language}</td>
                  <td>{entry.std_in}</td>
                  <td>{entry.timestamp}</td>
                  <td>{entry.source_code.substring(0, 100)}</td>
                  <td>{entry.std_out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default SubmittedEntries;

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvData from './data/202004-divvy-tripdata.csv';

const DataPreprocessing = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(csvData);
          const text = await response.text();
          const parsedData = Papa.parse(text, { header: true }).data;
          console.log('Parsed Data:', parsedData);
          setData(parsedData);
        } catch (error) {
          console.error('Error fetching or parsing data:', error);
        }
      };

    fetchData();
  }, []);

  // Handle missing values
  const cleanedData = data.map((row) => {
    if (!row.start_station_id || !row.end_station_id) {
      return null;
    }
    return row;
  }).filter(Boolean);
  console.log('Cleaned Data:', cleanedData);

  // Remove duplicates
  const uniqueData = [...new Set(cleanedData.map(JSON.stringify))].map(JSON.parse);
  console.log('Unique Data:', uniqueData);

  // Perform data transformations
  const transformedData = uniqueData.map((row) => ({
    ...row,
    started_at: new Date(row.started_at),
    ended_at: new Date(row.ended_at),
  }));
  console.log('Transformed Data:', transformedData);

  // Render the preprocessed data
  return (
    <div>
      <h2>Preprocessed Data</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ride ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rideable Type</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Started At</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ended At</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Station Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Station ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Station Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Station ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Latitude</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Longitude</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Latitude</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Longitude</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Member/Casual</th>
          </tr>
        </thead>
        <tbody>
          {transformedData.slice(0, 3).map((row, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.ride_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.rideable_type}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.started_at.toString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.ended_at.toString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.start_station_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.start_station_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.end_station_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.end_station_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.start_lat}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.start_lng}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.end_lat}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.end_lng}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.member_casual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPreprocessing;
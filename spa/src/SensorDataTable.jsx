import { useState, useEffect } from 'react';

export default function SensorDataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/sensor-data/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError('Failed to fetch sensor data');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        console.error('Error fetching sensor data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
    
    // Обновляем данные каждые 5 секунд
    const interval = setInterval(fetchSensorData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading && data.length === 0) {
    return <div>Loading sensor data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Sensor Data</h1>
      
      {data.length === 0 ? (
        <p>No sensor data available</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Data ID</th>
              <th>Sensor ID</th>
              <th>Sensor Name</th>
              <th>Sensor Type</th>
              <th>Location</th>
              <th>Data Type</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.dataId}>
                <td>{item.dataId}</td>
                <td>{item.sensorId}</td>
                <td>{item.sensor?.sensorName || 'N/A'}</td>
                <td>{item.sensor?.sensorType || 'N/A'}</td>
                <td>{item.sensor?.location || 'N/A'}</td>
                <td>{item.dataType}</td>
                <td>{item.value}</td>
                <td>{item.sensor?.unitOfMeasure || 'N/A'}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

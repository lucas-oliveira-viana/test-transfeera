import React, { useEffect, useState } from 'react';
import receiversService from './services/receivers';

export default function App() {
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    async function fetchReceivers() {
      try {
        const response = await receiversService.getReceivers();

        setReceivers(response.data)
      } catch (e) {
        console.error('Error when trying to get receivers');
      }
    }

    fetchReceivers();
  }, []);

  return <div>{JSON.stringify(receivers, null, 2)}</div>;
}

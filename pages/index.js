import Head from 'next/head';
import FormDomain from '../components/FormDomain';
import { useState } from 'react';
import moment from 'moment';

export default function Home() {
  const [domainData, setDomainData] = useState(null);
  const [error, setError] = useState(null);
  const [submittedDomain, setSubmittedDomain] = useState('');

  const handleSubmit = async (domain) => {
    try {
      const response = await fetch(`https://api.starknet.id/domain_to_addr?domain=${domain}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();

      // Convert Unix Epoch time to GMT time with moment.js
      const gmtTime = moment.unix(jsonData.domain_expiry).utc().format('YYYY-MM-DD HH:mm:ss');

      // Combines data with GMT time
      const newData = { ...jsonData, gmt_time: gmtTime };

      setDomainData(newData);
      setSubmittedDomain(domain);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Domain Stark Form</title>
        <meta name="description" content="Form to submit a Stark domain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Domain Stark Form</h1>
        <FormDomain onSubmit={handleSubmit} />
        {/* Show error messages if they occur */}
        {error && <p>{error}</p>}
        {/* Show the resulting data if any */}
        {domainData && (
          <div>
            <h2>Domain Data:</h2>
            <p>Domain: {submittedDomain}</p> 
            <p>Address: {domainData.addr}</p>
            <p>GMT Time: {domainData.gmt_time}</p>
          </div>
        )}
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

import Head from 'next/head';
import FormDomain from '../components/FormDomain';
import { useState } from 'react';
import moment from 'moment';

const Home = () => {
  const [domainData, setDomainData] = useState(null);
  const [error, setError] = useState(null);
  const [submittedDomain, setSubmittedDomain] = useState('');

  const handleSubmit = async (domain) => {
    try {
      const response = await fetch(`https://api.starknet.id/domain_to_addr?domain=${domain}`);
      if (!response.ok) {
        throw new Error('TOLOL');
      }
      const jsonData = await response.json();

      // Convert Unix Epoch time to GMT time with moment.js
      const gmtTime = moment.unix(jsonData.domain_expiry).utc().format('YYYY-MM-DD HH:mm:ss');

      // Combines data with GMT time
      const newData = { ...jsonData, gmt_time: gmtTime };

      setDomainData(newData);
      setSubmittedDomain(domain);
      setError(null);
      
    } catch (error) {
      setError(error.message);
      setDomainData(null);
      setSubmittedDomain('');
    }
  };

  return (
    <div>
      <Head>
        <title>Domain Stark Expiry Date</title>
        <meta name="description" content="Checker Domain Stark Expiry Date" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Form Domain Stark</h1>
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

export default Home;

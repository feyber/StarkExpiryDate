import { useState } from 'react';

const FormDomain = ({ onSubmit }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(domain);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Domain Stark:
        <input 
          type="text" 
          value={domain} 
          onChange={(e) => setDomain(e.target.value)} 
          required 
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDomain;

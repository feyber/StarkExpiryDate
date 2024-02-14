import { useState } from 'react';

const FormDomain = ({ onSubmit }) => {
	const [domain, setDomain] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(`${domain}.stark`);
	};

	return (
		<form onSubmit={handleSubmit} className='mt-5 flex flex-col justify-center items-center'>
			<label className='flex sm:items-center w-full max-w-lg border border-gray-200 rounded-lg'>
				<input
					className="outline-none px-4 py-2 text-lg shadow-sm h-10 w-full bg-gray-50"
					type="text"
					value={domain}
					placeholder='name domain'
					onChange={(e) => setDomain(e.target.value)}
					required
				/>
				<button
					type='submit'
					className="w-max inline-flex items-center outline-none justify-center px-5 py-2 mr-3 text-xl font-medium text-center text-white rounded-lg rounded-l-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
				>
					Check
				</button>
			</label>
			<p className="mb-5 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
				Fill in ur domain without <span className='text-red-500 font-serif font-medium'>.stark</span>
			</p>
		</form>
	);
};

export default FormDomain;

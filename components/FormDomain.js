import { useState } from 'react';

const FormDomain = ({ onSubmit }) => {
	const [domain, setDomain] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(`${domain}.stark`);
	};

	return (
		<div >
		<form onSubmit={handleSubmit} className='mt-5 flex flex-col justify-center items-end'>
			<label className='flex sm:items-center w-full max-w-lg md:max-w-2xl mb-2'>
				<input
					className="outline-none text-lg shadow-sm h-10 pl-2 w-full bg-gray-50"
					type="text"
					value={domain}
					placeholder='Domain name'
					onChange={(e) => setDomain(e.target.value)}
					required
				/>
				<button
					type='submit'
					className="w-max inline-flex items-center outline-none justify-center px-5 py-2 mr-3 text-xl font-medium text-center text-white rounded-lg rounded-l-none bg-blue-700 hover:bg-blue-800"
				>
					Check
				</button>
			</label>
			<p className="mb-5 font-bold text-white drop-shadow-md lg:mb-8 text-xs md:text-md pr-4 tracking-wide">
				*Fill in target domain without <span className='text-rose-600 font-serif font-bold tracking-wider'>.stark</span>
			</p>
		</form>
		</div>
	);
};

export default FormDomain;

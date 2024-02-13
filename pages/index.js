import Head from "next/head";
import FormDomain from "../components/FormDomain";
import { useState } from "react";
import moment from "moment";

const Home = () => {
	const [domainData, setDomainData] = useState(null);
	const [error, setError] = useState(null);
	const [submittedDomain, setSubmittedDomain] = useState("");

	const handleSubmit = async (domain) => {
		try {
			const response = await fetch(
				`https://api.starknet.id/domain_to_addr?domain=${domain}`
			);
			if (!response.ok) {
				throw new Error("TOLOL");
			}
			const jsonData = await response.json();

			// Convert Unix Epoch time to GMT time with moment.js
			const gmtTime = moment
				.unix(jsonData.domain_expiry)
				.utc()
				.format("YYYY-MM-DD HH:mm:ss");

			// Combines data with GMT time
			const newData = { ...jsonData, gmt_time: gmtTime };

			setDomainData(newData);
			setSubmittedDomain(domain);
			setError(null);
		} catch (error) {
			setError(error.message);
			setDomainData(null);
			setSubmittedDomain("");
		}
	};

	const sliceAddress = (address, length) => {
		const end = address.substring(address.length - length)
		return address.substring(0, length) + '...' + end;
	}

	return (
		<>
			<Head>
				<title>Domain Stark Expiry Date</title>
				<meta
					name="description"
					content="Checker Domain Stark Expiry Date"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<section className="bg-white">
					<div className="grid max-w-full py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
						<div className="mx-auto lg:col-span-12 pl-8 flex flex-col">
							<h1 className="max-w-full mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl">
								Domain <span className="underline font-serif text-red-500">.Stark</span> Checker
							</h1>
							<FormDomain onSubmit={handleSubmit} />
							{/* Show error messages if they occur */}
							{error && <span className="text-red-500">{error}</span>}
							{/* Show the resulting data if any */}
							{domainData && (
								<div className="w-full xs:max-w-md">
									<h2>Domain Data:</h2>
									<p>Domain: {submittedDomain}</p>
									<p>Address: {sliceAddress(domainData.addr, 10)}</p>
									<p>GMT Time: {domainData.gmt_time}</p>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>

			<footer>{/* Footer content */}</footer>
		</>
	);
};

export default Home;

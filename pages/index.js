import Head from "next/head";
import Image from "next/image";
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
				throw new Error("Domain Name is Not Register!");
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
		<div className="flex-col justify-center bg-bg min-h-screen  bg-cover bg-center bg-no-repeat flex mx-auto items-center">
		<div >
			<Head>
				<title>.Stark Expiry Date Checker</title>
				<meta
					name="description"
					content="Checker Domain Stark Expiry Date"
				/>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<main>
				<section className="md:py-16 h-full w-full bg-blue-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl duration-700 hover:backdrop-blur-3xl bg-opacity-10 border shadow-md border-gray-100">
					<div className="">
						<div className="py-8 px-4 md:py-12 md:px-36">
							<h1 className="font-bold text-center text-2xl md:text-4xl lg:text-5xl uppercase text-blue-50 drop-shadow-md mb-3">
								Domain <span className="font-serif text-rose-600">.Stark</span> Checker
							</h1>
							<FormDomain onSubmit={handleSubmit} />
							{/* Show error messages if they occur */}
							{error && <span className="text-rose-500 animate-pulse drop-shadow-lg text-center flex mx-auto items-center justify-center text-lg md:text-2xl font-bold uppercase tracking-wide">{error}</span>}
							{/* Show the resulting data if any */}
							{domainData && (
								<div className="w-full xs:max-w-md tracking-wide drop-shadow-md">
									<h2 className="text-2xl md:text-3xl text-blue-50 font-medium mb-3">Results:</h2>
									<p className="min-w-full border-b-2 text-white mb-3"></p>
									<div className="hidden md:block px-2">
									<div className="flex min-w-full justify-between h-6">
									<div className="text-center text-blue-50 py-2">
										<p>Domain Name </p>
										<p>{submittedDomain}</p>
									</div>
									 
									<p className="h-16 border-l-2 text-white mb-3"></p>
									<div className="text-center text-blue-50 py-2">
									<p>Address</p>
									<p>{sliceAddress(domainData.addr, 10)}</p>
									</div>
									<p className="h-16 border-l-2 text-white mb-3"></p>
									<div className="text-center text-blue-50 py-2">
									<p>Expired Date</p>
									<p>{domainData.gmt_time}</p>
									</div>
									</div>
									</div>
									<div className="block md:hidden">
										<div>
										<div className="text-center text-blue-50">
										<p>Domain Name </p>
										<p className="mb-3">{submittedDomain}</p>
										<p className="min-w-full border-b-2 text-white mb-3"></p>
										<p>Address</p>
										<p className="mb-3">{sliceAddress(domainData.addr, 10)}</p>
										<p className="min-w-full border-b-2 text-white mb-3"></p>
										<p>Expired Date</p>
										<p >{domainData.gmt_time}</p>
									</div>

										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>

			<footer className="absolute mx-auto bottom-2 left-0 right-0">
			<Image
      src="/logo.png"
      width={250}
      height={69}
      alt="logo starknet"
	  style={{
		margin: "auto",
	  }}
	  className="drop-shadow-sm"
    />
			</footer>

			</div>
			</div>
		</>
	);
};

export default Home;

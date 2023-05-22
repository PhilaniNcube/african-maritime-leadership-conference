import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useState } from 'react';
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";


export default function Home() {

  const sectors = [
    "Fishing",
    "Aquaculture",
    "Marine Protection and Governance",
    "Maritime Transport",
    "Marine Manufacturing",
    "Offshore Oil and Gas Exploration",
    "Small Harbour Development",
    "Coastal and Marine Tourism",
    "Other"
  ]

  const [otherSelected, setOtherSelected] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     setLoading(true)
      const {
        first_name,
        last_name,
        email,
        tel,
        title,
        company_name,
        company_postal_address,
        company_street_address,
        company_registration_number,
        sector,
        other_sector,

      } = Object.fromEntries(new FormData(e.currentTarget));

    console.log({
      first_name,
      last_name,
      email,
      tel,
      title,
      company_name,
      company_postal_address,
      company_street_address,
      company_registration_number,
      sector,
      other_sector,
    });


    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        tel,
        title,
        company_name,
        company_postal_address,
        company_street_address,
        company_registration_number,
        sector,
        other_sector,
      }),
    });

         if (res.ok) {
           const result = await res.json();
           setLoading(false);

           console.log(result);

           alert("Thank You for your submission");
           setLoading(false);
         } else {
           const result = await res.json();
           console.log(result.response);
           alert(
             `There was an error. Please try again later. Please note, you cannot sign up with the same email address more than once.`
           );
           setLoading(false);
         }

    setLoading(false)

  }


  return (
    <>
      <Head>
        <title>African Maritime Leadership Conference Exhibitors</title>
        <meta
          name="description"
          content="African Maritime Leadership Conference Exhibitors"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mb-10 relative">
        <div className="absolute bg-slate-600/40 inset-0 flex items-center justify-center">
          <h1 className="font-bold text-red-600 text-3xl">Closed</h1>
        </div>
        <div className="max-w-5xl mx-auto pt-10 px-8">
          <Image src="/banner.jpg" alt="Banner" width={3780} height={1181} />
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-800 mt-8"
          >
            <div className="col-span-1 md:col-span-2 ">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                Company Details
              </h2>
              <hr className="text-zinc-700 mt-3" />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="company_name" className="text-md  font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="company_postal_address"
                className="text-md  font-medium"
              >
                Company Postal Address
              </label>
              <input
                type="text"
                name="company_postal_address"
                id="company_postal_address"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="company_street_address"
                className="text-md  font-medium"
              >
                Company Street Address
              </label>
              <input
                type="text"
                name="company_street_address"
                id="company_street_address"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="company_registration_number"
                className="text-md  font-medium"
              >
                Company Registration Number
              </label>
              <input
                type="text"
                name="company_registration_number"
                id="company_registration_number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="sector" className="text-md  font-medium">
                Sector
              </label>
              <select
                id="sector"
                name="sector"
                required={otherSelected}
                onChange={(e) => {
                  // console.log(e.target.value)
                  if (e.target.value === "Other") {
                    setOtherSelected(true);
                  } else {
                    setOtherSelected(false);
                  }
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select A Sector</option>
                {sectors.map((sector, i) => (
                  <option key={i} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            {otherSelected && (
              <div className="flex flex-col w-full">
                <label htmlFor="other_sector" className="text-md  font-medium">
                  Specify Other Sector
                </label>
                <input
                  type="text"
                  name="other_sector"
                  id="other_sector"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div className="col-span-1 md:col-span-2 ">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                Contact Person Details
              </h2>
              <hr className="text-zinc-700 mt-3" />
            </div>

            <div className="flex gap-2">
              {" "}
              <div className="flex flex-col w-[80px] ">
                <label htmlFor="title" className="text-md  font-medium">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm"
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="first_name" className="text-md  font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="last_name" className="text-md  font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="tel" className="text-md  font-medium">
                Telephone No.
              </label>
              <input
                type="tel"
                name="tel"
                id="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-md  font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 rounded-lg shadow font-medium uppercase text-white px-8 mt-4 py-2 w-fit"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

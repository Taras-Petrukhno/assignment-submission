"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();

  function SubmittedData() {
    const data = Array.from(searchParams.entries());
    return (
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Row
              </th>
              <th scope="col" className="px-6 py-3">
                Candidate info
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item[1]}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  {item[0].at(0).toLocaleUpperCase() +
                    item[0].replaceAll("_", " ").slice(1) +
                    ": "}
                </td>
                <td className="px-6 py-4">{item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-10 text-center font-bold ">
        Thank you for submitting your assignment!
      </h1>
      <SubmittedData />
      <Link
        href="/"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-20 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-w-80"
      >
        Back to Form
      </Link>
    </main>
  );
}

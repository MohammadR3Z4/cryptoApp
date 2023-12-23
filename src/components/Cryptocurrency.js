import React, { useState, useEffect } from "react";
import { useGetCryptosQuery } from "@/src/services/cryptoApi";
import millify from "millify";
import Image from "next/image";
import Link from "next/link";

import { CiSearch } from "react-icons/ci";
import Loading from "./Loading";

function CryptocurrencyContent({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const filteredCryptos = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [inputValue, data]);

  if (isFetching) return <Loading />;

  return (
    <div className={`${simplified ? "ms-0" : "md:ms-[300px] ms-0 p-4"} `}>
      <div
        className={`${
          simplified ? "hidden" : "block"
        } flex justify-center mb-3 w-full`}
      >
        <div className="relative w-fit flex justify-center items-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 "
            placeholder="Search..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <CiSearch className="absolute right-3 w-8 h-6" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-5">
        {cryptos?.map((crypto, index) => (
          <Link key={index} href={`/cryptocurrency/${crypto.rank}`}>
            <div className="p-3 h-64 border border-black/30 hover:shadow-xl">
              <div className="flex justify-between border-b border-dotted border-black/20 pb-2">
                <span className="md:text-lg text-base">
                  {crypto.rank}. {crypto.name}
                </span>
                <Image
                  className="w-[40px] h-[40px]"
                  src={crypto.iconUrl}
                  width={30}
                  height={30}
                  alt={crypto.name}
                />
              </div>
              <div className="flex flex-col mt-9 gap-4">
                <p>
                  {" "}
                  Price:{" "}
                  <span className="text-gray-500">
                    {millify(crypto.price, { precision: 4 })}
                  </span>{" "}
                </p>
                <p>
                  {" "}
                  Market Cap:{" "}
                  <span className="text-gray-500">
                    {" "}
                    {millify(crypto.marketCap)}{" "}
                  </span>{" "}
                </p>
                <p>
                  {" "}
                  Daily Change:{" "}
                  <span className="text-gray-500">
                    {millify(crypto.change)}%{" "}
                  </span>{" "}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CryptocurrencyContent;

import React from "react";
import { useGetCryptosQuery } from "@/src/services/cryptoApi";
import millify from "millify";
import Link from "next/link";
import CryptocurrencyContent from "./Cryptocurrency";
import NewsContent from "./News";
import Loading from "./Loading";

function HomePage() {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loading />;

  return (
    <div className="md:ms-[300px] md:mt-0 mt-20">
      <div className="p-4">
        <h1 className="md:text-3xl text-lg font-semibold">
          Global Crypto Stats
        </h1>
        <div className="mt-5">
          <div className="flex">
            <div className="flex flex-col w-1/2">
              <p className="md:text-lg text-base text-gray-500">
                {" "}
                Total Cryptocurrency :{" "}
              </p>
              <p className="md:text-xl text-lg text-gray-500">
                {" "}
                {millify(globalStats.total)}{" "}
              </p>
            </div>

            <div className="flex flex-col w-1/2">
              <p className="md:text-lg text-base  text-gray-500">
                {" "}
                Total Exchanges :{" "}
              </p>
              <p className="md:text-xl text-lg  text-gray-500">
                {millify(globalStats.totalExchanges)}
              </p>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="flex flex-col w-1/2">
              <p className="md:text-lg text-base text-gray-500">
                {" "}
                Total Market Cap :{" "}
              </p>
              <p className="md:text-xl text-lg text-gray-500">
                {" "}
                {millify(globalStats.totalMarketCap)}{" "}
              </p>
            </div>

            <div className="flex flex-col w-1/2">
              <p className="md:text-lg text-base text-gray-500">
                {" "}
                Total 24h Volume :{" "}
              </p>
              <p className="md:text-xl text-lg text-gray-500">
                {" "}
                {millify(globalStats.total24hVolume)}{" "}
              </p>
            </div>
          </div>
          <div className="flex  mt-5">
            <div className="flex flex-col w-1/2">
              <p className="md:text-lg text-base text-gray-500">
                {" "}
                Total Markets :{" "}
              </p>
              <p className="md:text-xl text-lg text-gray-500">
                {millify(globalStats.totalMarkets)}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex justify-between mb-6 pe-5">
            <h3 className="md:text-2xl text-lg">
              {" "}
              Top 10 Cryptocurrencys in the World{" "}
            </h3>
            <h4>
              <Link
                className="md:text-xl text-base text-blue-500 "
                href="/cryptocurrency"
              >
                {" "}
                Show more
              </Link>
            </h4>
          </div>
          <CryptocurrencyContent simplified />
        </div>

        <div className="mt-12">
          <div className="flex justify-between pe-5">
            <h3 className="md:text-2xl text-lg mb-5">
              {" "}
              Recent News About Cryptocurrencys{" "}
            </h3>
            <h4>
              <Link
                className="md:text-xl text-base text-blue-500 "
                href="/news"
              >
                {" "}
                Show more
              </Link>
            </h4>
          </div>
          <NewsContent simplified />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

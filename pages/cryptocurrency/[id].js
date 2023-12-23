import Layout from "@/src/components/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import millify from "millify";
import Link from "next/link";

// icons
import { BsCurrencyDollar } from "react-icons/bs";
import { CiHashtag, CiDollar } from "react-icons/ci";
import { TfiCup } from "react-icons/tfi";
import { FaChartLine, FaCheck } from "react-icons/fa6";
import { RiExchangeCnyFill } from "react-icons/ri";
import { PiWarningCircle } from "react-icons/pi";
import { HiXMark } from "react-icons/hi2";

import {
  useGetCryptoDetailsQuery,
  useGetCryptosQuery,
  useGetCryptoHistoryQuery,
} from "@/src/services/cryptoApi";
import LineChart from "@/src/components/lineChart";
import Loading from "@/src/components/Loading";

function SingleCoinPage() {
  const route = useRouter();
  const coinId = Number(route.query.id);
  // time period 3h 24h 7d 30d 3m 1y 3y 5y
  const times = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState([]);
  const uuid = cryptos[coinId - 1];
  const { data: cryptoDetails, isFetching: load } =
    useGetCryptoDetailsQuery(uuid);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ uuid, timePeriod });
  const [singleCoin, setSingleCoin] = useState();

  useEffect(() => {
    if (data?.data?.coins) {
      setCryptos(data.data.coins.map((coin) => coin.uuid));
    }
  }, [data]);

  useEffect(() => {
    setSingleCoin(cryptoDetails?.data?.coin);
  }, [cryptoDetails]);

  console.log("singleCoin", singleCoin);

  if (isFetching && load) {
    return <Loading />;
  }

  return (
    <Layout title={singleCoin?.name}>
      <div className="ms-[300px] p-4">
        <div className="flex flex-col justify-center items-center text-center w-full border-b border-black/50 pb-10">
          <p className="text-4xl font-semibold text-blue-600">
            {singleCoin?.name} Price
          </p>
          <p className="text-xl font-normal text-blue-400">
            {singleCoin?.description}
          </p>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col justify-center items-center w-full pt-10">
                <p className="text-2xl font-semibold">
                  {singleCoin?.name} Value Statics
                </p>
                <p className="text-xl font-normal text-gray-400">
                  An overview showing the stats of {singleCoin?.name}
                </p>
              </div>
              <div className="flex justify-between border-b border-b-gray-400 p-3">
                <div className="flex justify-center items-center gap-2">
                  <BsCurrencyDollar />
                  <p>Price To USD</p>
                </div>
                <p> {millify(singleCoin?.price, { precision: 4 })} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <CiHashtag />
                  <p>Rank</p>
                </div>
                <p> {singleCoin?.rank} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <CiHashtag />
                  <p>24h Volume</p>
                </div>
                <p> {millify(singleCoin?.["24hVolume"])} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <CiDollar />
                  <p>Market Cap</p>
                </div>
                <p> {millify(singleCoin?.marketCap)} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <TfiCup />
                  <p>All Time High</p>
                </div>
                <p> {millify(singleCoin?.allTimeHigh?.price)} </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col justify-center items-center w-full pt-10">
                <p className="text-2xl font-semibold">Other Statics</p>
                <p className="text-xl font-normal text-gray-400">
                  An overview showing the stats of {singleCoin?.name}
                </p>
              </div>
              <div className="flex justify-between border-b border-b-gray-400 p-3">
                <div className="flex justify-center items-center gap-2">
                  <FaChartLine />
                  <p>Number Of Markets</p>
                </div>
                <p> {singleCoin?.numberOfMarkets} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <RiExchangeCnyFill />
                  <p>Number of Exchanges</p>
                </div>
                <p> {singleCoin?.numberOfExchanges} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <PiWarningCircle />
                  <p> Aprroved Supply </p>
                </div>
                {singleCoin?.supply?.confirmed ? <FaCheck /> : <HiXMark />}
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <PiWarningCircle />
                  <p>Total Supply</p>
                </div>
                <p> {millify(singleCoin?.supply?.total)} </p>
              </div>
              <div className="flex justify-between border-b border-gray-400 p-3 ">
                <div className="flex justify-center items-center gap-2">
                  <PiWarningCircle />
                  <p>Circulating Supply</p>
                </div>
                <p> {millify(singleCoin?.supply?.circulating)} </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex mt-5">
            <select
              defaultValue="7d"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              {times.map((time, index) => (
                <option key={index}>{time}</option>
              ))}
            </select>
          </div>

          <div className="mt-10 w-full">
            <LineChart
              coinHistory={coinHistory}
              currentPrice={millify(singleCoin?.price, { precision: 4 })}
              coinName={singleCoin?.name}
            />
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-medium text-blue-600">
              {" "}
              {singleCoin?.name} Links{" "}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-5">
              {singleCoin?.links.map((link) => (
                <div className="flex justify-between">
                  <p className="text-lg "> {link?.type} </p>
                  <Link
                    className="text-blue-400 text-lg underline"
                    href={link?.url}
                  >
                    {" "}
                    {link?.name}{" "}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SingleCoinPage;

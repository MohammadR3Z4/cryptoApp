import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "@/src/services/cryptoNewsApi";
import Image from "next/image";
import Loading from "./Loading";

function NewsContent({ simplified }) {
  const { data, isFetching } = useGetCryptoNewsQuery();
  const [news, setNews] = useState(data?.data);
  console.log(news);

  if (isFetching) return <Loading />;

  return (
    <div className={`${simplified ? "ms-0" : "ms-[300px] p-4"}`}>
      <h1
        className={`${
          simplified ? "hidden" : "block"
        } text-2xl font-semibold mb-5`}
      >
        {" "}
        Crypto News{" "}
      </h1>
      <div className="flex gap-3 w-full flex-col">
        {news?.slice(simplified ? 20 : 0, 25).map((item, index) => (
          <div className="border border-black flex p-4 gap-4" key={index}>
            <Image
              className="w-auto h-auto rounded-lg"
              src={item.thumbnail}
              width={200}
              height={50}
              alt={item.title}
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold"> {item.title} </h2>
              <h4 className="text-base font-normal"> {item.description} </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsContent;

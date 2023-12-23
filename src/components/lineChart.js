import { data } from "autoprefixer";
import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function LineChart({ coinHistory, currentPrice, coinName }) {
  console.log(coinHistory);
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimeStamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  console.log("coinTimeStamp", coinTimeStamp);

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
    options: {
      responsive: true,
    },
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex gap-5">
          <h2 className="text-3xl font-bold"> {coinName} Price Chart </h2>
        </div>
        <div className="flex gap-4">
          <p className="font-semibold">{coinHistory?.data?.change} % </p>
          <p className="font-semibold text-lg">
            Current {coinName} Price: ${currentPrice}
          </p>
        </div>
      </div>
      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;

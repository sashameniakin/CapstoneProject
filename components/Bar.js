import {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";

const BarGrafik = ({diagram, coins}) => {
  const nameArray = diagram?.map(element => {
    return element.name;
  });

  const amountArray = diagram?.map(element => {
    return element.amount;
  });

  const costArray = diagram?.map(element => {
    return element.inDollars;
  });

  const actualPriceArray = diagram
    ?.map(element => {
      const object = coins?.filter(coin => coin.name === element.name);
      return object[0]?.quote?.USD?.price.toFixed(2);
    })
    .map((element, i) => {
      return amountArray[i] * element;
    });

  const profitLossArray = actualPriceArray?.map((element, i) => {
    return element - costArray[i];
  });

  console.log(profitLossArray);

  const borderColorArray = diagram?.map(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  });

  const backgroundColorArray = borderColorArray?.map(color => {
    return color + "94";
  });

  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
    labels: ["Red", "Blue", "Yellow"],
  });

  useEffect(() => {
    const labels = [];
    const profitLoss = [];

    nameArray?.map(value => {
      labels.push(value);
    });
    profitLossArray?.map(value => {
      profitLoss.push(value);
    });
    setData({
      datasets: [
        {
          label: "profit/loss in $",
          data: /* profitLoss */ [23, 32, -34, 10, 5],
          backgroundColor: backgroundColorArray,
          borderColor: borderColorArray,
          borderWidth: 1,
        },
      ],
      labels: labels,
    });
  }, [diagram]);
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {color: "white"},
      },
      x: {
        ticks: {color: "white"},
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "left",

        labels: {
          color: "white",
          boxWidth: 0,
        },
      },
    },
  };

  return <Bar data={data} height={400} options={options} width={400} />;
};

export default BarGrafik;
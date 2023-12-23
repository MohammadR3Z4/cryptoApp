// MENU
// icons
import { SlHome } from "react-icons/sl";
import { FaChartLine } from "react-icons/fa6";
import { MdCurrencyBitcoin } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";

export const faMenuItems = [
  {
    label: "Home",
    icon: <SlHome />,
    path: "/",
  },
  {
    label: "Cryptocurrency",
    icon: <FaChartLine />,
    path: "/cryptocurrency",
  },
  {
    label: "Exchange",
    icon: <MdCurrencyBitcoin />,
    path: "/exchange",
  },
  {
    label: "News",
    icon: <ImNewspaper />,
    path: "/news",
  },
];

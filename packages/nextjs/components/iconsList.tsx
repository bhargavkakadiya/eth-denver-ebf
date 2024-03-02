import Air from "../components/Icons/Air";
import Carbon from "../components/Icons/Carbon";
import Diversity from "../components/Icons/Diversity";
import Equity from "../components/Icons/Equity";
import Soil from "../components/Icons/Soil";
import Water from "../components/Icons/Water";

const list = [
  {
    name: "Air",
    icon: Air({ width: 50, height: 50,color:"white" }),
    color:"#AED6F1"
  },
  {
    name: "Soil",
    icon: Soil({ width: 50, height: 50 }),
    color:"#58D68D"
  },
  {
    name: "Diversity",
    icon: Diversity({ width: 50, height: 50 }),
    color:"#F4D03F"
  },
  {
    name: "Water",
    icon: Water({ width: 50, height: 50 }),
    color:"#5DADE2"
  },
  {
    name: "Equity",
    icon: Equity({ width: 50, height: 50 }),
    color:"#E74C3C"
  },
  {
    name: "Carbon",
    icon: Carbon({ width: 50, height: 50 }),
    color:"#7DCEA0"
  },
];

export default list;

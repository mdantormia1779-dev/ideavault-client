import Image from "next/image";
import Banner from "./Components/Banner/Banner";
import CategoriesSection from "./Components/CategoriesSection/CategoriesSection";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import Sixitem from "./Components/SixItem/Sixitem";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Sixitem></Sixitem>
      <CategoriesSection></CategoriesSection>
      <HowItWorks></HowItWorks>
    </div>
  );
}

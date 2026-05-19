import Image from "next/image";
import Banner from "./Components/Banner/Banner";
import CategoriesSection from "./Components/CategoriesSection/CategoriesSection";
import HowItWorks from "./Components/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <CategoriesSection></CategoriesSection>
      <HowItWorks></HowItWorks>
    </div>
  );
}

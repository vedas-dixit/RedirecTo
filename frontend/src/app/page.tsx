import CardSection from "../../component/HomePage/CardSection";
import Footer from "../../component/HomePage/Footer";
import Header from "../../component/HomePage/header";
import HomeComponent from "../../ParentComponent/HomeComponent";

export default function Home() {
  return (
    <>
      <Header />
      <HomeComponent />
      <CardSection />
      <Footer />
    </>
  );
}

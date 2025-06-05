import CardSection from "@/components/blobs/CardSection";
import Footer from "@/components/blobs/Footer";
import Header from "@/components/blobs/header";
import HomeComponent from "@/components/pages/HomeComponent";

export default function Home() {
  return (
    <>
      <Header />
      <HomeComponent />
      <CardSection/>
      <Footer/>
    </>
  );
}

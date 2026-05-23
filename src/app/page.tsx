import Header from "@/components/header";
import Hero from "@/components/hero";
import ClientLogos from "@/components/client-logos";
import Features from "@/components/features";
import ProductDemo from "@/components/product-demo";
import VideoDemo from "@/components/video-demo";
import RoiCalculator from "@/components/roi-calculator";
import Comparison from "@/components/comparison";
import HowItWorks from "@/components/how-it-works";
import Stats from "@/components/stats";
import Pricing from "@/components/pricing";
import Security from "@/components/security";
import Cases from "@/components/cases";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ClientLogos />
      <Features />
      <ProductDemo />
      <VideoDemo />
      <RoiCalculator />
      <Comparison />
      <HowItWorks />
      <Stats />
      <Pricing />
      <Security />
      <Cases />
      <FAQ />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  );
}

import dynamic from "next/dynamic";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ClientLogos from "@/components/client-logos";
import Features from "@/components/features";
import Footer from "@/components/footer";

const ProductDemo = dynamic(() => import("@/components/product-demo"));
const VideoDemo = dynamic(() => import("@/components/video-demo"));
const RoiCalculator = dynamic(() => import("@/components/roi-calculator"));
const Comparison = dynamic(() => import("@/components/comparison"));
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const Stats = dynamic(() => import("@/components/stats"));
const Pricing = dynamic(() => import("@/components/pricing"));
const Security = dynamic(() => import("@/components/security"));
const Cases = dynamic(() => import("@/components/cases"));
const FAQ = dynamic(() => import("@/components/faq"));
const Contact = dynamic(() => import("@/components/contact"));
const ChatWidget = dynamic(() => import("@/components/chat-widget"), {
  ssr: false,
});

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
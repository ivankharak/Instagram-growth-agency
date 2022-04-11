import Hero from "./Hero";
import Logocloud from "./Logocloud";
import Feature from "./Feature";
import Cta from "./Cta";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import Team from "./Team";
import Comparison from "./Comparison";
import Newsletter from "./Newsletter";

function Landing() {
  return (
    <article className="bg-gray-900">
      <Hero />
      <Logocloud />
      <Feature />
      <Cta />
      <Stats />
      <Pricing />
      <Testimonials />
      <Team />
      <Comparison />
      <Newsletter/>
    </article>
  );
}

export default Landing;

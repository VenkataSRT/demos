import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SectionNav from "./components/SectionNav";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import {
  About,
  Leadership,
  Work,
  Conversation,
  Mentorship,
  Published,
} from "./components/Sections";
import { useLang } from "./i18n/LanguageProvider";

export default function App() {
  const { t } = useLang();

  return (
    <>
      <a className="skip-link" href="#main">
        {t("Skip to main content")}
      </a>

      <div className="topbar">
        <div className="shell topbar-inner">
          <LanguageSwitcher />
        </div>
      </div>

      <Hero />
      <Marquee />
      <SectionNav />

      <main id="main">
        <About />
        <Leadership />
        <Work />
        <Conversation />
        <Mentorship />
        <Published />
        <Gallery />
        <Contact />
        <Booking />
      </main>

      <Footer />
    </>
  );
}
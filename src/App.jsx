import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Method from './components/Method.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Projects />
        <Method />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

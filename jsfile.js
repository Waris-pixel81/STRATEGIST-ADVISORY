import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

AOS.init({
  duration: 1000, // durée de l’animation (ms)
  once: true,     // animation une seule fois
  offset: 120,    // distance avant déclenchement
});

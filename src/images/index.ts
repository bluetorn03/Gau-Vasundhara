// Central export for all approved sanctuary assets located in src/images
import sanctuaryHeroBanner from './sanctuary-hero-banner.webp';
import gangaCow from './ganga-cow.avif';
import kamdhenuCow from './kamdhenu-cow.avif';
import nandiniCow from './nandini-cow.avif';
import kaveriElderCow from './kaveri-elder-cow.webp';
import dhruvCalf from './dhruv-calf.webp';
import vedicGhee500 from './vedic-a2-ghee-500ml.webp';
import vedicGhee1000 from './vedic-a2-ghee-1000ml.webp';
import gheeLipButter from './ghee-lip-butter-kansa.webp';
import panchagavyaSoap from './panchagavya-soap.webp';
import guggalDhoop from './guggal-loban-dhoop.webp';
import jeevamritBooster from './jeevamrit-booster.webp';
import tourDayVisit from './tour-day-visit.webp';
import tourCowCuddling from './tour-cow-cuddling.webp';
import tourEcoCottage from './tour-eco-cottage.webp';
import blogBilona from './blog-bilona-churning.webp';
import blogIndigenousCows from './blog-indigenous-cows.webp';
import logoImg from './logo.png';
import gauLogoImg from './gau-vasundhara-png-logo.png';
import faviconImg from './gau-favicon-cion.png';

export const sanctuaryImages = {
  // Brand & Logos
  logo: logoImg,
  brandLogo: gauLogoImg,
  favicon: faviconImg,

  // Pastures & Sanctuary Architecture
  heroBanner: sanctuaryHeroBanner,
  pastureLandscape: sanctuaryHeroBanner,

  // Cows (Indigenous & Elder)
  cows: {
    ganga: gangaCow,
    kamdhenu: kamdhenuCow,
    nandini: nandiniCow,
    kaveriElder: kaveriElderCow,
    dhruvCalf: dhruvCalf,
  },

  // E-commerce Products
  products: {
    ghee500ml: vedicGhee500,
    ghee1000ml: vedicGhee1000,
    lipButterKansa: gheeLipButter,
    panchagavyaSoap: panchagavyaSoap,
    guggalDhoop: guggalDhoop,
    jeevamritBooster: jeevamritBooster,
  },

  // Tourism & Rural Experiences
  tours: {
    dayVisit: tourDayVisit,
    cowCuddling: tourCowCuddling,
    ecoCottage: tourEcoCottage,
  },

  // Stories, Blogs & Educational Facilities
  stories: {
    bilonaChurning: blogBilona,
    indigenousBreeds: blogIndigenousCows,
  },
};

export default sanctuaryImages;

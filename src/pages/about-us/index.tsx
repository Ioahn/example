import {
  AboutProject,
  CommonBanner,
  Contacts,
  Founders,
  SpecialistEducation,
  WhySense,
  aboutUs,
} from '@features/landing';
import { CommonFooter, HeaderWithOverlay, Navigation } from '@shared/UI';
import { APP_TYPES } from '@shared/constants';

export const getStaticProps = () => {
  return {
    props: { aboutUs, type: APP_TYPES.LANDING },
  };
};

const AboutUs: FCC<{ aboutUs: typeof aboutUs }> = function AboutUs({
  aboutUs,
}) {
  const { banner, founders, aboutProject, education, footer, navigation } =
    aboutUs;

  return (
    <div className='relative'>
      <HeaderWithOverlay
        variant='secondary'
        className='z-20 max-md:absolute w-full relative'
        elements={() => (
          <Navigation menus={navigation} className='ml-4 w-full' />
        )}
      />
      <main className='relative max-md:overflow-hidden'>
        <div className='h-20' />
        <CommonBanner
          quote={banner.quote}
          title={banner.title}
          image={banner.image}
          button={banner.button}
        />
        <Founders title={founders.title} blocks={founders.blocks} />
        <AboutProject
          title={aboutProject.title}
          subtitle={aboutProject.subtitle}
          cards={aboutProject.cards}
        />
        <WhySense />
        <SpecialistEducation
          title={education.title}
          description={education.description}
          programs={education.programs}
        />
        <Contacts />
      </main>
      <CommonFooter menus={footer} />
    </div>
  );
};

export default AboutUs;

import {
  BusinessAboutUs,
  BusinessAdvantages,
  CommonBanner,
  Goals,
  Process,
  RequestForm,
  Solution,
  businessA,
} from '@features/landing';
import { CommonFooter, HeaderWithOverlay, Navigation } from '@shared/UI';
import { APP_TYPES } from '@shared/constants';

export const getStaticProps = () => {
  return {
    props: { businessA, type: APP_TYPES.LANDING },
  };
};

const LandingPage: FCC<{ businessA: typeof businessA }> = function LandingPage({
  businessA,
}) {
  const {
    banner,
    aboutUs,
    goals,
    advantages,
    process,
    footer,
    navigation,
    solution,
  } = businessA;

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
        <Goals
          title={goals.title}
          subtitle={goals.subtitle}
          blocks={goals.blocks}
        />
        <BusinessAdvantages
          title={advantages.title}
          subtitle={advantages.subtitle}
          cards={advantages.cards}
        />
        <Process title={process.title} steps={process.steps} />
        <Solution
          advantages={solution.advantages}
          title={solution.title}
          card={solution.card}
        />
        <BusinessAboutUs
          image={aboutUs.image}
          subtitle={aboutUs.subtitle}
          title={aboutUs.title}
          description={aboutUs.description}
          cards={aboutUs.cards}
        />
        <RequestForm />
        <div className='h-20' />
      </main>
      <CommonFooter menus={footer} />
    </div>
  );
};

export default LandingPage;

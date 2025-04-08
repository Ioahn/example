import React from 'react';
import Marquee from 'react-fast-marquee';
import {
  Banner,
  CTABanner,
  Founder,
  HowAreGoingProcess,
  HowWeHireSpecialists,
  InfiniteMarque,
  Links,
  OftenQ,
  Recommendation,
  home as homeContent,
} from '@features/landing';
import { CommonFooter, HeaderWithOverlay, Navigation } from '@shared/UI';
import { APP_TYPES } from '@shared/constants';

export const getStaticProps = () => {
  return {
    props: { home: homeContent, type: APP_TYPES.LANDING },
  };
};

export default function LandingPage({ home }: { home: typeof homeContent }) {
  const {
    howWeHireSpecialists,
    founder,
    banners,
    navigation,
    footer,
    specialists,
    cta_banner,
    recommendation,
    questions,
  } = home;

  return (
    <div className='relative'>
      <HeaderWithOverlay
        variant='secondary'
        className='z-20 max-md:absolute w-full relative'
        elements={() => (
          <Navigation menus={navigation} className='md:ml-4 ml-auto w-full' />
        )}
      />
      <main className='relative max-md:overflow-hidden'>
        <CTABanner {...cta_banner}>
          <InfiniteMarque specialists={specialists} />
        </CTABanner>

        <Founder {...founder} />

        <Marquee autoFill>
          <p className='uppercase font-galaxy-semibold text-content-tertiary/20 mr-4'>
            Конфиденциальность
          </p>
          <p className='font-galaxy-semibold -mt-3 text-content-tertiary/20 mr-4'>
            ·
          </p>
          <p className='uppercase font-galaxy-semibold text-content-tertiary/20 mr-4'>
            Уважение к вам и вашим ценностям
          </p>
          <p className='font-galaxy-semibold -mt-3 text-content-tertiary/20 mr-4'>
            ·
          </p>
        </Marquee>

        <div className='flex flex-col'>
          {banners?.map?.((banner) => (
            <Banner key={banner.title} {...banner} />
          ))}
        </div>

        <HowWeHireSpecialists {...howWeHireSpecialists} />
        <HowAreGoingProcess />
        <Recommendation items={recommendation} />
        <OftenQ items={questions} />
        <Links />
      </main>
      <CommonFooter menus={footer} />
    </div>
  );
}

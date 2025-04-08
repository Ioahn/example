import { cn } from '@shared/utils';
import { Button, Container, Image } from '@shared/UI';

export const Links = function Links() {
  return (
    <section>
      <Container
        className={cn('grid-cols-6 grid md:grid-cols-12 gap-x-8')}
        type='landing'
      >
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <h3 className='col-span-6 md:col-span-12 font-galaxy-semibold text-center'>
          Остались вопросы?
        </h3>
        <div className='h-4 col-span-6 md:col-span-12' />
        <p className='col-span-6 md:col-span-12 font-rock text-center'>
          Напишите нам и мы поможем найти подходящего специалиста.
        </p>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <div className='col-span-6 md:col-start-4 flex justify-between text-content-secondary'>
          <div className='flex flex-col items-center gap-4'>
            <Button
              className='relative md:w-[5rem] md:h-[5rem] w-[2rem] h-[2rem] max-w-none'
              variant='clear'
              onPress={() => carrotquest.open()}
            >
              <Image
                src='/landing/home/Carrot.png'
                alt='carrot'
                fill
                className='object-contain'
              />
            </Button>
            <span className='font-base'>Онлайн чат</span>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Button
              className='relative md:w-[5rem] md:h-[5rem] w-[2rem] h-[2rem] max-w-none'
              variant='clear'
              as='link'
              href='mailto:team@sense-a.ru'
            >
              <Image
                src='/landing/home/Email.png'
                alt='email'
                fill
                className='object-contain'
              />
            </Button>
            <span className='font-base'>По почте</span>
          </div>
          {/*<div className='flex flex-col items-center gap-4'>*/}
          {/*  <Button*/}
          {/*    className='relative md:w-[5rem] md:h-[5rem] w-[2rem] h-[2rem] max-w-none'*/}
          {/*    variant='clear'*/}
          {/*  >*/}
          {/*    <Image*/}
          {/*      src='/landing/home/WhatsApp.png'*/}
          {/*      alt='carrot'*/}
          {/*      fill*/}
          {/*      className='object-contain'*/}
          {/*    />*/}
          {/*  </Button>*/}
          {/*  <span className='font-base'>WhatsApp</span>*/}
          {/*</div>*/}
          <div className='flex flex-col items-center gap-4'>
            <Button
              className='relative md:w-[5rem] md:h-[5rem] w-[2rem] h-[2rem] max-w-none'
              variant='clear'
              onPress={() =>
                window.open(
                  `https://t.me/sense_a_bot?start=${carrotquest.data.user.id}`
                )
              }
            >
              <Image
                src='/landing/home/Telegram.png'
                alt='telegram'
                fill
                className='object-contain'
              />
            </Button>
            <span className='font-base'>Telegram</span>
          </div>
        </div>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
      </Container>
    </section>
  );
};

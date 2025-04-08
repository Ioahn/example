import { Container, Image } from '@shared/UI';

export const WhySense = function WhySense() {
  return (
    <section className='bg-bg-primary'>
      <div className='h-14' />
      <Container
        className='flex justify-center items-center flex-col gap-4 text-center'
        type='landing'
      >
        <p className='font-galaxy-semibold'>Почему Sense-A?</p>
        <p className='font-rock pt-4'>
          В терапии, в коучинге мы говорим о своих чувствах, переживаниях и в то
          же время фантазируем о новом, мечтаем, ставим цели.
        </p>
        <div className='md:hidden'>
          <div className='w-full aspect-w-13 aspect-h-4 relative pt-14'>
            <Image
              src='/landing/about-us/WhySense.png'
              alt='моб'
              className='object-contain'
              fill
            />
          </div>
          <p>
            <span className='font-semibold pt-4'>Сенсей</span> - тот, кто
            уделяет внимание Вашим чувствам и становится поддержкой и опорой на
            пути к Новому.
          </p>
        </div>
        <div className='w-full max-md:hidden aspect-w-13 aspect-h-2 relative pt-28'>
          <Image
            src='/landing/about-us/WhySenseaDesktop.png'
            alt='десктоп'
            className='object-contain'
            fill
          />
        </div>
      </Container>
      <div className='h-14' />
    </section>
  );
};

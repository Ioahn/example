import { cn } from '@shared/utils';
import { Card, Container, Image } from '@shared/UI';

type Props = {
  title: string;
  card: {
    title: string;
    description: string;
  };
  advantages: {
    id: number;
    icon: string;
    text: string;
  }[];
};

export const Solution: FCC<Props> = function Solution({
  className,
  card,
  title,
  advantages,
}) {
  return (
    <section className='bg-black'>
      <Container
        className={cn('flex flex-col text-content-inverse', className)}
        type='landing'
      >
        <div className='h-8 md:h-[3.75rem]' />
        <h2 className='font-galaxy text-center'>{title}</h2>
        <div className='h-12 md:h-[3.75rem]' />
        <div className='max-md:contents flex gap-4'>
          <div className='relative md:w-1/2 max-md:aspect-w-16 max-md:aspect-h-7 z-10'>
            <div className='aspect-w-16 aspect-h-8 md:aspect-h-7 absolute md:w-[454px] w-[288px]'>
              <Card className='px-10 py-16 bg-gradient-to-r from-[#34BEB6] to-[#258F9D] absolute rotate-[-8deg] inset-0' />
            </div>
            <div className='aspect-w-16 aspect-h-8 md:aspect-h-7 absolute md:w-[454px] w-[288px]'>
              <Card className='px-10 py-16 backdrop-blur-lg bg-white/10 absolute inset-0 rotate-[8deg] z-10' />
            </div>
            <div className='aspect-w-16 aspect-h-8 md:aspect-h-7 absolute md:w-[454px] w-[288px]'>
              <Card className='md:px-10 md:py-16 bg-gradient-to-r from-[#FF6422] to-[#FF4F62] flex flex-col gap-4 z-30 text-content-inverse absolute inset-0'>
                <p className='font-rock-semibold uppercase'>{card.title}</p>
                <p className='font-base'>{card.description}</p>
              </Card>
            </div>
          </div>
          <div className='h-14 md:hidden' />
          <ul className='gap-6 flex flex-col md:w-1/2'>
            {advantages.map(({ id, icon, text }) => (
              <li className='flex gap-4 text-content-inverse' key={id}>
                <div className='shrink-0'>
                  <Image src={icon} alt={text} width={24} height={24} />
                </div>
                <span className='font-base'>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-8 md:h-[3.75rem]' />
      </Container>
    </section>
  );
};

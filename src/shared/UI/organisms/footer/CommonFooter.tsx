import { animated, easings, useSpring } from '@react-spring/web';
import { cn } from '@shared/utils';
import { Button, Container, Image, Link } from '@shared/UI';

type TMenuElement = {
  title: string;
  href: string;
};

type Props = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  menus: (TMenuElement & {
    sub_menu?: TMenuElement[];
  })[];
};

export const CommonFooter: FCC<Props> = ({ variant = 'primary', menus }) => {
  const props = useSpring({
    config: {
      duration: 100000,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  return (
    <footer
      className={cn(
        'group bg-bg-inverse-secondary z-20 relative overflow-hidden',
        `footer-${variant}`
      )}
    >
      <Container className='flex items-center justify-center p-4 min-h-[328px]'>
        <p className='md:text-2xl text-lg text-content-inverse text-center'>
          Все только начинается
        </p>
        <div className='absolute w-[328px] h-[328px] overflow-hidden'>
          <animated.div
            className='absolute inset-0 -z-10'
            style={{
              transform: props.x
                .to([0, 1], [0, 360])
                .to((value) => `rotateZ(${value}deg)`),
            }}
          >
            <Image
              src={variant === 'primary' ? '/AccentStar.png' : '/VividStar.png'}
              width={328}
              height={328}
              alt='sensea'
            />
          </animated.div>
        </div>
      </Container>

      <div className='h-[1px] w-full bg-bg-tertiary/50'></div>

      <Container className='py-24 grid md:grid-cols-12 grid-cols-6 gap-4 md:gap-y-10 md:grid-rows-2'>
        <div className='md:col-span-2 col-span-6'>
          <Link href='/' className='h-4'>
            <Image
              alt='SenseA'
              src='/WhiteLogo.png'
              priority
              width={116}
              height={20}
            />
          </Link>
        </div>

        <div className='col-span-2 max-md:hidden' />

        {menus?.map?.(({ title, href, sub_menu }) => (
          <div
            key={title}
            className='md:col-span-2 md:row-span-2 col-span-6 flex flex-col gap-2'
          >
            <Link href={href} className='text-content-inverse font-semibold'>
              {title}
            </Link>

            <div className='flex flex-col gap-2'>
              {sub_menu?.map(({ title, href }) => (
                <Link key={title} href={href} className='text-content-inverse'>
                  {title}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className='md:col-span-3 md:row-start-2 col-span-6'>
          <Button
            className='group-[.footer-primary]:bg-gradient-to-r group-[.footer-primary]:from-[#2CC3B9] group-[.footer-primary]:to-[#FF6422] group-[.footer-secondary]:bg-content-accent group-[.footer-tertiary]:bg-content-accent-vivid'
            fullWidth
            as='link'
            href='/client/select/area-type'
          >
            Записаться на сессию
          </Button>
        </div>
      </Container>
      <Container className='py-4 text-left'>
        <p className='text-xs text-content-inverse'>
          © ИП Федорова С.М., 2024 Все права сохранены за правообладателем
        </p>
      </Container>
    </footer>
  );
};

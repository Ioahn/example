import { cn } from '@shared/utils';
import { Button } from '@shared/UI';
import styles from './styles.module.css';

type Props = {
  variant?: 'primary' | 'secondary';
};

export const ArticleCTA: FCC<Props> = function ArticleCTA({
  className,
  variant = 'primary',
}) {
  return (
    <div
      className={cn(
        'md:p-14 py-10 px-4 relative overflow-hidden',
        `group cta-${variant}`,
        className
      )}
    >
      <div
        className={cn('absolute inset-0 z-0 md:hidden', {
          [styles.radial_gradeint_primary]: variant === 'primary',
          [styles.radial_gradient_secondary]: variant === 'secondary',
        })}
      />
      <div
        className={cn('absolute inset-0 z-0 max-md:hidden', {
          [styles.radial_gradient_primary_md]: variant === 'primary',
          [styles.radial_gradient_secondary_md]: variant === 'secondary',
        })}
      />
      <div className='flex flex-col group-[.cta-primary]:items-center md:gap-8 gap-3 z-10 relative group-[.cta-primary]:text-center'>
        <p className='group-[.cta-primary]:font-rock-semibold group-[.cta-secondary]:font-galaxy-semibold'>
          Нужна помощь специалиста?
        </p>
        <p className='font-stone-semibold'>
          Вы можете выбрать из 100+ психотерапевтов и коучей Sense-A.
        </p>
        <div className='md:hidden h-4' />
        <Button
          as='link'
          href='/client/select/area-type'
          className='!font-stone-semibold max-sm:max-w-none max-sm:w-full'
        >
          Выбрать специалиста
        </Button>
      </div>
    </div>
  );
};

import { cn } from '@shared/utils';
import { Card, Link } from '@shared/UI';

export const DifferenceInfo: FCC = ({ className }) => {
  return (
    <Card
      className={cn('flex flex-col gap-2 shadow-2xl text-xs', className)}
      variant='secondary'
    >
      <p className='text-base'>Что выбрать?</p>
      <ul className='flex flex-col gap-2 list-disc pl-4'>
        <li>
          <span className='text-content-accent font-bold'>Психотерапия</span> -
          про чувства и эмоции, спокойный темп работы.
        </li>
        <li>
          <span className='text-content-accent-vivid font-bold'>Коучинг</span> -
          цели и задачи, фокус на конкретные шаги и действия, концентрированный
          процесс.
        </li>
      </ul>
      <p>
        Читайте подробнее в нашем{' '}
        <Link href='/AllArticlePage' className='text-content-accent'>
          блоге
        </Link>
      </p>
      <p>
        Для консультации по выбору специалиста{' '}
        <Link href='/' className='text-content-accent-vivid'>
          свяжитесь с нами
        </Link>
      </p>
    </Card>
  );
};

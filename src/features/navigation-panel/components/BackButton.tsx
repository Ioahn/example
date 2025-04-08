import { useRouter } from 'next/dist/client/components/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Button } from '@shared/UI';

export const BackButton: FCC = function BackButton({ className }) {
  const router = useRouter();

  const back = () => {
    router.back();
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className={className}>
      <Button
        onPress={back}
        variant='clear'
        startIcon={<RiArrowLeftLine className='text-md' />}
        className='hidden text-content-secondary' // temp hidden
      >
        Назад
      </Button>

      <Button
        onPress={back}
        variant='clear'
        size='icon'
        className='hidden bg-bg-secondary rounded-full p-2' // temp hidden
        startIcon={<RiArrowLeftLine className='text-lg' />}
      />
    </div>
  );
};

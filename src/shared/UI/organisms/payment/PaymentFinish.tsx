import { cn } from '@shared/utils';
import { Container } from '@shared/UI';

export function PaymentFinish({ children, className }: CommonProps) {
  return (
    <div className={cn('bg-bg-primary', className)}>
      <Container className='h-screen items-center max-w-lg relative overflow-hidden'>
        {children}
      </Container>
    </div>
  );
}

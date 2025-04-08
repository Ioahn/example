type Props = {
  one_session_price: number;
};

export const Price: FCC<Props> = ({ className, one_session_price }) => (
  <div className={className}>
    <span className='text-md font-bold'>{one_session_price}₽/</span>
    <span className='text-content-secondary'>50 минут</span>
  </div>
);

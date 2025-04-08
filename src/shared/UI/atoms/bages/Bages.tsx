type Props = {
  text: string;
};

export const Bages: FCC<Props> = ({ text }) => {
  return (
    <div className='inline-block bg-white text-center text-sm outline-1 outline-cyan-400'>
      {text}
    </div>
  );
};

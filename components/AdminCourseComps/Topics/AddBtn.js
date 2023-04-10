import ZicopsButton from '@/components/common/ZicopsButton';

export default function AddBtn({ display = '', handleClick = () => {} }) {
  return (
    <>
      <ZicopsButton
        display={display}
        handleClick={handleClick}
        fontSize="1rem"
        padding="0.4em 0.5em"
      />
    </>
  );
}

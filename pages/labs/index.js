import Pacman from '../../components/Labs/Pacman';

export default function LabsPage() {
  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        // marginTop: '50px',
        padding: 0
      }}>
      <div
        style={{
          // display: 'flex',
          marginTop: '70px',
          // padding: '5vh 4vw',
          backgroundColor: 'var(--black)',
          height: '75vh',
          overflow: 'hidden'
        }}>
        <Pacman />
      </div>
    </div>
  );
}

import Pacman from '../components/Labs/Pacman';

export default function labs() {
  return (
    <div
      style={{
        backgroundColor: 'var(--tile-bg)',
        overflow: 'hidden',
        margin: 0,
        marginTop: '50px',
        padding: 0
      }}>
      <Pacman />
    </div>
  );
}

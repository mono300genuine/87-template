import { useVideoConfig } from 'remotion';
import Cross from './Cross';
import Lamp from './Lamp';

interface BackgroundProps {
  scene: number;
}

const Background = ({ scene }: BackgroundProps) => {
  const { width, height } = useVideoConfig();
  const crossArray = [];

  for (let i = 0; i < width / 250; i++)
    for (let j = 0; j < height / 250; j++) {
      const cross = (
        <div
          style={{
            position: 'absolute',
            left: 250 * i - 50,
            top: 250 * j - 125 * (i % 2) - 50,
          }}
          key={`${i} - ${j}`}
        >
          <Cross color="white" seed={Math.random() * 50} />
        </div>
      );

      crossArray.push(cross);
    }
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'black',
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {crossArray}
      {(scene === 1 || scene === 6) && (
        <>
          <div style={{ position: 'absolute' }}>
            <Lamp />
          </div>
          <div
            style={{ position: 'absolute', left: 0, top: 0, transform: `translate(-50%, -50%)` }}
          >
            <Lamp />
          </div>
          <div
            style={{ position: 'absolute', bottom: 0, right: 0, transform: `translate(50%, 50%)` }}
          >
            <Lamp />
          </div>
        </>
      )}
      {(scene === 2 || scene === 5) && (
        <>
          <div style={{ position: 'absolute', left: -250, top: -250 }}>
            <Lamp />
          </div>
        </>
      )}
      {(scene === 3 || scene === 4) && (
        <>
          <div style={{ position: 'absolute', right: -250, top: -250 }}>
            <Lamp />
          </div>
        </>
      )}
    </div>
  );
};

export default Background;

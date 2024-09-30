import { AbsoluteFill, Img, Audio, Sequence, useVideoConfig } from 'remotion';
import { scene6Schema } from './SceneSchemas';
import { z } from 'zod';
import Background from './components/Background';
import Circle from './components/Circle';

type Scene6Props = z.infer<typeof scene6Schema>;

const Scene6: React.FC<Scene6Props> = ({ logo, audio }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sequence from={20}>
        <Audio src={audio} />
      </Sequence>
      <div style={{ position: 'absolute', width, height }}>
        <Background scene={6} />
      </div>
      <div
        style={{
          position: 'relative',
          width,
          height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div>
          <Img src={logo} width={500} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Circle radius={200} strokeColor="#5118DB" strokeWidth={40} />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        >
          <Circle radius={200} strokeColor="#5118DB" strokeWidth={40} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene6;

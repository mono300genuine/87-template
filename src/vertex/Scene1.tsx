import { AbsoluteFill, Audio, Sequence, useVideoConfig } from 'remotion';
import { scene1Schema } from './SceneSchemas';
import { z } from 'zod';
import Logo from './components/Logo';
import Background from './components/Background';
import Circle from './components/Circle';

type Scene1Props = z.infer<typeof scene1Schema>;

const Scene1: React.FC<Scene1Props> = ({ logo, audio }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Sequence from={10}>
        <Audio src={audio} />
      </Sequence>
      <div style={{ position: 'absolute', width, height }}>
        <Background scene={1} />
      </div>
      <div style={{ position: 'relative', width: 500, height: 500 }}>
        <Sequence from={-40}>
          <Logo logo={logo} radius={250} direction="center" />
          <div
            style={{
              position: 'absolute',
              left: -600,
              top: -300,
            }}
          >
            <Circle radius={200} strokeColor="#5118DB" strokeWidth={40} />
          </div>
          <div
            style={{
              position: 'absolute',
              right: -600,
              bottom: -300,
            }}
          >
            <Circle radius={200} strokeColor="#5118DB" strokeWidth={40} />
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

export default Scene1;

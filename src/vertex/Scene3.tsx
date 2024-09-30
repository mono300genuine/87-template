import { AbsoluteFill, Audio, Sequence, useVideoConfig } from 'remotion';
import { scene3Schema } from './SceneSchemas';
import { z } from 'zod';
import Logo from './components/Logo';
import Image from './components/Image';
import Background from './components/Background';

type Scene3Props = z.infer<typeof scene3Schema>;

const Scene3: React.FC<Scene3Props> = ({ img, logo, audio }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={20}>
        <Audio src={audio} />
      </Sequence>
      <div style={{ position: 'absolute', width, height }}>
        <Background scene={3} />
      </div>
      <div
        style={{
          display: 'flex',
          margin: '100px',
          paddingTop: '100px',
          justifyContent: 'space-between',
        }}
      >
        <Image img={img} radius={400} strokeColor="#5118DB" strokeWidth={50} />
        <div style={{ position: 'relative' }}>
          <Logo logo={logo} radius={180} direction="from-right" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene3;

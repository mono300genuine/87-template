import { AbsoluteFill, Sequence, useVideoConfig, Audio } from 'remotion';
import { scene4Schema } from './SceneSchemas';
import { z } from 'zod';
import Image from './components/Image';
import Logo from './components/Logo';
import Background from './components/Background';

type Scene4Props = z.infer<typeof scene4Schema>;

const Scene4: React.FC<Scene4Props> = ({ img, logo, audio }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={20}>
        <Audio src={audio} />
      </Sequence>
      <div style={{ position: 'absolute', width, height }}>
        <Background scene={4} />
      </div>
      <Sequence from={-10}>
        <div
          style={{
            display: 'flex',
            margin: '100px',
            paddingTop: '100px',
            justifyContent: 'space-between',
            width,
          }}
        >
          <Image img={img} radius={400} strokeColor="#5118DB" strokeWidth={50} />
          <div style={{ position: 'relative' }}>
            <Logo logo={logo} radius={180} direction="from-right" />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export default Scene4;

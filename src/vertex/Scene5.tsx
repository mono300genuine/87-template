import { AbsoluteFill, Sequence, useVideoConfig, Audio } from 'remotion';
import { scene5Schema } from './SceneSchemas';
import { z } from 'zod';
import Image from './components/Image';
import Logo from './components/Logo';

type Scene5Props = z.infer<typeof scene5Schema>;

const Scene5: React.FC<Scene5Props> = ({ img, logo, audio }) => {
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence from={20}>
        <Audio src={audio} />
      </Sequence>
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
          <div style={{ position: 'relative' }}>
            <Logo logo={logo} radius={180} direction="from-left" />
          </div>
          <Image img={img} radius={400} strokeColor="#5118DB" strokeWidth={50} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export default Scene5;

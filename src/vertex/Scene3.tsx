import { AbsoluteFill } from 'remotion';
import { scene3Schema } from './SceneSchemas';
import { z } from 'zod';
import Logo from './components/Logo';
import Image from './components/Image';

type Scene3Props = z.infer<typeof scene3Schema>;

const Scene3: React.FC<Scene3Props> = ({ img, logo }) => {
  return (
    <AbsoluteFill>
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

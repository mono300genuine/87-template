import { AbsoluteFill } from 'remotion';
import { scene2Schema } from './SceneSchemas';
import { z } from 'zod';
import Image from './components/Image';
import Logo from './components/Logo';

type Scene2Props = z.infer<typeof scene2Schema>;

const Scene2: React.FC<Scene2Props> = ({ img, logo }) => {
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
        <div>
          <Logo logo={logo} radius={180} />
        </div>
        <Image img={img} radius={400} strokeColor="#5118DB" strokeWidth={50} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene2;

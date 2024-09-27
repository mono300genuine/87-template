import { AbsoluteFill, Audio, Sequence } from 'remotion';
import { scene1Schema } from './SceneSchemas';
import { z } from 'zod';
import Logo from './components/Logo';

type Scene1Props = z.infer<typeof scene1Schema>;

const Scene1: React.FC<Scene1Props> = ({ logo, audio }) => {
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sequence from={10}>
        <Audio src={audio} />
      </Sequence>
      <div style={{ position: 'relative', width: 500, height: 500 }}>
        <Sequence from={-40}>
          <Logo logo={logo} radius={250} direction="center" />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

export default Scene1;

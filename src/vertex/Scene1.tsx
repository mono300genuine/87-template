import { AbsoluteFill, Sequence } from 'remotion';
import { scene1Schema } from './SceneSchemas';
import { z } from 'zod';
import Logo from './components/Logo';

type Scene1Props = z.infer<typeof scene1Schema>;

const Scene1: React.FC<Scene1Props> = ({ logo }) => {
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 500, height: 500 }}>
        <Sequence from={-40}>
          <Logo logo={logo} radius={250} direction="center" />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

export default Scene1;

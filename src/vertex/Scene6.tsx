import { AbsoluteFill, Img, Audio, Sequence } from 'remotion';
import { scene6Schema } from './SceneSchemas';
import { z } from 'zod';

type Scene6Props = z.infer<typeof scene6Schema>;

const Scene6: React.FC<Scene6Props> = ({ logo, audio }) => {
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sequence from={20}>
        <Audio src={audio} />
      </Sequence>
      <Img src={logo} width={500} />
    </AbsoluteFill>
  );
};

export default Scene6;

import { AbsoluteFill, Img } from 'remotion';
import { scene6Schema } from './SceneSchemas';
import { z } from 'zod';

type Scene6Props = z.infer<typeof scene6Schema>;

const Scene6: React.FC<Scene6Props> = ({ logo }) => {
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Img src={logo} width={500} />
    </AbsoluteFill>
  );
};

export default Scene6;

import { Composition, staticFile } from 'remotion';
import Vertex, { vertexSchema } from './vertex/Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Vertex"
        component={Vertex}
        schema={vertexSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{ audioVolume: 50 }}
      />
    </>
  );
};

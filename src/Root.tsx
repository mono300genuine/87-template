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
        defaultProps={{
          audioVolume: 0.1,
          transitionDuration: 30,
          scene1Duration: 150,
          scene1Props: {
            logo: staticFile('Logo.png'),
          },
          scene2Duration: 180,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
          },
          scene4Duration: 180,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
          },
          scene5Duration: 180,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
          },
          scene6Duration: 180,
          scene6Props: {
            logo: staticFile('Logo.png'),
          },
        }}
      />
    </>
  );
};

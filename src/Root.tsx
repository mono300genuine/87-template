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
          colors: {
            background: '#151515',
            backgroundText: '#1e1e1e',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#f00',
            secondary: '#f00',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: "Abel"
          },
          transitionDuration: 30,
          scene1Duration: 150,
          scene1Props: {
            logo: staticFile('Logo.png'),
            audio: staticFile('VO_1.mp3'),
            title: "Vertex",
            subtitle: "Financial Services",
            text: "Where Accuracy Meets Expertise"
          },
          scene2Duration: 180,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            audio: staticFile('VO_2.mp3'),
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            audio: staticFile('VO_3.mp3'),
          },
          scene4Duration: 180,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            audio: staticFile('VO_4.mp3'),
          },
          scene5Duration: 180,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            audio: staticFile('VO_5.mp3'),
          },
          scene6Duration: 180,
          scene6Props: {
            logo: staticFile('Logo.png'),
            audio: staticFile('VO_6.mp3'),
          },
        }}
      />
    </>
  );
};

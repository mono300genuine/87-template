import { Composition, staticFile } from 'remotion';
import { MainSchema as Composition2Schema } from './Composition/Composition';
import Composition2 from './Composition/Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Composition2"
        component={Composition2}
        schema={Composition2Schema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('composition-2/audio/music/music.mp3'),
          colors: {
            background: '#FFFFFF',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#F02C58',
            secondary: '#5118DB',
            secondaryText: '#52ABD7',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 1,
          scene1Duration: 149,
          scene1Props: {
            logo: staticFile('composition-2/Logo.png'),
            title: 'MEDICARE INSURANCE\n MADE SIMPLE',
            voiceOver: staticFile('composition-2/audio/vo/VO_1.mp3'),
          },
          scene2Duration: 150,
          scene2Props: {
            logo: staticFile('composition-2/Logo.png'),
            img: staticFile('composition-2/Media_1-modified.png'),
            backimg: staticFile('composition-2/Media_1.jpg'),
            title: 'OVER 20 YEARS\nOF DEDICATED \nMEDICARE\nEXPERTISE AT\n YOUR SERVICE',
            voiceOver: staticFile('composition-2/audio/vo/VO_2.mp3'),
          },
          scene3Duration: 150,
          scene3Props: {
            logo: staticFile('composition-2/Logo.png'),
            img: staticFile('composition-2/Media_2.jpg'),
            title: 'NAVIGATING\n INSURANCE CAN\n BE CONFUSING\n AND OVERWHELMING',
            voiceOver: staticFile('composition-2/audio/vo/VO_3.mp3'),
          },
          scene4Duration: 150,
          scene4Props: {
            logo: staticFile('composition-2/Logo.png'),
            backimg: staticFile('composition-2/Media_6.jpg'),
            img: staticFile('composition-2/Media_6-modified.png'),
            title: 'OUR\n KNOWLEDGEABLE\n STAFF SIMPLIFIES\n THE PROCESS',
            voiceOver: staticFile('composition-2/audio/vo/VO_4.mp3'),
          },
          scene5Duration: 150,
          scene5Props: {
            logo: staticFile('composition-2/Logo.png'),
            backimg: staticFile('composition-2/Media_4.jpg'),
            img: staticFile('composition-2/Media_4-modified.png'),
            title: 'ENJOY PEACE\n OF MIND\n WITH THE\n RIGHT MEDICARE',
            voiceOver: staticFile('composition-2/audio/vo/VO_5.mp3'),
          },
          scene6Duration: 150,
          scene6Props: {
            logo: staticFile('composition-2/Logo.png'),
            title: 'CONTACT HEALTH INSURANCE\nASSOCIATES TODAY',
            phone: '203-239-4044',
            voiceOver: staticFile('composition-2/audio/vo/VO_6.mp3'),
          },
        }}
      />
    </>
  );
};

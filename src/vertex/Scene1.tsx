import { AbsoluteFill, Audio, Sequence, useVideoConfig } from 'remotion';
import { scene1Schema } from './SceneSchemas';
import { z } from 'zod';
import Logo from './components/Logo';
import Background from './components/Background';
import Circle from './components/Circle';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TitleTextFromRight } from './components/animations/TitleTextFromRight';
import { colorVar } from '../lib/helpers';

type Scene1Props = z.infer<typeof scene1Schema>;

const Scene1: React.FC<Scene1Props> = ({ logo, audio, text, title, subtitle }) => {
  const { width, height } = useVideoConfig();
  
  const titleSplit = useTextSplitter({
    text: title.toUpperCase(),
    fontSize: 130,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });
  
  const subtitleSplit = useTextSplitter({
    text: subtitle.toUpperCase(),
    fontSize: 100,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });

  const textSplit = useTextSplitter({
    text: text,
    fontSize: 130,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });

  console.log(textSplit, "text split");
  
  // TODO: implement the text animation for all the scenes
  // useTextSplitter always for animated text
  // create component for text that comes from top for titleSplit & subtitleSplit
  // create component for text that comes from below and rotates & fades in for textSplit

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Sequence from={10}>
        <Audio src={audio} />
      </Sequence>
      <div style={{ position: 'absolute', width, height }}>
        <Background scene={1} />
      </div>
      <div style={{ position: 'relative', width: 500, height: 500 }}>
        <Sequence from={-40}>
          <Logo logo={logo} radius={250} direction="center" />
          <div
            style={{
              position: 'relative',
              top: 420,
              left: 50,
              ...titleSplit.style,
              color: colorVar("accent"),
            }}
          >
            <TitleTextFromRight text={titleSplit.text} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: -600,
              top: -300,
            }}
          >
            <Circle radius={200} strokeColor="#5118DB" strokeWidth={40} />
          </div>
          <div
            style={{
              position: 'absolute',
              right: -600,
              bottom: -300,
            }}
          >
            <Circle radius={200} strokeColor="#5118DB" strokeWidth={40} />
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};

export default Scene1;

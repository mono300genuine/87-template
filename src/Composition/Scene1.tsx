import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { Background } from '../components/Background';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';


export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),

});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {

  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 130,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,

  });

  // const subtitleSplit = useTextSplitter({
  //   text: props.subtitle,
  //   fontSize: 100,
  //   fontWeight: '600',
  //   letterSpacing: '6px',
  //   maxLines: 1,
  //   maxWidth: 1000,
  // });



  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* The background component is always the same setup like this.
      Get's it's input from the root */}
      <Background {...props.background} />

      <div
        style={{
          textAlign: 'center',
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...titleSplit.style,
          color: colorVar("primaryText"),
        }}
      >
        <TitleTextFromRight text={titleSplit.text} />
      </div>

    </AbsoluteFill>
  );
};

export default Scene1;

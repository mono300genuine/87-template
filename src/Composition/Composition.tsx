import { AbsoluteFill, Audio, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { z } from 'zod';

import Scene1, { scene1Schema } from './Scene1';
import Scene2, { scene2Schema } from './Scene2';
import Scene3, { scene3Schema } from './Scene3';
import Scene4, { scene4Schema } from './Scene4';
import Scene5, { scene5Schema } from './Scene5';
import Scene6, { scene6Schema } from './Scene6';

import { LoadFonts } from '../lib/LoadFonts';
import { getCSSVariables } from '../lib/helpers';
import { Colors, Fonts } from '../types';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { splitCenterPresentation } from '../transitions/SplitCenterPresentation';
import { WarpPathFn, warpPath } from '@remotion/paths';
import { makeCircle } from '@remotion/shapes';
import { WideSlidePresentation } from '../transitions/WideSlidePresentation';
import AnimatedBackground from './AnimatedBackground';

export const MainSchema = z.object({
  audioVolume: z.number(),
  music: z.string(),
  colors: Colors,
  fonts: Fonts,
  background: BackgroundProps,
  transitionDuration: z.number(),
  scene1Duration: z.number(),
  scene1Props: scene1Schema,
  scene2Duration: z.number(),
  scene2Props: scene2Schema,
  scene3Duration: z.number(),
  scene3Props: scene3Schema,
  scene4Duration: z.number(),
  scene4Props: scene4Schema,
  scene5Duration: z.number(),
  scene5Props: scene5Schema,
  scene6Duration: z.number(),
  scene6Props: scene6Schema,
});

type MainProps = z.infer<typeof MainSchema>;

const Main: React.FC<MainProps> = ({
  audioVolume,
  music,
  transitionDuration,
  colors,
  background,
  fonts,
  scene1Duration,
  scene1Props,
  scene2Duration,
  scene2Props,
  scene3Duration,
  scene3Props,
  scene4Duration,
  scene4Props,
  scene5Duration,
  scene5Props,
  scene6Duration,
  scene6Props,
}) => {
  const { id } = useVideoConfig();
  return (
    <LoadFonts fonts={fonts}>
      <AbsoluteFill
        id={id}
        style={{
          background: 'black',
          ...getCSSVariables({ colors: colors, fonts: fonts, roundness: 1 }),
        }}
      >
        <AbsoluteFill>
          <AnimatedBackground />
        </AbsoluteFill>
        {/* change the name of your music file in the public folder to match music.mp3  */}
        <Audio src={music} volume={audioVolume} />
        <TransitionSeries>
          <TransitionSeries.Transition
            presentation={WideSlidePresentation({ direction: 'from-right' })}
            timing={linearTiming({ durationInFrames: transitionDuration })}
          />
          <TransitionSeries.Sequence durationInFrames={scene1Duration} name="Scene 1">
            <Scene1 {...scene1Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={splitCenterPresentation({ height: HEIGHT, width: WIDTH, rotation: 90 })}
            timing={linearTiming({ durationInFrames: transitionDuration })}
          />
          <TransitionSeries.Sequence durationInFrames={scene2Duration} name="Scene 2">
            <Scene2 {...scene2Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={splitCenterPresentation({ height: HEIGHT, width: WIDTH, rotation: 90 })}
            timing={linearTiming({ durationInFrames: transitionDuration })}
          />
          <TransitionSeries.Sequence durationInFrames={scene3Duration} name="Scene 3">
            <Scene3 {...scene3Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={splitCenterPresentation({ height: HEIGHT, width: WIDTH, rotation: 90 })}
            timing={linearTiming({ durationInFrames: transitionDuration })}
          />
          <TransitionSeries.Sequence durationInFrames={scene4Duration} name="Scene 4">
            <Scene4 {...scene4Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={splitCenterPresentation({ height: HEIGHT, width: WIDTH, rotation: 90 })}
            timing={linearTiming({ durationInFrames: transitionDuration })}
          />
          <TransitionSeries.Sequence durationInFrames={scene5Duration} name="Scene 5">
            <Scene5 {...scene5Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={splitCenterPresentation({ height: HEIGHT, width: WIDTH, rotation: 90 })}
            timing={linearTiming({ durationInFrames: transitionDuration })}
          />
          <TransitionSeries.Sequence durationInFrames={scene6Duration} name="Scene 6">
            <Scene6 {...scene6Props} background={background} />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        <AbsoluteFill style={{ zIndex: 99 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient-mask" gradientTransform="rotate(90)">
                <stop offset="60%" stop-color="black" stop-opacity="0.6" />
                <stop offset="100%" stop-color="white" stop-opacity="0.9" />
              </linearGradient>

              <mask id="mask1">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-mask)" />
              </mask>
            </defs>

            <rect width="100%" height="100%" fill="#000000" mask="url(#mask1)" />
          </svg>
        </AbsoluteFill>
      </AbsoluteFill>
    </LoadFonts>
  );
};

export default Main;

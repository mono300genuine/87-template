import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { z } from 'zod';
import { CustomSlidePresentation } from './presentations/CustomSlidePresentation';
import Scene1 from './Scene1';
import {
  scene1Schema,
  scene2Schema,
  scene3Schema,
  scene4Schema,
  scene5Schema,
  scene6Schema,
} from './SceneSchemas';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5';
import Scene6 from './Scene6';

export const vertexSchema = z.object({
  audioVolume: z.number(),
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

type VertexProps = z.infer<typeof vertexSchema>;

const Vertex: React.FC<VertexProps> = ({
  audioVolume,
  transitionDuration,
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
  return (
    <AbsoluteFill style={{ background: 'black' }}>
      <Audio src={staticFile('music.mp3')} volume={audioVolume} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={scene1Duration}>
          <Scene1 {...scene1Props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={CustomSlidePresentation({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        <TransitionSeries.Sequence durationInFrames={scene2Duration}>
          <Scene2 {...scene2Props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={CustomSlidePresentation({ direction: 'from-left' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        <TransitionSeries.Sequence durationInFrames={scene3Duration}>
          <Scene3 {...scene3Props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={CustomSlidePresentation({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        <TransitionSeries.Sequence durationInFrames={scene4Duration}>
          <Scene4 {...scene4Props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={CustomSlidePresentation({ direction: 'from-top' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        <TransitionSeries.Sequence durationInFrames={scene5Duration}>
          <Scene5 {...scene5Props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={CustomSlidePresentation({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        <TransitionSeries.Sequence durationInFrames={scene6Duration}>
          <Scene6 {...scene6Props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export default Vertex;

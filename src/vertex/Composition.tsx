import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { z } from 'zod';
import { CustomSlidePresentation } from './presentations/CustomSlidePresentation';

export const vertexSchema = z.object({
  audioVolume: z.number(),
});

type VertexProps = z.infer<typeof vertexSchema>;

const Vertex: React.FC<VertexProps> = ({}) => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={40}>
          <div>A</div>
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={CustomSlidePresentation()}
          timing={linearTiming({ durationInFrames: 30 })}
        />
        <TransitionSeries.Sequence durationInFrames={60}>
          <div>B</div>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

export default Vertex;

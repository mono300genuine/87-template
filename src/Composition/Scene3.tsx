import { AbsoluteFill, Audio, Img, interpolate, useCurrentFrame } from 'remotion';

import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { TextCharsFromRightToLeft } from '../components/animations/TextCharsFromRightToLeft';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TextCharsFromRightToLeftWithRotation } from '../components/animations/TextCharsFromRightToLeftWithRotation';
import { SVGTextCharsFromRightToLeftWithRotation } from '../components/animations/SVGTextCharsFromRightToLeftWithRotation';

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  // Calculate progress of diagonal rect
  const theta = Math.atan2(HEIGHT, WIDTH);
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 900,
  });
  const frame = useCurrentFrame();

  const x = interpolate(frame, [0, 1], [0, WIDTH * Math.cos(theta)]);
  const y = interpolate(frame, [0, 1], [0, HEIGHT * Math.sin(theta)]);

  const bigCirleRadius = WIDTH * 0.3;
  const bigCircleX = WIDTH - bigCirleRadius / 2;
  const bigCircleY = HEIGHT + HEIGHT / 2 - bigCirleRadius / 2;

  return (
    <AbsoluteFill style={{ display: 'flex', ...titleSplit.style }}>
      <Audio src={props.voiceOver} />
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
          <defs>
            <pattern id="imagePattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
              <image
                id="image"
                href={props.img}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect x="0" y="0" fill="white" width="100%" height="100%" opacity="0.9" />
              <image
                id="image"
                href={props.img}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                transform="translate(460, -300)"
                clipPath="url(#circleClip)"
                stroke="red"
                strokeWidth="40"
              />
              <g transform="translate(100,560)">
                <SVGTextCharsFromRightToLeftWithRotation
                  text={titleSplit.text}
                  color={colorVar('primaryText')}
                />
              </g>
            </pattern>
            <clipPath id="circleClip">
              <circle cx="960" cy="150" r="60%" />
            </clipPath>
          </defs>

          <g clipPath="url(#scene-2-sweep-clip)">
            <rect
              width="100%"
              height="100%"
              // transform="scale(1.1)"
              fill="url(#imagePattern)"
              // clip-path="url(#circleClip)"
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

export default Scene3;

import { AbsoluteFill, Audio, Img, interpolate, useCurrentFrame } from 'remotion';

import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { defaultSpring } from '../lib/helpers';

export const scene4Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene4Props = z.infer<typeof scene4Schema> & { background: BackgroundProps };

const Scene4: React.FC<Scene4Props> = (props) => {
  const diagonalLength = Math.sqrt(WIDTH ** 2 + HEIGHT ** 2);
  // Calculate progress of diagonal rect
  const theta = Math.atan2(HEIGHT, WIDTH);

  const frame = useCurrentFrame();

  const x = interpolate(frame, [0, 1], [0, WIDTH * Math.cos(theta)]);
  const y = interpolate(frame, [0, 1], [0, HEIGHT * Math.sin(theta)]);

  const circleCenterX = WIDTH - WIDTH / 4;
  const circleCenterY = HEIGHT / 2;
  const circleRadius = Math.min(WIDTH, HEIGHT) * 0.4;

  const spring = defaultSpring({
    frame,
    delay: 30,
    durationInFrames: 30,
    from: circleCenterX - 50,
    to: circleCenterX - 50,
  });

  const mask1Radius = defaultSpring({
    frame,
    delay: 30,
    durationInFrames: 30,
    from: circleRadius * 0.4,
    to: circleRadius,
  });

  const mask2Radius = defaultSpring({
    frame,
    delay: 40,
    durationInFrames: 30,
    from: circleRadius * 0.2,
    to: circleRadius,
  });

  return (
    <>
      <AbsoluteFill>
        <Audio src={props.voiceOver} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
          <defs>
            <clipPath id="scene-4-clip-path">
              <circle cx={circleCenterX} cy={circleCenterY} r={circleRadius} />
            </clipPath>
            <pattern
              id="scene-4-image-pattern"
              patternUnits="userSpaceOnUse"
              width="100%"
              height="100%"
            >
              <image
                href={props.img}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect x="0" y="0" fill="white" width="100%" height="100%" opacity="0.9" />
              <image
                href={props.img}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                clipPath="url(#scene-4-clip-path)"
              />
            </pattern>

            {/* Need to tint this image with a floodFilter */}

            {/* <pattern
              id="scene-4-image-pattern-2"
              patternUnits="userSpaceOnUse"
              width="100%"
              height="100%"
              patternTransform="scale(1.04)"
            >
              <image
                href={props.img}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                style={{
                  filter: 'hue-rotate(210deg)',
                }}
              />
            </pattern> */}
            <clipPath id="scene-4-circle-clip">
              <circle cx="1400" cy="350" r="20%" />
            </clipPath>
            <mask id="scene-4-mask-1">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle
                cx={spring}
                cy={circleCenterY}
                r={mask1Radius}
                fill="black"
                filter="url(#scene-4-mask-blur-filter)"
              />
            </mask>
            <mask id="scene-4-mask-2">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle
                cx={spring}
                cy={circleCenterY}
                r={mask2Radius}
                fill="black"
                filter="url(#scene-4-mask-blur-filter)"
              />
            </mask>
          </defs>

          <circle
            cx={circleCenterX}
            cy={circleCenterY}
            r={circleRadius}
            fill="url(#scene-4-image-pattern)"
          />

          {/* Scaled Circle For Blue Opacity Mask */}
          {/* <circle
            cx={circleCenterX}
            cy={circleCenterY}
            r={circleRadius}
            fill="url(#scene-4-image-pattern)"
          />

          <circle
            cx={circleCenterX}
            cy={circleCenterY}
            r={circleRadius * 0.6}
            mask="url(#scene-4-mask-2)"
            fill="url(#scene-4-image-pattern-2)"
          />

          <circle
            cx={circleCenterX}
            cy={circleCenterY}
            r={circleRadius * 0.9}
            fill="#3A7FDE"
            mask="url(#scene-4-mask-1)"
          /> */}

          <g clipPath="url(#scene-4-sweep-clip)">
            <rect
              width="100%"
              height="100%"
              // transform="scale(1.1)"
              fill="url(#scene-4-image-pattern)"
              // clipPath="url(#scene-4-circle-clip)"
            />
          </g>
          <use href="#yellow" fill="yellow" opacity={0.8} />
          <use href="#blue" fill="blue" opacity={0.8} />

          {/* <circle
              fill="#3A7FDE"
              cx={bigCircleX}
              cy={bigCircleY}
              r={bigCirleRadius}
              opacity={0.7}
            /> */}
          {/* <circle fill="#3A7FDE" cx={bigCircleX} cy={bigCircleY} r={'30%'} opacity={0.2} /> */}
          {/* <image href={props.logo} width={WIDTH} height={HEIGHT} /> */}
        </svg>
      </AbsoluteFill>
    </>
  );
};

export default Scene4;

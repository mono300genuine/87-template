import { AbsoluteFill, Audio, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { colorVar, defaultSpring } from '../lib/helpers';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TextCharsFromRightToLeftWithRotation } from '../components/animations/TextCharsFromRightToLeftWithRotation';
import { SVGTextCharsFromRightToLeftWithRotation } from '../components/animations/SVGTextCharsFromRightToLeftWithRotation';

export const scene4Schema = z.object({
  logo: z.string(),
  img: z.string(),
  backimg: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene4Props = z.infer<typeof scene4Schema> & { background: BackgroundProps };

const Scene4: React.FC<Scene4Props> = (props) => {
  const frame = useCurrentFrame();
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 900,
  });
  const angle = Math.atan2(2 * HEIGHT, WIDTH);
  const rotation = -angle * (180 / Math.PI);

  console.log(titleSplit.text, 'LINESS');

  const rectWidth = 200;
  const whiteRect2Width = 240;
  const rect3Width = 80;
  const rectWidth2 = 380;
  const rectHeight = Math.sqrt(WIDTH ** 2 + HEIGHT ** 2) * 2;
  const bigCircleRadius = WIDTH * 0.3;

  const startX = WIDTH + (rectHeight / 2) * Math.cos(angle);
  const startY = (-rectHeight / 2) * Math.sin(angle);

  const endX = (-rectHeight / 2) * Math.cos(angle);
  const endY = HEIGHT + (rectHeight / 2) * Math.sin(angle);

  const sweep = defaultSpring({
    delay: 30,
    frame,
    durationInFrames: 150,
    from: 0,
    to: 1,
  });

  const centerX = interpolate(sweep, [0, 1], [startX, endX]);
  const centerY = interpolate(sweep, [0, 1], [startY, endY]);

  const x = centerX - rectWidth / 2;
  const y = centerY - rectHeight / 2;
  const x2 = centerX - rectWidth2 / 2;

  const bigCirleRadius = WIDTH * 0.3;
  const bigCircleX = bigCirleRadius / 2;
  const bigCircleY = HEIGHT + HEIGHT / 2 - bigCirleRadius / 2;

  const circleCenterX = (WIDTH * 3) / 4;
  const circleCenterY = HEIGHT / 2;
  const circleRadius = Math.min(WIDTH, HEIGHT) * 0.4;

  const spring = defaultSpring({
    frame,
    delay: 0,
    durationInFrames: 30,
    from: circleCenterX + 50,
    to: circleCenterX,
  });

  const r = defaultSpring({
    frame,
    delay: 0,
    durationInFrames: 30,
    from: circleRadius * 0.4,
    to: circleRadius,
  });

  // Image transition logic
  const fps = 30; // Assuming 30 fps
  const transitionDuration = 1 * fps; // 1 second duration
  const totalDuration = 3 * transitionDuration; // Total duration for all 3 transitions (only once)

  const imageScale = interpolate(
    Math.min(frame, totalDuration),
    [0, transitionDuration, 2 * transitionDuration, totalDuration],
    [1, 1.01, 0.99, 1],
    {
      extrapolateRight: 'clamp',
    }
  );


  const xOffset = interpolate(
    Math.min(frame, totalDuration),
    [0, transitionDuration, 2 * transitionDuration, totalDuration],
    [0, -10, -5, 0]
  );

  const yOffset = interpolate(
    Math.min(frame, totalDuration),
    [0, transitionDuration, 2 * transitionDuration, totalDuration],
    [0, 10, 5, 0]
  );

  const animationDuration = 60; // 2 seconds at 30fps
  const circleAnimation = interpolate(
    Math.min(frame, animationDuration * 2),
    [0, animationDuration, animationDuration * 2],
    [1, 1.1, 1],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ display: 'flex', ...titleSplit.style }}>
      <Audio src={props.voiceOver} />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
        <defs>
          <filter id="blur-filter" x="0" y="0">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          <clipPath id="circle-clip">
            <circle cx={circleCenterX} cy={circleCenterY} r={circleRadius} />
          </clipPath>

          <pattern id="imagePattern" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image
              href={props.backimg}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
            <rect x="0" y="0" width="100%" height="100%" fill="white" opacity={0.8} />
            <image
              href={props.img}
              x={circleCenterX - circleRadius * imageScale + xOffset}
              y={circleCenterY - circleRadius * imageScale + yOffset}
              width={circleRadius * 2 * imageScale}
              height={circleRadius * 2 * imageScale}
              preserveAspectRatio="xMidYMid meet"
              clipPath="url(#circle-clip)"
            />
            <g>
              <circle
                fill="#3A7FDE"
                cx={bigCircleX}
                cy={bigCircleY}
                r={bigCircleRadius * circleAnimation}
                opacity={0.7}
              />
              <circle
                fill="#3A7FDE"
                cx={bigCircleX}
                cy={bigCircleY}
                r={bigCircleRadius * 0.9 * circleAnimation}
                opacity={0.2}
              />
            </g>
          </pattern>

          <clipPath id="scene-4-sweep-clip">
            <rect
              id="diagonal-1"
              x={x - 50}
              y={y - 50}
              width={rect3Width}
              height={rectHeight}
              transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />

            <rect
              id="diagonal-3"
              x={x + 200}
              y={y + 200}
              width={rectWidth}
              height={rectHeight}
              transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />
          </clipPath>

          <clipPath id="scene-4-sweep-clip-1">
            <rect
              id="diagonal-2"
              x={x2 + 90}
              y={y + 90}
              width={whiteRect2Width}
              height={rectHeight}
              transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />
            <rect
              id="diagonal-4"
              x={x2}
              y={y}
              width={rectWidth2}
              height={rectHeight}
              transform={`rotate(${rotation}, ${centerX}, ${centerY})`}
            />
          </clipPath>

          <mask id="mask-1">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx={spring} cy={circleCenterY} r={r} fill="black" filter="url(#blur-filter)" />
          </mask>
        </defs>

        <rect
          id="scene-4-patterned-rect"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#imagePattern)"
        />

        <g transform="scale(1.1)" style={{ transformOrigin: 'center' }}>
          <use href="#scene-4-patterned-rect" clipPath="url(#scene-4-sweep-clip-1)" />
          <use href="#diagonal-4" fill="#FFF" opacity={0.6} />
        </g>

        <g transform="scale(1.2)" style={{ transformOrigin: 'center' }}>
          <use href="#scene-4-patterned-rect" clipPath="url(#scene-4-sweep-clip)" />
          <use href="#diagonal-3" fill="#3A7FDE" opacity={1} />
          <use href="#diagonal-1" fill="#3A7FDE" opacity={0.7} />
        </g>

        <g transform="scale(1.1)" style={{ transformOrigin: 'center' }}>
          <use href="#diagonal-2" fill="#FFF" opacity={0.3} />
        </g>

        <image y="85%" x="8%" href={props.logo} />

        <g transform="translate(100,100)">
          <SVGTextCharsFromRightToLeftWithRotation
            text={titleSplit.text}
            color={colorVar('primaryText')}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default Scene4;
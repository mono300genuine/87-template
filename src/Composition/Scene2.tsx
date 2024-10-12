import { AbsoluteFill, Audio, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { colorVar, defaultSpring } from '../lib/helpers';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TextCharsFromRightToLeftWithRotation } from '../components/animations/TextCharsFromRightToLeftWithRotation';
import { SVGTextCharsFromRightToLeftWithRotation } from '../components/animations/SVGTextCharsFromRightToLeftWithRotation';

export const scene2Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {
  const frame = useCurrentFrame();
  // const duration = 60;
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 900,
  });
  const angle = Math.atan2(HEIGHT, WIDTH);
  const rotation = angle * (180 / Math.PI);

  console.log(titleSplit.text, 'LINESS');

  const rectWidth = 200;
  const whiteRect2Width = 240;
  const rect3Width = 80;
  const rectWidth2 = 380;
  const rectHeight = Math.sqrt(WIDTH ** 2 + HEIGHT ** 2) * 2;

  // const progress = interpolate(frame, [0, duration], [0, 1], {
  //   extrapolateRight: 'clamp',
  // });

  const startX = (-rectHeight / 2) * Math.cos(angle);
  const startY = (-rectHeight / 2) * Math.sin(angle);

  const endX = WIDTH + (rectHeight / 2) * Math.cos(angle);
  const endY = HEIGHT + (rectHeight / 2) * Math.sin(angle);

  const sweep = defaultSpring({
    delay: 30,
    frame,
    durationInFrames: 120,
    from: 0,
    to: 1,
  });

  const centerX = interpolate(sweep, [0, 1], [startX, endX]);
  const centerY = interpolate(sweep, [0, 1], [startY, endY]);

  const x = centerX - rectWidth / 2;
  const y = centerY - rectHeight / 2;
  const x2 = centerX - rectWidth2 / 2;

  const bigCirleRadius = WIDTH * 0.3;
  const bigCircleX = WIDTH - bigCirleRadius / 2;
  const bigCircleY = HEIGHT + HEIGHT / 2 - bigCirleRadius / 2;

  const circleCenterX = WIDTH / 4;
  const circleCenterY = HEIGHT / 2;
  const circleRadius = Math.min(WIDTH, HEIGHT) * 0.4;

  const spring = defaultSpring({
    frame,
    delay: 0,
    durationInFrames: 30,
    from: circleCenterX - 50,
    to: circleCenterX,
  });

  const r = defaultSpring({
    frame,
    delay: 0,
    durationInFrames: 30,
    from: circleRadius * 0.4,
    to: circleRadius,
  });

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
              href={props.img}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
            <rect x="0" y="0" width="100%" height="100%" fill="white" opacity={0.8} />
            <image
              href={props.img}
              x={circleCenterX - circleRadius}
              y={circleCenterY - circleRadius}
              width={circleRadius * 2}
              height={circleRadius * 2}
              preserveAspectRatio="xMidYMid meet"
              clipPath="url(#circle-clip)"
            />
            <g>
              <circle
                fill="#3A7FDE"
                cx={bigCircleX}
                cy={bigCircleY}
                r={bigCirleRadius}
                opacity={0.7}
              />
              <circle
                fill="#3A7FDE"
                cx={bigCircleX}
                cy={bigCircleY}
                r={bigCirleRadius * 0.9}
                opacity={0.2}
              />
            </g>
          </pattern>

          <clipPath id="scene-2-sweep-clip">
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

          <clipPath id="scene-2-sweep-clip-1">
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

        {/* Base Image Pattern */}
        <rect
          id="scene-2-patterned-rect"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#imagePattern)"
        />

        {/*  */}
        <circle
          cx={circleCenterX}
          cy={circleCenterY}
          r={circleRadius * 0.9}
          fill="#3A7FDE"
          mask="url(#mask-1)"
        />

        {/* Scale 2 */}
        <g transform="scale(1.1)" style={{ transformOrigin: 'center' }}>
          <use href="#scene-2-patterned-rect" clipPath="url(#scene-2-sweep-clip-1)" />
          <use href="#diagonal-4" fill="#FFF" opacity={0.6} />
        </g>

        <g transform="scale(1.2)" style={{ transformOrigin: 'center' }}>
          <use href="#scene-2-patterned-rect" clipPath="url(#scene-2-sweep-clip)" />
          <use href="#diagonal-3" fill="blue" opacity={0.5} />
          <use href="#diagonal-1" fill="blue" opacity={0.2} />
        </g>

        <g transform="scale(1.1)" style={{ transformOrigin: 'center' }}>
          <use href="#diagonal-2" fill="#FFF" opacity={0.3} />
        </g>

        <image y="85%" x="72%" href={props.logo} />

        <g transform="translate(1100,100)">
          <SVGTextCharsFromRightToLeftWithRotation
            text={titleSplit.text}
            color={colorVar('primaryText')}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default Scene2;

import { AbsoluteFill, Audio, Img, interpolate, useCurrentFrame } from 'remotion';
import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { TextCharsFromRightToLeft } from '../components/animations/TextCharsFromRightToLeft';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar, defaultSpring } from '../lib/helpers';
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
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 900,
  });
  const angle = Math.atan2(2 * HEIGHT, WIDTH);

  console.log(titleSplit.text, 'LINESS');

  const rectWidth = 200;
  const whiteRect2Width = 240;
  const rect3Width = 80;
  const rectWidth2 = 380;
  const rectHeight = Math.sqrt(WIDTH ** 2 + HEIGHT ** 2) * 2;
  const rotation = angle * (180 / Math.PI);
  // const progress = interpolate(frame, [0, duration], [0, 1], {
  //   extrapolateRight: 'clamp',
  // });

  const startX = (-rectHeight / 2) * Math.cos(angle);
  const startY = (-rectHeight / 2) * Math.sin(angle);

  const endX = WIDTH + (rectHeight / 2) * Math.cos(angle);
  const endY = HEIGHT + (rectHeight / 2) * Math.sin(angle);

  const frame = useCurrentFrame();

  const fps = 30; // Assuming 30 fps
  const transitionDuration = 1 * fps; // 1 second duration
  const totalDuration = 3 * transitionDuration; // Total duration for all 3 transitions (only once)

  const sweep = defaultSpring({
    delay: 35,
    frame,
    durationInFrames: 150,
    from: 0,
    to: 1,
  });

  const imageScale = interpolate(
    Math.min(frame, totalDuration),
    [0, transitionDuration, 2 * transitionDuration, totalDuration],
    [1, 1.03, 0.97, 1],
    {
      extrapolateRight: 'clamp',
    }
  );

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
                x={circleCenterX - circleRadius}
                y={circleCenterY - circleRadius}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                transform="translate(460, -300)"
                clipPath="url(#circleClip)"
                stroke="red"
                strokeWidth="40"
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
            </pattern>
            <clipPath id="circleClip">
              <circle cx="920" cy="150" r="50%" />
            </clipPath>

          </defs>

          <g clipPath="url(#scene-2-sweep-clip)">
            <rect
              width="100%"
              height="100%"
              fill="url(#imagePattern)"
            />
          </g>



          {/* Added logo image */}
          <g transform="scale(1.1)" style={{ transformOrigin: 'center' }}>
            <use href="#scene-4-patterned-rect" clipPath="url(#scene-4-sweep-clip-1)" />
            <use href="#diagonal-4" fill="#3A7FDE" opacity={0.7} />
          </g>

          <g transform="scale(1.2)" style={{ transformOrigin: 'center' }}>
            <use href="#scene-4-patterned-rect" clipPath="url(#scene-4-sweep-clip)" />
            <use href="#diagonal-3" fill="#FFF" opacity={0.1} />
            <use href="#diagonal-1" fill="#FFF" opacity={0.3} />
          </g>

          <g transform="scale(1.1)" style={{ transformOrigin: 'center' }}>
            <use href="#diagonal-2" fill="#3A7FDE" opacity={0.9} />
          </g>

          <image y="85%" x="72%" href={props.logo} />
          
          <g transform="translate(100,560)">
            <SVGTextCharsFromRightToLeftWithRotation
              text={titleSplit.text}
              color={colorVar('primaryText')}
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

export default Scene3;
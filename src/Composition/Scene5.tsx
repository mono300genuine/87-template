import { AbsoluteFill, Audio, Img, interpolate, useCurrentFrame } from 'remotion';
import { useVideoConfig, spring } from 'remotion';
import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';

export const scene5Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene5Props = z.infer<typeof scene5Schema> & { background: BackgroundProps };

const AnimatedCup = ({ arcAngle = -30 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Constants for the cup shape
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const arcRadius = 200;
  const bottomY = centerY + 1000;
  const maxAngle = 90;

  // Animate the angle using spring
  const progress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
    durationInFrames,
  });

  const openingAngle = interpolate(progress, [0, 1], [0, maxAngle]);

  // Convert arcAngle to radians
  const arcAngleRad = arcAngle * (Math.PI / 180);

  // Calculate points for the cup shape
  const calculatePoint = (angle: number) => {
    const totalAngle = arcAngleRad + angle;
    return {
      x: centerX + arcRadius * Math.cos(totalAngle),
      y: centerY + arcRadius * Math.sin(totalAngle),
    };
  };

  const leftAngle = -Math.PI / 2 - openingAngle * (Math.PI / 180);
  const rightAngle = -Math.PI / 2 + openingAngle * (Math.PI / 180);

  const leftTop = calculatePoint(leftAngle);
  const rightTop = calculatePoint(rightAngle);

  const leftBottom = {
    x: leftTop.x - (bottomY - leftTop.y) * Math.tan(leftAngle + arcAngleRad),
    y: bottomY,
  };

  const rightBottom = {
    x: rightTop.x - (bottomY - rightTop.y) * Math.tan(rightAngle + arcAngleRad),
    y: bottomY,
  };

  // Construct the SVG path
  const cupPath = `
    M ${leftTop.x}, ${leftTop.y} 
    A ${arcRadius}, ${arcRadius} 0 0 1 ${rightTop.x}, ${rightTop.y}
    L ${rightBottom.x}, ${rightBottom.y}
    L ${leftBottom.x}, ${leftBottom.y}
    Z
  `;

  return (
    <path
      d={cupPath}
      fill="black"
      stroke="black"
      strokeWidth="2"
      transform={`rotate(${arcAngle}, ${centerX}, ${centerY})`}
    />
  );
};

const Scene5: React.FC<Scene5Props> = (props) => {
  const diagonalLength = Math.sqrt(WIDTH ** 2 + HEIGHT ** 2);
  // Calculate progress of diagonal rect
  const theta = Math.atan2(HEIGHT, WIDTH);

  const frame = useCurrentFrame();

  const x = interpolate(frame, [0, 1], [0, WIDTH * Math.cos(theta)]);
  const y = interpolate(frame, [0, 1], [0, HEIGHT * Math.sin(theta)]);

  const bigCirleRadius = WIDTH * 0.3;
  const bigCircleX = WIDTH - bigCirleRadius / 2;
  const bigCircleY = HEIGHT + HEIGHT / 2 - bigCirleRadius / 2;

  return (
    <AbsoluteFill style={{ display: 'flex' }}>
      <Audio src={props.voiceOver} />

      <AbsoluteFill>
        <Img src={props.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Img
          src={props.img}
          style={{
            width: '100%',
            height: 'auto',
            transformOrigin: 'center',
            transform: `scale(-1, 1)`,
          }}
        />
      </AbsoluteFill>
      <Background
        {...props.background}
        style={{
          opacity: 0.9,
        }}
      />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
            <defs>
              <pattern id="imagePattern" patternUnits="userSpaceOnUse" width="400" height="300">
                <image
                  href={props.img}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
              <clipPath id="circleClip">
                <circle cx="200" cy="150" r="30%" />
              </clipPath>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill="url(#imagePattern)"
              clip-path="url(#circleClip)"
            />

            <g clipPath="url(#scene-2-sweep-clip)">
              <rect
                width="100%"
                height="100%"
                transform="scale(1.1)"
                fill="url(#imagePattern)"
                clip-path="url(#circleClip)"
              />
            </g>
            <use href="#yellow" fill="yellow" opacity={0.8} />
            <use href="#blue" fill="blue" opacity={0.8} />

            <circle
              fill="#3A7FDE"
              cx={bigCircleX}
              cy={bigCircleY}
              r={bigCirleRadius}
              opacity={0.7}
            />
            <circle fill="#3A7FDE" cx={bigCircleX} cy={bigCircleY} r={'30%'} opacity={0.2} />

            {/* <image href={props.logo} width={WIDTH} height={HEIGHT} /> */}
          </svg>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene5;

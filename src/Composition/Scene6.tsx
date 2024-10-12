import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import { TextCharsFromRightToLeftWithRotation } from '../components/animations/TextCharsFromRightToLeftWithRotation';
import { useTransitionProgress } from '@remotion/transitions';

export const scene6Schema = z.object({
  logo: z.string(),
  title: z.string(),
  phone: z.string(),
  subtitle: z.string().optional(),
  voiceOver: z.string(),
});
type Scene6Props = z.infer<typeof scene6Schema> & { background: BackgroundProps };

const AnimatedCup = ({ arcAngle = -30, scale }: { arcAngle?: number; scale: number }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Constants for the cup shape
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const arcRadius = (Math.min(WIDTH, HEIGHT) / 2 - 100) * scale;
  const bottomY = centerY + 900;
  const maxAngle = 90;

  // Animate the angle using spring
  const progress = spring({
    frame,
    fps,
    from: 1,
    to: 0,
    config: {
      damping: 200,
    },
    durationInFrames,
  });

  const openingAngle = interpolate(progress, [0, 1], [60, maxAngle], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  console.log(openingAngle, 'openingAngle');

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
      fill="url(#greyGradient)"
      transform={`rotate(${arcAngle}, ${centerX}, ${centerY}) `}
    />
  );
};

const Scene6: React.FC<Scene6Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 200,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1400,
  });

  const phoneSplit = useTextSplitter({
    text: props.phone.toUpperCase(),
    fontSize: 200,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1400,
  });

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const radius = Math.min(WIDTH, HEIGHT) / 2 + 100;
  const circumference = 2 * Math.PI * radius;

  const slowScale = spring({
    frame: frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 100,
      stiffness: 50,
    },
  });

  const fastScale = spring({
    frame,
    fps,
    from: 1,
    to: 1.6,
    delay: 100,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const scale = interpolate(frame, [0, 30, 120], [0.1, slowScale, fastScale], {
    extrapolateRight: 'clamp',
  });

  const progress = interpolate(frame, [0, durationInFrames - 30], [1, 0], {
    extrapolateRight: 'clamp',
  });

  const rotation = interpolate(frame, [0, durationInFrames - 30], [-170, -90], {
    extrapolateRight: 'clamp',
  });

  const opacity = spring({
    frame,
    fps,
    from: 0.3,
    to: 1,
    delay: 100,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const strokeDashoffset = circumference * progress;
  const { entering } = useTransitionProgress();
  const blur = interpolate(entering, [0, 0.6], [10, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorVar('background'),
        filter: `blur(${blur}px)`,
      }}
    >
      <Audio src={props.voiceOver} />
      <div
        style={{
          textAlign: 'center',
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...titleSplit.style,
          color: colorVar('primaryText'),
        }}
      >
        <AbsoluteFill>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
            <defs>
              <linearGradient id="circumference">
                <stop offset="0%" stopOpacity="1" stopColor="#4ea3d2" />
                <stop offset="100%" stopOpacity="0.8" stopColor="#4ea3d2" />
              </linearGradient>

              <linearGradient id="greyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D9DADA" stopOpacity="0.5" />
                <stop offset="40%" stopColor="#D9DADA" stopOpacity="0.1" />
                <stop offset="60%" stopColor="#D9DADA" stopOpacity="0" />
                <stop offset="100%" stopColor="#D9DADA" stopOpacity="0" />
              </linearGradient>
            </defs>
            <AnimatedCup scale={scale} />
            <g
              transform={`
              scale(-1, 1) 
              translate(-${WIDTH}, 0) 
              rotate(${rotation}, ${WIDTH / 2} ${HEIGHT / 2})`}
            >
              <circle
                r={radius}
                cx={WIDTH / 2}
                cy={HEIGHT / 2}
                fill="none"
                // opacity={opacity}
                transform={`
                  scale(${scale})
              `}
                style={{
                  transformOrigin: 'center',
                }}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeWidth="180"
                stroke="url(#circumference)"
              />
            </g>
          </svg>
        </AbsoluteFill>
      </div>
      <AbsoluteFill>
        <div
          style={{
            textAlign: 'center',
            width: WIDTH,
            height: HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 30,
            alignItems: 'center',
            ...titleSplit.style,
            color: colorVar('primaryText'),
          }}
        >
          <img src={props.logo} style={{ height: 100, width: 'auto' }} />
          <TextCharsFromRightToLeftWithRotation
            text={titleSplit.text}
            color={colorVar('primaryText')}
          />
          <TextCharsFromRightToLeftWithRotation
            text={phoneSplit.text}
            color={colorVar('secondaryText')}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene6;

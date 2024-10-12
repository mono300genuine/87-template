import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
  Easing,
  random,
} from 'remotion';

const WIDTH = 1920;
const HEIGHT = 1080;

interface EllipseProps {
  seed: number;
  baseRx: number;
  baseRy: number;
  color: string;
}

const AnimatedEllipse: React.FC<EllipseProps> = ({ seed, baseRx, baseRy, color }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const { initialX, initialY, xMovement, yMovement, scaleFactor, uniqueCycle } = useMemo(() => {
    return {
      initialX: random(`${seed}-x`) * (WIDTH * 0.6) + WIDTH * 0.2, // Random position between 20% and 80% of width
      initialY: random(`${seed}-y`) * (HEIGHT * 0.6) + HEIGHT * 0.2, // Random position between 20% and 80% of height
      xMovement: random(`${seed}-xMovement`) * 200 + 800, // Random x movement between 100 and 300
      yMovement: random(`${seed}-yMovement`) * 200 + 500, // Random y movement between 100 and 300
      scaleFactor: random(`${seed}-scaleFactor`) * 0.1 + 1.8, // Scale factor between 1.1 and 1.3
      uniqueCycle: random(`${seed}-cycle`) * 1000,
    };
  }, [seed]);

  const loopedFrame = (frame + uniqueCycle) % durationInFrames;

  const x = interpolate(
    loopedFrame,
    [0, durationInFrames / 4, durationInFrames / 2, (3 * durationInFrames) / 4, durationInFrames],
    [initialX, initialX + xMovement, initialX - xMovement / 2, initialX + xMovement / 2, initialX],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  const y = interpolate(
    loopedFrame,
    [0, durationInFrames / 3, (2 * durationInFrames) / 3, durationInFrames],
    [initialY, initialY - yMovement, initialY + yMovement, initialY],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  const scale = interpolate(
    loopedFrame,
    [0, durationInFrames / 2, durationInFrames],
    [1, scaleFactor, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  return <ellipse rx={baseRx * scale} ry={baseRy * scale} cx={x} cy={y} fill={color} />;
};

interface LavaLampProps {
  backgroundColor?: string;
  overlayOpacity?: number;
}

const AnimatedBackground: React.FC<LavaLampProps> = ({
  backgroundColor = '#000000',
  overlayOpacity = 0.2,
}) => {
  const ellipses = useMemo(
    () => [
      { seed: 1, baseRx: 300, baseRy: 280, color: 'hsl(37, 99%, 37%)' },
      { seed: 2, baseRx: 300, baseRy: 280, color: 'rgba(230,0, 0, 0.5)' },
      { seed: 3, baseRx: 300, baseRy: 280, color: 'rgba(230,0, 0, 0.8)' },
      { seed: 4, baseRx: 320, baseRy: 300, color: 'hsla(191, 66%, 56%, 1.00)' },
    ],
    []
  );

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT}>
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="800%"
            height="800%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="300"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            />
          </filter>
        </defs>
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={backgroundColor} />

        <g filter="url(#bbblurry-filter) ">
          {ellipses.map((ellipse, index) => (
            <AnimatedEllipse key={index} {...ellipse} />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export default AnimatedBackground;

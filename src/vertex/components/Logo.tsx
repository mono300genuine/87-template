import { Img, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface LogoProps {
  logo: string;
  radius: number;
  direction?: 'from-left' | 'from-right' | 'center';
}

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const angleInRadians = (angle - 90) * (Math.PI / 180.0);
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'Z',
  ].join(' ');

  return d;
};

const leftPoints = (direction: string) => {
  if (direction === 'from-left') {
    return { start: -200, end: 150 };
  }
  if (direction === 'from-right') {
    return { start: 0, end: -400 };
  }
  return { start: 0, end: 0 };
};

const Logo = ({ logo, radius, direction = 'from-left' }: LogoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - 40,
    fps: 30,
    from: 0,
    to: 359.99,
    config: {
      damping: 200,
    },
  });

  const { start, end } = leftPoints(direction);

  const left = spring({
    frame: frame - 40,
    fps: 50,
    from: start,
    to: end,
    config: {
      mass: 1,
      damping: 40,
    },
  });

  const opacity = spring({
    frame: frame - 40,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        width: radius * 2,
        height: radius * 2,
        position: 'absolute',
        left: left,
        opacity: opacity,
      }}
    >
      {/* Circular progress clip mask */}
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        style={{ position: 'absolute', zIndex: 2 }}
      >
        <clipPath id="revealMask">
          <path d={describeArc(radius, radius, radius, 0, progress)} fill="black" />
        </clipPath>
      </svg>

      {/* Image to be revealed */}
      <Img
        src={logo}
        style={{
          width: radius * 2,
          height: radius * 2,
          clipPath: 'url(#revealMask)', // Uses the clip path for circular reveal
          position: 'absolute',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Logo;

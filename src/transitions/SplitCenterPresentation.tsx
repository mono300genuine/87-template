import type { TransitionPresentationComponentProps } from '@remotion/transitions';
import type { TransitionPresentation } from '@remotion/transitions';
import React, { useMemo, useState } from 'react';
import { AbsoluteFill, random } from 'remotion';
import { WIDTH, HEIGHT } from '../lib/consts';

export type CustomPresentationProps = {
  width: number;
  height: number;
  rotation: number;
  backgroundColor: string;
  strokeColor: string;
};

const rectPresentation: React.FC<
  TransitionPresentationComponentProps<CustomPresentationProps>
> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const [clipId] = useState(() => String(random(null)));
  const [filterId] = useState(() => String(random(null)));

  const style: React.CSSProperties = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
      clipPath: presentationDirection === 'exiting' ? undefined : `url(#${clipId})`,
    };
  }, [clipId, presentationDirection]);

  const rectWidth = (WIDTH / 2) * (1 - presentationProgress);

  return (
    <AbsoluteFill style={{ zIndex: 9 }}>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {presentationDirection === 'entering' && (
        <AbsoluteFill>
          <svg
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}
            width="100%"
            height="100%"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          >
            <defs>
              <clipPath id={clipId}>
                <rect x={rectWidth} width={WIDTH - 2 * rectWidth} height={HEIGHT} />
              </clipPath>
              <filter id={filterId}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              </filter>
            </defs>

            <rect
              x={0}
              y={0}
              width={rectWidth}
              height={HEIGHT}
              fill={passedProps.backgroundColor}
              stroke={passedProps.strokeColor}
              strokeWidth="2"
              filter={`url(#${filterId})`}
            />
            <rect
              x={WIDTH - rectWidth}
              y={0}
              width={rectWidth}
              height={HEIGHT}
              fill={passedProps.backgroundColor}
              stroke={passedProps.strokeColor}
              strokeWidth="2"
              filter={`url(#${filterId})`}
            />
          </svg>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const splitCenterPresentation = (
  props: CustomPresentationProps
): TransitionPresentation<CustomPresentationProps> => {
  return { component: rectPresentation, props };
};
import { getBoundingBox, translatePath } from '@remotion/paths';
import { makeRect } from '@remotion/shapes';
import type { TransitionPresentationComponentProps } from '@remotion/transitions';
import type { TransitionPresentation } from '@remotion/transitions';
import React, { useMemo, useState } from 'react';
import { AbsoluteFill, random } from 'remotion';
import { WIDTH } from '../lib/consts';

export type CustomPresentationProps = {
  width: number;
  height: number;
  rotation: number;
};

const rectWidenPresentation: React.FC<
  TransitionPresentationComponentProps<CustomPresentationProps>
> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const finishedRadius = Math.sqrt(passedProps.width ** 2 + passedProps.height ** 2) / 2;
  const _height = finishedRadius * presentationProgress;

  const { path } = makeRect({
    height: _height * 4,
    width: passedProps.width * 4,
  });

  const boundingBox = getBoundingBox(path);
  const translatedPath = translatePath(
    path,
    passedProps.width / 2 - boundingBox.width / 2,
    passedProps.height / 2 - boundingBox.height / 2
  );

  const [clipId] = useState(() => String(random(null)));
  const [filterId] = useState(() => String(random(null)));

  const style: React.CSSProperties = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
      clipPath: presentationDirection === 'exiting' ? undefined : `url(#${clipId})`,
    };
  }, [clipId, presentationDirection]);

  return (
    <AbsoluteFill style={{ zIndex: 9 }}>
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      {presentationDirection === 'entering' && (
        <AbsoluteFill>
          <svg
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
          >
            <defs>
              {/* We use rect so we can have fake an outer stroke blur.  */}
              <rect
                id="gate"
                height="130%"
                y="-15%"
                width="50%"
                fill="none"
                stroke="#4ea3d2"
                strokeWidth="200"
                filter={`url(#${filterId})`}
              />
              <clipPath id={clipId}>
                <rect
                  x={WIDTH / 2 - 960 * presentationProgress}
                  width={1920 * presentationProgress}
                  height="100%"
                />
              </clipPath>
              <filter id={filterId}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              </filter>
            </defs>

            <use
              href="#gate"
              fill="none"
              stroke="#4ea3d2"
              strokeWidth="200"
              x={(-960 - 100) * presentationProgress}
            />
            <use
              href="#gate"
              fill="none"
              stroke="#4ea3d2"
              strokeWidth="200"
              x={960 + (960 + 100) * presentationProgress}
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
  return { component: rectWidenPresentation, props };
};

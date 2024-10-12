import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { interpolateSpring } from '../../lib/helpers';

export const SVGTextCharsFromRightToLeftWithRotation = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = text.split('\n');
  let totalCharCount = 0;

  return (
    <>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        return (
          <text
            key={lineIndex}
            dy={lineIndex * 100}
            fontSize={200}
            fill={color}
            style={{
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 1,
            }}
          >
            {words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                {word.split('').map((char, charIndex) => {
                  const s = spring({
                    fps,
                    frame,
                    delay: 6 + totalCharCount * 1.1,
                    durationInFrames: 10,
                    config: {
                      damping: 200,
                    },
                  });
                  totalCharCount++;
                  return (
                    <tspan
                      key={charIndex}
                      dx={interpolateSpring(s, [50, 0])}
                      rotate={interpolateSpring(s, [15, 0])}
                      opacity={interpolateSpring(s, [0, 1])}
                    >
                      {char}
                    </tspan>
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <tspan>&nbsp;</tspan> // Space between words
                )}
              </React.Fragment>
            ))}
          </text>
        );
      })}
    </>
  );
};

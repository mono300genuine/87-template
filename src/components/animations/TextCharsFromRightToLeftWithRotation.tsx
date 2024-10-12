import React from 'react';
import { useCurrentFrame } from 'remotion';
import { defaultSpring, interpolateSpring } from '../../lib/helpers';

export const TextCharsFromRightToLeftWithRotation = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const lines = text.split('\n');
  let totalCharCount = 0;

  return (
    <>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');

        return (
          <div
            key={lineIndex}
            style={{
              lineHeight: 1,
              margin: 0,
              letterSpacing: 5,
              position: 'relative',
              whiteSpace: 'nowrap',
              color,
            }}
          >
            {words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                {word.split('').map((char, charIndex) => {
                  const spring = defaultSpring({
                    frame,
                    delay: 6 + totalCharCount * 1.1,
                    durationInFrames: 10,
                  });
                  totalCharCount++;
                  return (
                    <span
                      key={charIndex}
                      style={{
                        display: 'inline-block',
                        opacity: `${interpolateSpring(spring, [0, 1])}`,
                        transform: `translateX(${interpolateSpring(spring, [100, 0])}px) rotate(${interpolateSpring(spring, [10, 0])}deg)`,
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <span style={{ display: 'inline-block' }}>&nbsp;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </>
  );
};

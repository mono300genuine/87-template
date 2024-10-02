import { AbsoluteFill } from 'remotion'

import Cross from '../../components/Cross';
import Lamp from '../../components/Lamp';
import { defineBackground } from '../define';
import { colorVar } from '../../lib/helpers';
import { Color } from '../../types';
import { z } from 'zod';
import { HEIGHT, WIDTH } from '../../lib/consts';


export const LampedCrosses = defineBackground({
  type: 'lamped-crosses',
  description: 'A background with lights from lamps with crosses',
  schema: z.object({
    background: Color,
    stroke: Color,
    scene: z.number()
  }),
  component: ({ stroke, scene, background }) => {
    const props = { bgColor: colorVar(background), strokeColor: colorVar(stroke) }

    const crossArray = [];

    for (let i = 0; i < WIDTH / 250; i++)
      for (let j = 0; j < HEIGHT / 250; j++) {
        const cross = (
          <div
            style={{
              position: 'absolute',
              left: 250 * i - 50,
              top: 250 * j - 125 * (i % 2) - 50,
            }}
            key={`${i} - ${j}`}
          >
            <Cross color={props.strokeColor} seed={Math.random() * 50} />
          </div>
        );

        crossArray.push(cross);
      }
    return (
      <AbsoluteFill
        style={{
          position: 'absolute',
          backgroundColor: props.bgColor,
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {crossArray}
        {(scene === 1 || scene === 6) && (
          <>
            <div style={{ position: 'absolute' }}>
              <Lamp />
            </div>
            <div
              style={{ position: 'absolute', left: 0, top: 0, transform: `translate(-50%, -50%)` }}
            >
              <Lamp />
            </div>
            <div
              style={{ position: 'absolute', bottom: 0, right: 0, transform: `translate(50%, 50%)` }}
            >
              <Lamp />
            </div>
          </>
        )}
        {(scene === 2 || scene === 5) && (
          <>
            <div style={{ position: 'absolute', left: -250, top: -250 }}>
              <Lamp />
            </div>
          </>
        )}
        {(scene === 3 || scene === 4) && (
          <>
            <div style={{ position: 'absolute', right: -250, top: -250 }}>
              <Lamp />
            </div>
          </>
        )}
      </AbsoluteFill>
    );
  }
});



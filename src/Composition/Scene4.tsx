import { AbsoluteFill, Sequence } from 'remotion';

import { z } from 'zod';
import Image from '../components/Image';
import Logo from '../components/Logo';
import { Background } from '../components/Background';
import { WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';


export const scene4Schema = z.object({
  logo: z.string(),
  img: z.string(),
});

type Scene4Props = z.infer<typeof scene4Schema> & {
  background: BackgroundProps
};

const Scene4: React.FC<Scene4Props> = (props) => {

  return (
    <AbsoluteFill>
      <Background {...props.background} />
      <Sequence from={-10}>
        <div
          style={{
            display: 'flex',
            margin: '100px',
            paddingTop: '100px',
            justifyContent: 'space-between',
            width: WIDTH,
          }}
        >
          <Image img={props.img} radius={400} strokeColor={colorVar("secondary")} strokeWidth={50} />
          <div style={{ position: 'relative' }}>
            <Logo logo={props.logo} radius={180} direction="from-right" />
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export default Scene4;

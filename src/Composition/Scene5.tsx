import { AbsoluteFill, Sequence, } from 'remotion';
import { z } from 'zod';
import Image from '../components/Image';
import Logo from '../components/Logo';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { WIDTH } from '../lib/consts';

export const scene5Schema = z.object({
  logo: z.string(),
  img: z.string(),
});

type Scene5Props = z.infer<typeof scene5Schema> & { background: BackgroundProps };

const Scene5: React.FC<Scene5Props> = (props) => {
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
            width:WIDTH,
          }}
        >
          <div style={{ position: 'relative' }}>
            <Logo logo={props.logo} radius={180} direction="from-left" />
          </div>
          <Image img={props.img} radius={400} strokeColor="#5118DB" strokeWidth={50} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export default Scene5;

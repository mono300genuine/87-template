import { AbsoluteFill } from 'remotion';
import { z } from 'zod';
import Logo from '../components/Logo';
import Image from '../components/Image';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';


export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & {background: BackgroundProps};

const Scene3: React.FC<Scene3Props> = (props) => {

  return (
    <AbsoluteFill>
        <Background {...props.background} />

      <div
        style={{
          display: 'flex',
          margin: '100px',
          paddingTop: '100px',
          justifyContent: 'space-between',
        }}
      >
        <Image img={props.img} radius={400} strokeColor={colorVar("secondary")} strokeWidth={50} />
        <div style={{ position: 'relative' }}>
          <Logo logo={props.logo} radius={180} direction="from-right" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene3;

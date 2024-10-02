import { AbsoluteFill} from 'remotion';

import { z } from 'zod';
import Image from '../components/Image';
import Logo from '../components/Logo';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { colorVar } from '../lib/helpers';


export const scene2Schema = z.object({
  logo: z.string(),
  img: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {


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
        <div>
          <Logo logo={props.logo} radius={180} />
        </div>
        <Image img={props.img} radius={400} strokeColor={colorVar("secondary")} strokeWidth={50} />
      </div>
    </AbsoluteFill>
  );
};

export default Scene2;

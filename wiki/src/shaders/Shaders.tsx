import { Shader} from "./Shader"
import TEST from './test.frag?raw'

function Shaders() {
    return <>
        shaders

        <Shader width={800} height={600} fragmentSource={TEST} />
    </>
}

export default Shaders

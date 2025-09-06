import {useClient} from 'wagmi'
import { config } from './config'

function App(){
    const client = useClient({
        config,
    })
    
}
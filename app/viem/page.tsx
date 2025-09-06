// 1. Import modules. 
import { useMutation, useQuery } from '@tanstack/react-query'
import { http, createConfig, useClient, useConnectorClient } from 'wagmi' 
import { base, mainnet, optimism, zora } from 'wagmi/chains' 
import { getLogs, watchAsset } from 'viem/actions'

// 2. Set up a Wagmi Config 
export const config = createConfig({ 
  chains: [base, mainnet, optimism, zora], 
  transports: { 
    [base.id]: http(), 
    [mainnet.id]: http(), 
    [optimism.id]: http(), 
    [zora.id]: http(), 
  }, 
}) 

export default function ViemPage() {
  // 3. Extract a Viem Client for the current active chain.
  const publicClient = useClient({ config })

  // 4. Create a "custom" Query Hook that utilizes the Client.
  const { data: logs } = useQuery({
    queryKey: ['logs', publicClient.uid],
    queryFn: () => getLogs(publicClient, /* ... */)
  })
  
  // 5. Extract a Viem Client for the current active chain & account.
  const { data: walletClient } = useConnectorClient({ config })

  // 6. Create a "custom" Mutation Hook that utilizes the Client.
  const { mutate } = useMutation({
    mutationFn: (asset) => watchAsset(walletClient, asset)
  })

  return (
    <div>
      Viem Connecting
    </div>
  )
}
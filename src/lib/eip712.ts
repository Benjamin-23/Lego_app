import { signTypedData } from '@wagmi/core'
import { config } from '@/lib/web3'
import type { Eip712Domain, Eip712Types, Eip712Message } from '@/lib/utils'

export type SignTypedDataParams = {
  domain: Eip712Domain
  types: Eip712Types
  primaryType: string
  message: Eip712Message
  account?: `0x${string}`
}

export async function signEip712(params: SignTypedDataParams) {
  const { domain, types, primaryType, message, account } = params
  // wagmi signTypedData expects "EIP712Domain" to be omitted
  const { EIP712Domain: _omit, ...typed } = types
  return await signTypedData(config, {
    account,
    domain,
    types: typed,
    primaryType: primaryType as any,
    message,
  })
}



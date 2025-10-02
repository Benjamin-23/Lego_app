'use client'

import { useAccount } from 'wagmi'
import { useCallback } from 'react'
import { signEip712, type SignTypedDataParams } from '@/lib/eip712'

export function useEip712Signature() {
  const { address } = useAccount()

  const sign = useCallback(async (params: Omit<SignTypedDataParams, 'account'> & { account?: `0x${string}` }) => {
    const account = params.account ?? address
    if (!account) throw new Error('No connected account')
    return await signEip712({ ...params, account })
  }, [address])

  return { sign }
}



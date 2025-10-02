import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// EIP-712 helpers
export type Eip712Domain = {
  name?: string
  version?: string
  chainId?: number
  verifyingContract?: `0x${string}`
  salt?: `0x${string}`
}

export type Eip712Types = Record<string, Array<{ name: string; type: string }>>

export type Eip712Message = Record<string, unknown>


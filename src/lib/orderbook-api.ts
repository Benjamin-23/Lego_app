const DOMA_API_BASE = 'https://api-testnet.doma.xyz';

const domaFetch = (endpoint: string, options?: RequestInit) => 
  fetch(`${DOMA_API_BASE}${endpoint}`, options);

export interface OrderParameters {
  offerer: string;
  zone: string;
  orderType: number;
  startTime: string;
  endTime: string;
  zoneHash: string;
  salt: string;
  offer: any[];
  consideration: any[];
  totalOriginalConsiderationItems: number;
  conduitKey: string;
  counter: string;
}

export interface CreateOrderRequest {
  orderbook: 'OPENSEA' | 'DOMA';
  chainId: string;
  parameters: OrderParameters;
  signature: string;
}

export interface CancelOrderRequest {
  orderId: string;
  signature: string;
}

export interface CurrencyInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface FeeInfo {
  recipient: string;
  basisPoints: number;
}

// Orderbook API functions
export const orderbookApi = {
  // Create Listing
  createListing: (data: CreateOrderRequest) => 
    domaFetch('/v1/orderbook/list', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
         'accept': '*/*',
         'Content-Type': 'application/json',
         'api-key': process.env.NEXT_PUBLIC_DOMA_API_KEY || '',
         'Content-length': '705'},
    }),

  // Create Offer
  createOffer: (data: CreateOrderRequest) => 
    domaFetch('/v1/orderbook/offer', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
         'Content-Type': 'application/json',
         'api-key': process.env.NEXT_PUBLIC_DOMA_API_KEY || '',
         'Content-length': '705'
         },
         
    }),

  // Get Listing Fulfillment Data
  getListingFulfillment: (orderId: string, buyer: string) =>
    domaFetch(`/v1/orderbook/listing/${orderId}/${buyer}`),

  // Get Offer Fulfillment Data
  getOfferFulfillment: (orderId: string, fulfiller: string) =>
    domaFetch(`/v1/orderbook/offer/${orderId}/${fulfiller}`),

  // Cancel Listing
  cancelListing: (data: CancelOrderRequest) =>
    domaFetch('/v1/orderbook/listing/cancel', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Cancel Offer
  cancelOffer: (data: CancelOrderRequest) =>
    domaFetch('/v1/orderbook/offer/cancel', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get Orderbook Fees
  getFees: (orderbook: string, chainId: string, contractAddress: string) =>
    domaFetch(`/v1/orderbook/fee/${orderbook}/${chainId}/${contractAddress}`),

  // Get Supported Currencies
  getCurrencies: (chainId: string, contractAddress: string, orderbook: string) =>
    domaFetch(`/v1/orderbook/currencies/${chainId}/${contractAddress}/${orderbook}`),
};
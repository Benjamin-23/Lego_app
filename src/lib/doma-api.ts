import { GraphQLClient } from 'graphql-request';

const DOMA_TESTNET_ENDPOINT = 'https://api-testnet.doma.xyz/graphql';

export const domaClient = new GraphQLClient(DOMA_TESTNET_ENDPOINT);

// GraphQL Queries
export const GET_RECENT_NAMES = `
  query GetRecentNames($take: Int!, $skip: Int!) {
    names(take: $take, skip: $skip, sortOrder: DESC) {
      items {
        name
        claimStatus
        createdAt
        networkId
        registrarIanaId
        tld
        owner {
          address
        }
      }
      totalCount
    }
  }
`;

export const GET_ACTIVE_LISTINGS = `
  query GetActiveListings($take: Int!, $skip: Int!) {
    listings(take: $take, skip: $skip) {
      items {
        id
        price
        currency
        createdAt
        name {
          name
          tld
          owner {
            address
          }
        }
      }
      totalCount
    }
  }
`;

export const GET_NAME_ACTIVITIES = `
  query GetNameActivities($name: String!, $take: Float!, $skip: Float!) {
    nameActivities(name: $name, take: $take, skip: $skip) {
      items {
        id
        type
        timestamp
        transactionHash
        from {
          address
        }
        to {
          address
        }
      }
      totalCount
    }
  }
`;

export const GET_NAME_STATISTICS = `
  query GetNameStatistics($tokenId: String!) {
    nameStatistics(tokenId: $tokenId) {
      totalTransactions
      totalOffers
      lastSalePrice
      lastSaleCurrency
      averagePrice
    }
  }
`;

// Types based on DOMA API
export interface NameModel {
  name: string;
  claimStatus: 'CLAIMED' | 'UNCLAIMED';
  createdAt: string;
  networkId: string;
  registrarIanaId: number;
  tld: string;
  owner: {
    address: string;
  };
}

export interface ListingModel {
  id: string;
  price: string;
  currency: string;
  createdAt: string;
  name: {
    name: string;
    tld: string;
    owner: {
      address: string;
    };
  };
}

export interface NameActivityModel {
  id: string;
  type: string;
  timestamp: string;
  transactionHash: string;
  from: { address: string };
  to: { address: string };
}
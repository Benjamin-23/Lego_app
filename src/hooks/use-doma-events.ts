'use client';

import { useState, useEffect, useCallback } from 'react';

export interface DomaEvent {
  id: number;
  name: string;
  tokenId: string;
  type: string;
  uniqueId: string;
  relayId: string;
  eventData: {
    networkId: string;
    finalized: boolean;
    txHash: string;
    blockNumber: string;
    logIndex: number;
    tokenAddress: string;
    tokenId: string;
    type: string;
    owner: string;
    name: string;
    expiresAt: string;
    correlationId: string;
  };
}

interface PollResponse {
  events: DomaEvent[];
  lastId: number;
  hasMoreEvents: boolean;
}

export function useDomaEvents(pollInterval: number = 5000) {
  const [events, setEvents] = useState<DomaEvent[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pollEvents = useCallback(async () => {
    try {
      const response = await fetch(`https://api-testnet.doma.xyz/v1/poll`, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.NEXT_PUBLIC_DOMA_API_KEY || ''
        }
      });
    //   console.log('Fetch response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PollResponse = await response.json();
    //   console.log('Polled events:', data.events);
      
      if (data.events && data.events.length > 0) {
        setEvents(prev => [...data.events, ...prev].slice(0, 100)); // Keep last 50 events
        setLastId(data.lastId);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error polling DOMA events:', err);
      setError('Failed to fetch real-time events');
    } finally {
      setLoading(false);
    }
  }, [lastId]);

  useEffect(() => {
    // Initial poll
    pollEvents();

    // Set up interval for continuous polling
    const intervalId = setInterval(pollEvents, pollInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [pollEvents, pollInterval]);

  return { events, loading, error, lastEventId: lastId, pollEvents };
}
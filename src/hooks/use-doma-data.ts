'use client';

import { useState, useEffect } from 'react';
import { domaClient, GET_RECENT_NAMES, GET_ACTIVE_LISTINGS, NameModel, ListingModel } from '@/lib/doma-api';

export function useDomaData() {
  const [recentNames, setRecentNames] = useState<NameModel[]>([]);
  const [activeListings, setActiveListings] = useState<ListingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDomaData() {
      try {
        setLoading(true);
        
        // Fetch recent names
        const namesData = await domaClient.request(GET_RECENT_NAMES, {
          take: 10,
          skip: 0,
        }) as { names: { items: NameModel[] } };

        // Fetch active listings
        const listingsData = await domaClient.request(GET_ACTIVE_LISTINGS, {
          take: 5,
          skip: 0,
        }) as { listings: { items: ListingModel[] } };

        setRecentNames(namesData.names.items);
        setActiveListings(listingsData.listings.items);
        setError(null);
      } catch (err) {
        console.error('Error fetching DOMA data:', err);
        setError('Failed to load domain data');
      } finally {
        setLoading(false);
      }
    }

    fetchDomaData();
  }, []);

  return { recentNames, activeListings, loading, error };
}
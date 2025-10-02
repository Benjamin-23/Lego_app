'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DomaEvent } from '@/hooks/use-doma-events';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, ExternalLink, Zap, Shield, Coins, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';

interface LiveEventsProps {
  events: DomaEvent[];
  loading: boolean;
  onRefresh?: () => void;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'NAME_TOKEN_MINTED':
      return <Zap className="h-3 w-3 text-green-500" />;
    case 'NAME_TOKEN_BURNED':
      return <Shield className="h-3 w-3 text-red-500" />;
    case 'NAME_TOKEN_TRANSFER':
      return <Coins className="h-3 w-3 text-blue-500" />;
    default:
      return <Zap className="h-3 w-3 text-gray-500" />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'NAME_TOKEN_MINTED':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'NAME_TOKEN_BURNED':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'NAME_TOKEN_TRANSFER':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatEventType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase();
};

const EVENT_TYPES = [
  'ALL',
  'NAME_TOKEN_MINTED',
  'NAME_TOKEN_BURNED',
  'NAME_TOKEN_TRANSFERRED',
  "NAME TOKENIZATION REQUESTED",
  "NAME TOKEN RENEWED",
] as const;

type EventType = typeof EVENT_TYPES[number];

const PAGE_SIZES = [10, 25, 50] as const;

export function LiveEvents({ events, loading, onRefresh }: LiveEventsProps) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedEventType, setSelectedEventType] = useState<EventType>('ALL');

  // Filter events by type
  const filteredEvents = useMemo(() => {
    if (selectedEventType === 'ALL') {
      return events;
    }
    return events.filter(event => event.type === selectedEventType);
  }, [events, selectedEventType]);

  // Paginate events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredEvents.slice(0, endIndex);
  }, [filteredEvents, currentPage, pageSize]);

  // const totalPages = Math.ceil(filteredEvents.length / pageSize);
  const hasMoreEvents = paginatedEvents.length < filteredEvents.length;

  const handleRefresh = () => {
    setCurrentPage(1);
    onRefresh?.();
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleEventTypeChange = (value: string) => {
    setSelectedEventType(value as EventType);
    setCurrentPage(1);
  };

  if (loading && events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Domain Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Domain Events
            <Badge variant="secondary">
              {filteredEvents.length} {selectedEventType !== 'ALL' ? `${selectedEventType.replace(/_/g, ' ').toLowerCase()} ` : ''}events
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>

        {/* Filters and Pagination Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Event Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedEventType} onValueChange={handleEventTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'ALL' ? 'All Events' : formatEventType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page Info */}
          <div className="flex-1 flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <span>
              Showing {paginatedEvents.length} of {filteredEvents.length} events
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {paginatedEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {selectedEventType !== 'ALL' 
                ? `No ${selectedEventType.replace(/_/g, ' ').toLowerCase()} events found.`
                : 'No recent events. New domain activities will appear here.'
              }
            </div>
          ) : (
            <>
              {/* Events List */}
              <div className="max-h-[400px] overflow-y-auto">
                {paginatedEvents.map((event) => (
                  <div
                    key={`${event.id}-${event.uniqueId}`}
                    className="p-3 border rounded-lg hover:bg-accent/50 transition-colors group mb-2"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <span className="font-mono font-medium text-sm">
                          {event.name}
                        </span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getEventColor(event.type)}`}
                      >
                        {formatEventType(event.type)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {event.eventData.owner
                            ? `${event.eventData.owner.slice(0, 8)}...${event.eventData.owner.slice(-6)}`
                            : <span className="italic text-gray-400">unknown</span>
                          }
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date().toLocaleTimeString()}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>

                    {event.eventData.expiresAt && (
                      <div className="mt-2 text-xs">
                        <span className="text-muted-foreground">Expires: </span>
                        {new Date(event.eventData.expiresAt).toLocaleDateString()}
                      </div>
                    )}

                    {/* Transaction Hash */}
                    {event.eventData.txHash && (
                      <div className="mt-1 text-xs">
                        <span className="text-muted-foreground">TX: </span>
                        <span className="font-mono">
                          {event.eventData.txHash.slice(0, 10)}...{event.eventData.txHash.slice(-8)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreEvents && (
                <div className="flex justify-center pt-4">
                  <Button 
                    variant="outline" 
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Load More ({filteredEvents.length - paginatedEvents.length} remaining)
                  </Button>
                </div>
              )}

              {/* End of Results */}
              {!hasMoreEvents && filteredEvents.length > 0 && (
                <div className="text-center py-4 text-sm text-muted-foreground border-t">
                  Showing all {filteredEvents.length} events
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
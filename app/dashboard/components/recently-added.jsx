'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getComplaints } from '@/lib/http';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentlyAdded() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getComplaints();
        data.reverse();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-8 h-[375px] overflow-y-scroll">
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              {/* <Skeleton className="h-8 w-16" /> */}
            </div>
          ))
        : complaints.map((complaint) => (
            <div key={complaint.id} className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {complaint.insight}
                </p>
                <p className="text-sm text-muted-foreground">
                  {complaint.category}
                </p>
              </div>
              {/* <div className="ml-auto font-medium">
                <Button variant="ghost">View</Button>
              </div> */}
            </div>
          ))}
    </div>
  );
}

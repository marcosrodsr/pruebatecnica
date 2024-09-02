import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalState';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
}

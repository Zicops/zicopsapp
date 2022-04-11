import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { queryClient } from '../API/Queries';

export function getQueryData(QUERY, variablesObj = {}) {
  const data = useQuery(QUERY, {
    variables: variablesObj,
    client: queryClient
  });

  useEffect(() => {
    if (data.error) {
      console.error('Course Get Error: ', data.error);
      // alert('Error');
      return data;
    }
  }, [data]);

  return data;
}

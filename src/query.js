import { QueryObserver } from 'react-query/core';
import { readable } from 'svelte/store';
import { getContext } from 'svelte'

const initialState = {
    status: 'loading',
    data: undefined,
    error: null,
    isError: false,
    isFetching: true,
    isLoading: true,
    refetch: () => {}
}

export const useQuery = (queryKey, queryFn, options) => {
    const queryClient = getContext('queryClient')
    const observer = new QueryObserver(queryClient, {
        queryKey,
        queryFn,
        ...options
    });

    return readable(initialState, (set) => {
        const unsubscribe = observer.subscribe(result => {
            set(result);
        });
        return unsubscribe;
    });
}
"use client";
import React from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const QueryClientProviders = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const queryClient = new QueryClient()

    return <ReactQueryClientProvider client={queryClient}

    >
        <button onClick={() => setIsOpen(!isOpen)}>Toggle Devtools</button>
        {children}

        <ReactQueryDevtools initialIsOpen={false} isOpen={isOpen} client={queryClient} />
    </ReactQueryClientProvider>
}

export default QueryClientProviders
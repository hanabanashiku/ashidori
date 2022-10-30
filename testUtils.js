/* eslint-disable no-console */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

function Wrapper({ children }) {
    const queryClient = useRef(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
                logger: {
                    log: console.log,
                    warn: console.warn,
                    error: () => {},
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient.current}>
            {children}
        </QueryClientProvider>
    );
}
Wrapper.propTypes = {
    children: PropTypes.any,
};

function customRender(ui, options) {
    return render(ui, {
        wrapper: Wrapper,
        ...options,
    });
}

export * from '@testing-library/react';

export { customRender as render, render as defaultRender };

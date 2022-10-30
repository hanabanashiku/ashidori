/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Theme from '../Theme';
import Popup from './Popup';
import DetailWrapper from './DetailWrapper';

const root = document.getElementById('root');
const name = window.location.pathname.split('/').pop();
const queryClient = new QueryClient();

ReactDOM.render(
    <Theme>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={`/${name}`} element={<Popup />} />
                    <Route
                        path={`${name}/detail/:id`}
                        element={<DetailWrapper />}
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </Theme>,
    root
);

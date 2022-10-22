/* istanbul ignore file */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Theme from '../Theme'

// Pages
import Options from './Options'
import KitsuLogin from './SignIn/Kitsu'

const root = document.getElementById('root')
const name = window.location.pathname.split('/').pop()

ReactDOM.render(
    <Theme>
        <BrowserRouter>
            <Routes>
                <Route path={`/${name}`} element={<Options />} />
                <Route
                    path={`/${name}/signin/kitsu`}
                    element={<KitsuLogin />}
                />
            </Routes>
        </BrowserRouter>
    </Theme>,
    root
)

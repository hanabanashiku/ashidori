import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Options from '../Options'
import * as builder from '../../providers/builder'

describe('Options page', () => {
    jest.spyOn(builder, 'getApiInstance').mockResolvedValue(null)

    it('renders the options page', async () => {
        render(
            <MemoryRouter>
                <Options />
            </MemoryRouter>
        )

        await waitFor(() =>
            expect(
                screen.getByText(/choose your anime list provider below\./i)
            ).toBeInTheDocument()
        )
        expect(screen.getByText(/enable integrations on/i)).toBeInTheDocument()
        expect(screen.getByText(/options/i)).toBeInTheDocument()
    })
})

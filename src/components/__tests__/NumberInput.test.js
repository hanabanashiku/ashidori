import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NumberInput from '../NumberInput'

describe('Number input', () => {
    it('blocks scroll wheel from updating', () => {
        render(<NumberInput id="test" />)

        const input = screen.getByRole('spinbutton')
        userEvent.type(input, '123')
        fireEvent.wheel(input, { scrollY: 100 })
        expect(input).toHaveValue(123)
    })
})

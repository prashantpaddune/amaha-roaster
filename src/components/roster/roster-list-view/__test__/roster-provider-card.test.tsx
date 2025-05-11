import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProviderCard from '../roster-provider-card';

describe('ProviderCard', () => {
    const defaultProps = {
        id: 123,
        name: 'Dr. John Doe',
        avatarUrl: '/avatar.jpg',
        homeCount: 7,
        videoCount: 3,
    };

    it('renders name with correct styling', () => {
        render(<ProviderCard {...defaultProps} />);
        const nameEl = screen.getByText('Dr. John Doe');
        expect(nameEl).toBeInTheDocument();
        expect(nameEl).toHaveClass('text-sm', 'font-semibold', 'text-davy-green', 'underline');
    });

    it('does not render calendar link when calendarHref is not provided', () => {
        render(<ProviderCard {...defaultProps} />);
        const link = screen.queryByText(/view calendar/i);
        expect(link).toBeNull();
    });
});

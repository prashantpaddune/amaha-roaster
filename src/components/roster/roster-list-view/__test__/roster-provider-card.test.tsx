import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

vi.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children, ...rest }: any) => (
        <a href={href} {...rest}>{children}</a>
    ),
}));

vi.mock('@/icons/clinic', () => ({ ClinicIcon: (props: any) => <span data-testid="clinic-icon" {...props} /> }));
vi.mock('@/icons/video', () => ({ VideoIcon: (props: any) => <span data-testid="video-icon" {...props} /> }));
vi.mock('@/icons/chevron-right', () => ({ ChevronRightIcon: (props: any) => <span data-testid="chevron-icon" {...props} /> }));

import ProviderCard from '../roster-provider-card';

afterEach(() => {
    cleanup();
});

describe('ProviderCard', () => {
    const defaultProps = {
        id: 123,
        name: 'Dr. John Doe',
        avatarUrl: '/avatar.jpg',
        homeCount: 7,
        videoCount: 3,
    };

    it('renders avatar image with correct src and alt', () => {
        render(<ProviderCard {...defaultProps} />);
        const img = screen.getByRole('img') as HTMLImageElement;
        expect(img.src).toContain('/avatar.jpg');
        expect(img.alt).toBe('Dr. John Doe');
    });

    it('renders name with correct styling', () => {
        render(<ProviderCard {...defaultProps} />);
        const nameEl = screen.getByText('Dr. John Doe');
        expect(nameEl).toBeInTheDocument();
        expect(nameEl).toHaveClass('text-sm', 'font-semibold', 'text-davy-green', 'underline');
    });

    it('renders home and video counts with icons', () => {
        render(<ProviderCard {...defaultProps} />);
        const clinicIcon = screen.getByTestId('clinic-icon');
        const homeCount = screen.getByText('7');
        expect(clinicIcon).toBeInTheDocument();
        expect(homeCount).toBeInTheDocument();

        const videoIcon = screen.getByTestId('video-icon');
        const videoCount = screen.getByText('3');
        expect(videoIcon).toBeInTheDocument();
        expect(videoCount).toBeInTheDocument();
    });

    it('does not render calendar link when calendarHref is not provided', () => {
        render(<ProviderCard {...defaultProps} />);
        const link = screen.queryByText(/view calendar/i);
        expect(link).toBeNull();
    });

    it('renders calendar link when calendarHref is provided', () => {
        render(<ProviderCard {...defaultProps} calendarHref="/cal" />);
        const link = screen.getByRole('link', { name: /view calendar/i }) as HTMLAnchorElement;
        expect(link).toBeInTheDocument();
        expect(link.href).toContain('/cal');
        const chevron = screen.getByTestId('chevron-icon');
        expect(chevron).toBeInTheDocument();
    });
});

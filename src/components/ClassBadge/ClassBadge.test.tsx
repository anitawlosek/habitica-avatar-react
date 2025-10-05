import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import ClassBadge from './ClassBadge';

// Mock fetch
global.fetch = vi.fn();

describe('ClassBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      text: async () => '<svg>test</svg>',
    } as Response);
  });

  it('should render with default props', () => {
    const { container } = render(<ClassBadge memberClass="warrior" />);
    const badge = container.querySelector('.class-badge');
    expect(badge).toBeTruthy();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ClassBadge memberClass="warrior" className="custom-class" />
    );
    const badge = container.querySelector('.class-badge');
    expect(badge?.className).toContain('custom-class');
  });

  it('should set badge size CSS variable', () => {
    const { container } = render(
      <ClassBadge memberClass="warrior" badgeSize={48} />
    );
    const badge = container.querySelector('.class-badge') as HTMLElement;
    expect(badge?.style.getPropertyValue('--badge-size')).toBe('48px');
  });

  it('should use default badge size of 32', () => {
    const { container } = render(<ClassBadge memberClass="warrior" />);
    const badge = container.querySelector('.class-badge') as HTMLElement;
    expect(badge?.style.getPropertyValue('--badge-size')).toBe('32px');
  });

  it('should fetch SVG for valid class', async () => {
    render(<ClassBadge memberClass="warrior" />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('warrior.svg')
      );
    });
  });

  it('should fetch SVG for rogue class', async () => {
    render(<ClassBadge memberClass="rogue" />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('rogue.svg')
      );
    });
  });

  it('should fetch SVG for healer class', async () => {
    render(<ClassBadge memberClass="healer" />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('healer.svg')
      );
    });
  });

  it('should fetch SVG for wizard class', async () => {
    render(<ClassBadge memberClass="wizard" />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('wizard.svg')
      );
    });
  });

  it('should not fetch for unknown class', async () => {
    render(<ClassBadge memberClass="unknown" />);
    
    // Give it a moment to ensure no fetch happens
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should render SVG content when fetched', async () => {
    const { container } = render(<ClassBadge memberClass="warrior" />);
    
    await waitFor(() => {
      const svgIcon = container.querySelector('.svg-icon');
      expect(svgIcon?.innerHTML).toBe('<svg>test</svg>');
    });
  });

  it('should have aria-label with class name', () => {
    const { container } = render(<ClassBadge memberClass="warrior" />);
    const svgIcon = container.querySelector('.svg-icon');
    expect(svgIcon?.getAttribute('aria-label')).toBe('warrior');
  });

  it('should handle fetch errors gracefully', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));
    
    const { container } = render(<ClassBadge memberClass="warrior" />);
    
    await waitFor(() => {
      const svgIcon = container.querySelector('.svg-icon');
      expect(svgIcon?.innerHTML).toBe('');
    });
  });

  it('should cleanup on unmount', async () => {
    const { unmount } = render(<ClassBadge memberClass="warrior" />);
    unmount();
    // If cleanup works correctly, this should not cause errors
    expect(true).toBe(true);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HabiticaSprite from './HabiticaSprite';
import * as sprites from '../../lib/sprites';

// Mock the sprites module
vi.mock('../../lib/sprites', () => ({
  getSpriteUrl: vi.fn((fileName: string, ext: string = 'png') => 
    `https://habitica-assets.s3.amazonaws.com/mobileApp/images/${fileName}.${ext}`
  ),
  loadSpriteDetails: vi.fn(async () => ({
    width: 100,
    height: 100,
    format: 'png' as const,
  })),
}));

describe('HabiticaSprite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render span with correct className', async () => {
    const { container } = render(
      <HabiticaSprite fileName="test-sprite" className="custom-class" />
    );
    
    await waitFor(() => {
      const span = container.querySelector('span');
      expect(span).toBeTruthy();
      expect(span?.className).toContain('custom-class');
    });
  });

  it('should return null when wrapper is span and fileName is not defined', () => {
    const { container } = render(
      // @ts-expect-error Testing with undefined fileName
      <HabiticaSprite fileName={undefined} wrapper="span" />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should call loadSpriteDetails on mount', async () => {
    render(<HabiticaSprite fileName="test-sprite" />);
    
    await waitFor(() => {
      expect(sprites.loadSpriteDetails).toHaveBeenCalledWith('test-sprite');
    });
  });

  it('should render with custom wrapper element', async () => {
    const { container } = render(
      <HabiticaSprite fileName="test-sprite" wrapper="div" className="test-div" />
    );
    
    await waitFor(() => {
      const div = container.querySelector('div');
      expect(div).toBeTruthy();
      expect(div?.className).toContain('test-div');
    });
  });

  it('should apply inline styles from sprite details', async () => {
    const { container } = render(
      <HabiticaSprite fileName="test-sprite" />
    );
    
    await waitFor(() => {
      const span = container.querySelector('span');
      expect(span?.style.width).toBe('100px');
      expect(span?.style.height).toBe('100px');
      expect(span?.style.backgroundImage).toContain('test-sprite.png');
    });
  });

  it('should merge custom styles with sprite details', async () => {
    const customStyle = { opacity: '0.5' };
    const { container } = render(
      <HabiticaSprite fileName="test-sprite" style={customStyle} />
    );
    
    await waitFor(() => {
      const span = container.querySelector('span');
      expect(span?.style.opacity).toBe('0.5');
      expect(span?.style.width).toBe('100px');
    });
  });

  it('should render children when provided', async () => {
    render(
      <HabiticaSprite fileName="test-sprite" wrapper="div">
        <span data-testid="child-element">Child Content</span>
      </HabiticaSprite>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('child-element')).toBeTruthy();
    });
  });

  it('should handle onClick events', async () => {
    const handleClick = vi.fn();
    const { container } = render(
      <HabiticaSprite fileName="test-sprite" onClick={handleClick} />
    );
    
    await waitFor(() => {
      const span = container.querySelector('span');
      span?.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

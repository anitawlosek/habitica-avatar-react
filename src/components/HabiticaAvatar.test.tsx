import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HabiticaAvatar from './HabiticaAvatar';
import { warriorMockMember, mockMemberSleeping, mockMemberWithBuffs } from '../mocks/memberData';

describe('HabiticaAvatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<HabiticaAvatar member={warriorMockMember} />);
    expect(container.querySelector('.avatar')).toBeInTheDocument();
  });

  it('applies debug mode classes when debugMode is true', () => {
    const { container } = render(<HabiticaAvatar member={warriorMockMember} debugMode={true} />);
    expect(container.firstChild).toHaveClass('debug');
  });

  it('centers avatar when centerAvatar is true', () => {
    const { container } = render(<HabiticaAvatar member={warriorMockMember} centerAvatar={true} />);
    expect(container.firstChild).toHaveClass('centered-avatar');
  });

  it('applies custom width and height', () => {
    const { container } = render(
      <HabiticaAvatar member={warriorMockMember} width="200px" height="250px" />
    );
    const avatar = container.firstChild as HTMLElement;
    expect(avatar).toHaveStyle('width: 200px');
    expect(avatar).toHaveStyle('height: 250px');
  });

  it('hides class badge by default when member has class', () => {
    render(<HabiticaAvatar member={warriorMockMember} />);
    expect(screen.queryByText('warrior')).not.toBeInTheDocument();
  });

  it('shows class badge when hideClassBadge is false', () => {
    render(<HabiticaAvatar member={warriorMockMember} hideClassBadge={false} />);
    expect(screen.getByText('warrior')).toBeInTheDocument();
  });

  it('shows sleep indicator when member is sleeping', () => {
    const { container } = render(<HabiticaAvatar member={mockMemberSleeping} />);
    expect(container.querySelector('.zzz')).toBeInTheDocument();
  });

  it('shows visual buffs when enabled', () => {
    const { container } = render(
      <HabiticaAvatar member={mockMemberWithBuffs} showVisualBuffs={true} />
    );
    expect(container.querySelector('.ghost')).toBeInTheDocument();
  });

  it('hides visual buffs when disabled', () => {
    const { container } = render(
      <HabiticaAvatar member={mockMemberWithBuffs} showVisualBuffs={false} />
    );
    expect(container.querySelector('.ghost')).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<HabiticaAvatar member={warriorMockMember} onClick={handleClick} />);
    
    fireEvent.click(container.firstChild as Element);
    expect(handleClick).toHaveBeenCalledWith(warriorMockMember);
  });

  it('shows background class when withBackground is true', () => {
    const { container } = render(
      <HabiticaAvatar member={warriorMockMember} avatarOnly={true} withBackground={true} />
    );
    expect(container.firstChild).toHaveClass('background_blue');
  });

  it('applies custom sprites margin', () => {
    const customMargin = '10px 20px 30px 40px';
    const { container } = render(
      <HabiticaAvatar member={warriorMockMember} spritesMargin={customMargin} />
    );
    const spritesContainer = container.querySelector('.character-sprites') as HTMLElement;
    expect(spritesContainer).toHaveStyle(`margin: ${customMargin}`);
  });

  it('does not render when member.preferences is null', () => {
    const memberWithoutPreferences = { ...warriorMockMember, preferences: null as never };
    const { container } = render(<HabiticaAvatar member={memberWithoutPreferences} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows pet when currentPet is set and not avatar only', () => {
    const { container } = render(<HabiticaAvatar member={warriorMockMember} />);
    expect(container.querySelector('.Pet-Wolf-Base')).toBeInTheDocument();
  });

  it('shows mount when currentMount is set and not avatar only', () => {
    const memberWithMount = {
      ...warriorMockMember,
      items: { ...warriorMockMember.items, currentMount: 'Dragon-Red' },
    };
    const { container } = render(<HabiticaAvatar member={memberWithMount} />);
    expect(container.querySelector('.Mount_Body_Dragon-Red')).toBeInTheDocument();
    expect(container.querySelector('.Mount_Head_Dragon-Red')).toBeInTheDocument();
  });

  it('applies kangaroo offset for kangaroo mounts', () => {
    const memberWithKangaroo = {
      ...warriorMockMember,
      items: { ...warriorMockMember.items, currentMount: 'Kangaroo-Base' },
    };
    const { container } = render(<HabiticaAvatar member={memberWithKangaroo} />);
    expect(container.querySelector('.offset-kangaroo')).toBeInTheDocument();
  });
});
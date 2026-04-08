import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';
import foolPet, { getAprilFoolsPrank } from './foolPet';
import type { CurrentEventList } from '../types/CurrentEventList';

// ---------------------------------------------------------------------------
// foolPet
// ---------------------------------------------------------------------------

describe('foolPet', () => {
  const PRANK = 'Pranked';

  it('returns TigerCub prank when pet is null', () => {
    expect(foolPet(null, PRANK)).toBe('Pet-TigerCub-Pranked');
  });

  it('returns TigerCub prank when pet is undefined', () => {
    expect(foolPet(undefined, PRANK)).toBe('Pet-TigerCub-Pranked');
  });

  it('returns TigerCub prank when pet is an empty string', () => {
    expect(foolPet('', PRANK)).toBe('Pet-TigerCub-Pranked');
  });

  it('returns Dragon prank for a SPECIAL_PET', () => {
    expect(foolPet('Wolf-Veteran', PRANK)).toBe('Pet-Dragon-Pranked');
  });

  it('returns Dragon prank for another SPECIAL_PET (Orca-Base)', () => {
    expect(foolPet('Orca-Base', PRANK)).toBe('Pet-Dragon-Pranked');
  });

  it('returns species prank for a BASE_PET species (BearCub-White)', () => {
    expect(foolPet('BearCub-White', PRANK)).toBe('Pet-BearCub-Pranked');
  });

  it('returns species prank for another BASE_PET (Wolf-Desert)', () => {
    expect(foolPet('Wolf-Desert', PRANK)).toBe('Pet-Wolf-Pranked');
  });

  it('returns species prank for a pet with no dash (bare BASE_PET name)', () => {
    expect(foolPet('Dragon', PRANK)).toBe('Pet-Dragon-Pranked');
  });

  it('returns BearCub prank for an unknown species', () => {
    expect(foolPet('Unicorn-Golden', PRANK)).toBe('Pet-BearCub-Pranked');
  });

  it('returns BearCub prank for an unknown species with no dash', () => {
    expect(foolPet('Unicorn', PRANK)).toBe('Pet-BearCub-Pranked');
  });
});

// ---------------------------------------------------------------------------
// getAprilFoolsPrank
// ---------------------------------------------------------------------------

describe('getAprilFoolsPrank', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const makeEvent = (start: string, end: string, aprilFools = 'Squirrel'): CurrentEventList => [
    { start, end, aprilFools },
  ];

  it('returns the prank string when the current date is within the event range', () => {
    vi.setSystemTime(new Date('2026-04-01T12:00:00Z'));
    const events = makeEvent('2026-04-01', '2026-04-02');
    expect(getAprilFoolsPrank(events)).toBe('Squirrel');
  });

  it('returns null when the current date is before the event', () => {
    vi.setSystemTime(new Date('2026-03-30T12:00:00Z'));
    const events = makeEvent('2026-04-01', '2026-04-02');
    expect(getAprilFoolsPrank(events)).toBeNull();
  });

  it('returns null when the current date is after the event', () => {
    vi.setSystemTime(new Date('2026-04-03T00:00:00Z'));
    const events = makeEvent('2026-04-01', '2026-04-02');
    expect(getAprilFoolsPrank(events)).toBeNull();
  });

  it('returns null for an empty event list', () => {
    vi.setSystemTime(new Date('2026-04-01T12:00:00Z'));
    expect(getAprilFoolsPrank([])).toBeNull();
  });

  it('returns null when no event has aprilFools set', () => {
    vi.setSystemTime(new Date('2026-04-01T12:00:00Z'));
    const events: CurrentEventList = [{ start: '2026-04-01', end: '2026-04-02', aprilFools: '' }];
    expect(getAprilFoolsPrank(events)).toBeNull();
  });

  it('returns the matching prank when multiple events exist', () => {
    vi.setSystemTime(new Date('2026-04-01T12:00:00Z'));
    const events: CurrentEventList = [
      { start: '2026-01-01', end: '2026-01-31', aprilFools: 'OtherPrank' },
      { start: '2026-04-01', end: '2026-04-02', aprilFools: 'Squirrel' },
    ];
    expect(getAprilFoolsPrank(events)).toBe('Squirrel');
  });
});

// ---------------------------------------------------------------------------
// Real 2026 April Fools event (prank: 'Alien')
// window: 2026-04-01T08:00:00Z – 2026-04-02T07:59:00Z
// ---------------------------------------------------------------------------

const REAL_2026_EVENT: CurrentEventList = [
  { start: '2026-04-01T08:00:00.000Z', end: '2026-04-02T07:59:00.000Z', aprilFools: 'Alien' },
];

describe('getAprilFoolsPrank – real 2026 event', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns Alien during the event window', () => {
    vi.setSystemTime(new Date('2026-04-01T12:00:00.000Z'));
    expect(getAprilFoolsPrank(REAL_2026_EVENT)).toBe('Alien');
  });

  it('returns null before the event starts (before 08:00 UTC)', () => {
    vi.setSystemTime(new Date('2026-04-01T06:00:00.000Z'));
    expect(getAprilFoolsPrank(REAL_2026_EVENT)).toBeNull();
  });

  it('returns null after the event ends (after 07:59 UTC next day)', () => {
    vi.setSystemTime(new Date('2026-04-02T12:00:00.000Z'));
    expect(getAprilFoolsPrank(REAL_2026_EVENT)).toBeNull();
  });
});

describe('foolPet – real 2026 Alien prank', () => {
  const PRANK = 'Alien';

  it('no pet → Pet-TigerCub-Alien', () => {
    expect(foolPet(null, PRANK)).toBe('Pet-TigerCub-Alien');
  });

  it('special pet Wolf-Veteran → Pet-Dragon-Alien', () => {
    expect(foolPet('Wolf-Veteran', PRANK)).toBe('Pet-Dragon-Alien');
  });

  it('special pet Orca-Base → Pet-Dragon-Alien', () => {
    expect(foolPet('Orca-Base', PRANK)).toBe('Pet-Dragon-Alien');
  });

  it('base pet Wolf-Desert → Pet-Wolf-Alien', () => {
    expect(foolPet('Wolf-Desert', PRANK)).toBe('Pet-Wolf-Alien');
  });

  it('base pet BearCub-White → Pet-BearCub-Alien', () => {
    expect(foolPet('BearCub-White', PRANK)).toBe('Pet-BearCub-Alien');
  });

  it('base pet Dragon-Base → Pet-Dragon-Alien', () => {
    expect(foolPet('Dragon-Base', PRANK)).toBe('Pet-Dragon-Alien');
  });

  it('non-base pet Unicorn-Golden → Pet-BearCub-Alien', () => {
    expect(foolPet('Unicorn-Golden', PRANK)).toBe('Pet-BearCub-Alien');
  });
});

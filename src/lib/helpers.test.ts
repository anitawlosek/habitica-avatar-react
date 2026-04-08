import { describe, it, expect } from 'vitest';
import { isDefined, createClassName, getNestedProperty } from './helpers';

describe('isDefined', () => {
  it('returns true for a string', () => {
    expect(isDefined('hello')).toBe(true);
  });

  it('returns true for 0', () => {
    expect(isDefined(0)).toBe(true);
  });

  it('returns true for false', () => {
    expect(isDefined(false)).toBe(true);
  });

  it('returns true for an empty string', () => {
    expect(isDefined('')).toBe(true);
  });

  it('returns false for null', () => {
    expect(isDefined(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });
});

describe('createClassName', () => {
  it('joins multiple class names with a space', () => {
    expect(createClassName('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('returns a single class name as-is', () => {
    expect(createClassName('foo')).toBe('foo');
  });

  it('returns empty string when given no arguments', () => {
    expect(createClassName()).toBe('');
  });

  it('filters out undefined values', () => {
    expect(createClassName('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('filters out false values', () => {
    expect(createClassName('foo', false, 'bar')).toBe('foo bar');
  });

  it('filters out empty strings', () => {
    expect(createClassName('foo', '', 'bar')).toBe('foo bar');
  });

  it('returns empty string when all values are falsy', () => {
    expect(createClassName(undefined, false, '')).toBe('');
  });
});

describe('getNestedProperty', () => {
  const obj = {
    a: {
      b: {
        c: 42,
      },
    },
    x: 'hello',
  };

  it('returns a top-level property', () => {
    expect(getNestedProperty(obj, 'x')).toBe('hello');
  });

  it('returns a deeply nested property', () => {
    expect(getNestedProperty(obj, 'a.b.c')).toBe(42);
  });

  it('returns undefined for a missing key', () => {
    expect(getNestedProperty(obj, 'a.z')).toBeUndefined();
  });

  it('returns undefined when traversing through a missing intermediate key', () => {
    expect(getNestedProperty(obj, 'a.b.c.d')).toBeUndefined();
  });

  it('returns undefined for a path on an empty object', () => {
    expect(getNestedProperty({}, 'a.b')).toBeUndefined();
  });
});

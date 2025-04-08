import { pathMatcher } from '../path-matcher';

describe('All cases match', () => {
  const cases = [
    ['/client/*', 'specialist/', false],
    ['/client/*', '/client/path', true],
    ['/client/*', '/client', false],
    ['/client/*', 'client/topics', false],
    ['/client/', '/client', false],
    ['/client', '/client', true],
    ['/client', 'specialist/client', false],
    ['*/client', 'specialist/client', true],
    ['/client/*', '/specialist/client', false],
    ['/specialist/*', '/client/specialist/specialist', false],
    ['/specialist/*', '/specialist/profile-edit', true],
    ['/specialist/*', '/specialist/calendar/edit', true],
    ['/client/profile/*', '/client/profile/settings', true],
  ];

  cases.forEach(([pattern, pathName, expectedResult]) => {
    test(`${pattern} ${pathName} will be ${expectedResult}`, () => {
      expect(pathMatcher(pattern as string, pathName as string)).toBe(
        expectedResult as boolean
      );
    });
  });
});

// test if pattern match pathname:
// pathMatcher('/client/*', 'specialist/') -> false
// pathMatcher('/client/*', '/client/path') -> true
// pathMatcher('/client/*', 'client/path') -> true
// pathMatcher('/client/*', '/client') -> false
// pathMatcher('/client/', '/client') -> true
// pathMatcher('/client', '/client') -> true
// pathMatcher('/client/*', '/specialist/client') -> false
// pathMatcher('/specialist/*', '/client/specialist/specialist') -> false
// pathMatcher('/specialist/*', '/client/specialist/specialist') -> false
// pathMatcher('/specialist/*', '/specialist/profile-edit') -> true
// pathMatcher('/specialist/*', '/specialist/calendar/edit') -> true
export const pathMatcher = (pattern: string, pathname: string) => {
  const patternParts = pattern.split('/');
  const pathParts = pathname.split('/');

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart === '*') {
      // '*' matches any part, so move to the next pattern part
      continue;
    }

    if (patternPart !== pathPart && !patternPart.endsWith('*')) {
      // If parts are not equal and pattern part is not a wildcard, paths do not match
      return false;
    }

    if (patternPart === '*' && i === patternParts.length - 1) {
      // If the last pattern part is '*', it matches the rest of the path
      return true;
    }

    if (patternPart.endsWith('*') && i === patternParts.length - 1) {
      // If the last pattern part is a wildcard, and it matches the rest of the path
      return pathPart.startsWith(patternPart.slice(0, -1));
    }
  }

  // Check if the number of parts is the same for both pattern and path
  return patternParts.length <= pathParts.length;
};

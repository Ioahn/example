import { NextRequest, NextResponse } from 'next/server';
import { pathMatcher } from '@shared/utils/path-matcher';

enum TAccountType {
  ESpecialist = 'specialist',
  EClient = 'client',
}

const MAIN_DOMAIN = 'sense-a.ru';

export function middleware(request: NextRequest) {
  const isAuth = Boolean(request.cookies.get('auth')?.value);

  const authGuardedPath = [
    '/client/profile-edit',
    '/client/profile',
    '/client/profile/*',
    '/specialist/*',
    '/specialist',
    '/video-call/*',
  ];
  if (
    authGuardedPath.some((path) =>
      pathMatcher(path, request.nextUrl.pathname)
    ) &&
    !isAuth
  ) {
    return NextResponse.redirect(
      new URL(
        `/auth?account=${TAccountType.EClient}&callbackUrl=${request.nextUrl.pathname}`,
        request.url
      )
    );
  }

  if (request.nextUrl.pathname === '/robots.txt') {
    return handleRobotsTxt(request);
  }

  // Логика для редиректов на основе типа аккаунта
  if (
    pathMatcher('/specialist/*', request.nextUrl.pathname) ||
    pathMatcher('/specialist', request.nextUrl.pathname)
  ) {
    return OnSpecialistRoute(request);
  }

  if (pathMatcher('/client/*', request.nextUrl.pathname)) {
    return OnClientRoute(request);
  }

  if (
    pathMatcher('/', request.nextUrl.pathname) ||
    pathMatcher('/auth', request.nextUrl.pathname) ||
    pathMatcher('/landing/*', request.nextUrl.pathname)
  ) {
    return OnAuthRoute(request);
  }

  return NextResponse.next();
}

const handleRobotsTxt = (request: NextRequest) => {
  const hostname = request.headers.get('x-forwarded-host');
  const isCdn = request.headers.get('x-cdn-node-addr') !== null;

  // Если запрос идет с основного домена, отдаем robots-enabled.txt
  if (hostname === MAIN_DOMAIN && !isCdn) {
    return NextResponse.rewrite(new URL('/robots-enabled.txt', request.url));
  }

  // Для всех остальных доменов отдаем robots-disabled.txt
  return NextResponse.rewrite(new URL('/robots-disabled.txt', request.url));
};

const OnSpecialistRoute = (request: NextRequest) => {
  const account_type = request.cookies.get('account') as unknown as {
    value: TAccountType;
  };

  if (account_type?.value === TAccountType.EClient) {
    return NextResponse.redirect(
      new URL('/client/search-specialist', request.url)
    );
  }

  return NextResponse.next();
};

const OnClientRoute = (request: NextRequest) => {
  const account_type = request.cookies.get('account') as unknown as {
    value: TAccountType;
  };

  if (account_type?.value === TAccountType.ESpecialist) {
    return NextResponse.redirect(new URL('/specialist/calendar', request.url));
  }

  return NextResponse.next();
};

const OnAuthRoute = (request: NextRequest) => {
  const account_type = request.cookies.get('account') as unknown as {
    value: TAccountType;
  };

  if (account_type?.value === TAccountType.ESpecialist) {
    return NextResponse.redirect(new URL('/specialist/calendar', request.url));
  }

  if (account_type?.value === TAccountType.EClient) {
    return NextResponse.redirect(new URL('/client/profile', request.url));
  }

  return NextResponse.next();
};

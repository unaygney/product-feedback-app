/**
 * This function checks if the requested page is an auth page
 * @param pathname
 * @returns
 */

export const isRequestedAuthPage = (pathname: string) => {
  const authPages = ['/auth']
  return authPages.some((page) => pathname.startsWith(page))
}

/**
 * This function checks if the requested page is a secured page
 * @param pathname
 * @returns
 */

export const securedPages = (pathname: string) => {
  const securedPaths = ['/dashboard', '/profile', '/settings', '/secret']
  return securedPaths.some((page) => pathname.startsWith(page))
}

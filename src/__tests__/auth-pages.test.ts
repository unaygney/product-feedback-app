import { isRequestedAuthPage, securedPages } from '@/lib/auth-pages'

describe('isRequestedAuthPage', () => {
  test('should return true for auth page', () => {
    expect(isRequestedAuthPage('/auth')).toBe(true)
  })

  test('should return false for other pages', () => {
    expect(isRequestedAuthPage('/home')).toBe(false)
    expect(isRequestedAuthPage('/dashboard')).toBe(false)
    expect(isRequestedAuthPage('/profile')).toBe(false)
    expect(isRequestedAuthPage('/')).toBe(false)
  })
})

describe('securedPages', () => {
  test('should return true for secured pages', () => {
    expect(securedPages('/dashboard')).toBe(true)
    expect(securedPages('/profile')).toBe(true)
    expect(securedPages('/settings')).toBe(true)
    expect(securedPages('/secret')).toBe(true)
  })

  test('should return false for other pages', () => {
    expect(securedPages('/home')).toBe(false)
    expect(securedPages('/auth')).toBe(false)
    expect(securedPages('/')).toBe(false)
  })
})

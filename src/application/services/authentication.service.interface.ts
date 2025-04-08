export interface IAuthenticationService {
  loginAnonymously(input: { captchaToken: string }): Promise<void>

  loginWithPassword(input: {
    email: string
    password: string
    captchaToken: string
  }): Promise<void>

  register(input: {
    email: string
    password: string
    captchaToken: string
  }): Promise<void>

  logout(): Promise<void>
}

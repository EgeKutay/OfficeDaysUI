import JwtService from './jwtService'

export default function useJwt() {
  const jwt = new JwtService()

  return {
    jwt,
  }
}

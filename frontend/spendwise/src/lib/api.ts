export function api(path: string, init?: RequestInit){
  const baseUrl = "http://localhost:8000/"
  const url = new URL(path, baseUrl)
  return fetch(url, init)
}
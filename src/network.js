const url="https://socket.wex.services/"
const myHeaders = new Headers();

myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "e2af625aff3bf484d68aa95c5784927b5e287d684d10f");

export function buildRequest(uri, method, body) {
  return new Request(`${url}${uri}`, {
    method: method,
    body: JSON.stringify(body),
    headers: myHeaders,
    redirect: 'follow'
  })
}

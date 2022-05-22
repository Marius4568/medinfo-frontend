export default async function postAsync(url, body, needAuth) {
  let headers;
  if (needAuth) {
    headers = {
      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      'Content-type': 'application/json',
    };
  } else {
    headers = {
      'Content-type': 'application/json',
    };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}

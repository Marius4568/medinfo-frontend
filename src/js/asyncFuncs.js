export default async function fetchFunction(
  url,
  reqBody,
  requestType,
  needAuth,
) {
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
  // Optional fetch request body
  const fetchBody = {
    method: requestType,
    headers,
  };

  if (reqBody) fetchBody.body = JSON.stringify(reqBody);

  try {
    const res = await fetch(url, fetchBody);

    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
}

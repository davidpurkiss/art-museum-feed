export const getQueryParamsString = (obj: Record<string, any>) => {
  if (!obj) {
    throw new Error('Cannot convert undefined object to query param string.');
  }

  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
};

export default getQueryParamsString;

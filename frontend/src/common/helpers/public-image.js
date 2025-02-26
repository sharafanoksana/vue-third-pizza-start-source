export const getPublicImage = (path) => {
  const pablicUrl = "/api";
  const divider = path.startsWith("/") ? "" : "/";
  return [pablicUrl, path].join(divider);
};

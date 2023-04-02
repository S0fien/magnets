function isMagnet(link: string): boolean {
  const magnetRegex = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i;
  return magnetRegex.test(link);
}

export default isMagnet;

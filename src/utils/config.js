
export const isProd = Object.is(process.env.NODE_ENV, 'production');

export const baseAPIUrl = isProd ? 'http://www.yyandii.com/api' : '/api';

export function getIsMobile() {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
}

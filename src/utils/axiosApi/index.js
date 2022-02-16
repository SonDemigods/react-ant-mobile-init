import HttpRequest from './core';

import config from '../../config';

// eslint-disable-next-line
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

export default new HttpRequest(baseUrl);

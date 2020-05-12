const BASE_URL = 'http://localhost:3001/api';

const ROOMS_URL = `${BASE_URL}/room`;

const EVENTS_URL = `${BASE_URL}/event/filter`;
const EVENT_URL = `${BASE_URL}/event/`;
const GET_COMMENTS_URL = `${BASE_URL}/comment`;

const NO_AVATAR_PATH = process.env.PUBLIC_URL + '/imgs/no-avatar.png';

const LOGIN_URL = `${BASE_URL}/signin`;
const SIGNUP_URL = `${BASE_URL}/signup`;
const PROFILE_URL = `${BASE_URL}/profile`;

const CATEGORY_URL = `${BASE_URL}/category`;

export {
  BASE_URL,
  ROOMS_URL,
  EVENTS_URL,
  EVENT_URL,
  GET_COMMENTS_URL,
  NO_AVATAR_PATH,
  LOGIN_URL,
  SIGNUP_URL,
  PROFILE_URL,
  CATEGORY_URL,
};

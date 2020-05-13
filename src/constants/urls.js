const BASE_URL = 'http://localhost:3001/api';

const ROOMS_URL = `${BASE_URL}/room`;

const GET_EVENTS_URL = `${BASE_URL}/event/filter`;
const GET_EVENT_URL = `${BASE_URL}/event/`;
const GET_COMMENTS_URL = `${BASE_URL}/comment`;

const NO_AVATAR_PATH = process.env.PUBLIC_URL + '/imgs/no-avatar.png';

const LOGIN_URL = `${BASE_URL}/signin`;
const SIGNUP_URL = `${BASE_URL}/signup`;
const PROFILE_URL = `${BASE_URL}/profile`;
const PROFILE_UPDATE_URL = `${BASE_URL}/profile/update`;

export {
  BASE_URL,
  ROOMS_URL,
  GET_EVENTS_URL,
  GET_EVENT_URL,
  GET_COMMENTS_URL,
  NO_AVATAR_PATH,
  LOGIN_URL,
  SIGNUP_URL,
  PROFILE_URL,
  PROFILE_UPDATE_URL
};

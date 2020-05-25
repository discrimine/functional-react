const BASE_URL = 'http://localhost:3001/api';

const ROOMS_URL = `${BASE_URL}/room`;

const EVENTS_URL = `${BASE_URL}/event/filter`;
const EVENT_URL = `${BASE_URL}/event/`;
const COMMENTS_URL = `${BASE_URL}/comment`;

const IMAGES_PATH = process.env.PUBLIC_URL + '/imgs/';
const NO_AVATAR_PATH = IMAGES_PATH + 'no-avatar.png';

const LOGIN_URL = `${BASE_URL}/signin`;
const SIGNUP_URL = `${BASE_URL}/signup`;
const PROFILE_URL = `${BASE_URL}/profile`;
const PROFILE_UPDATE_URL = `${BASE_URL}/profile/update`;

const CATEGORY_URL = `${BASE_URL}/category`;

const JOIN_EVENT_URL = `${BASE_URL}/member/event/join`;
const JOIN_ROOM_URL = `${BASE_URL}/member/room/join`;
const LEAVE_EVENT_URL = `${BASE_URL}/member/event/`;
const LEAVE_ROOM_URL = `${BASE_URL}/member/room/`;

export {
  BASE_URL,
  ROOMS_URL,
  EVENTS_URL,
  EVENT_URL,
  COMMENTS_URL,
  IMAGES_PATH,
  NO_AVATAR_PATH,
  LOGIN_URL,
  SIGNUP_URL,
  PROFILE_URL,
  CATEGORY_URL,
  PROFILE_UPDATE_URL,
  JOIN_EVENT_URL,
  JOIN_ROOM_URL,
  LEAVE_EVENT_URL,
  LEAVE_ROOM_URL,
};

export default function defaultOptionsAuth () {
  let authToken = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : '';
  return {
    headers: {
      'Authorization': authToken,
    },
  };
}

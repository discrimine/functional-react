export default function defaultOptionsAuth () {
  const authToken = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : '';
  return {
    headers: {
      'Authorization': authToken,
      'Content-Type': 'application/json',
    },
  };
}

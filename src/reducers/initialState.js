export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  rooms: {
    list: [],
    current: null,
    active_users: [],
  },
  messages: [],
  ajaxCallsInProgress: 0
};

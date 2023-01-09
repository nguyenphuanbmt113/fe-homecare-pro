import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo,
});
export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
export const userLoginFail = (userInfor) => ({
  type: actionTypes.USER_LOGIN_FAIL,
  userInfor,
});
import {
  getAllcodesBytype,
  createNewUser,
  handleGetAllUser,
  updateUser,
  getTopDoctorHome,
  getAllDoctor,
  saveInfoDoctor,
  userParameter,
  doctorParameter,
} from "../../services/userService";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
//getAllcodesBytype
//start //doing //end
export const fetchGenderBegin = () => ({
  type: actionTypes.FETCH_GENDER_START,
});
export const fetchGenderSuceess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});
export const fetchRoleSuceess = (genderData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: genderData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});
export const fetchPositionSuceess = (genderData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: genderData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});
//user
export const fetchCreateUserSuceess = () => ({
  type: actionTypes.FETCH_CREATE_USER_SUCCESS,
});
export const fetchCreateUserFail = () => ({
  type: actionTypes.FETCH_CREATE_USER_FAIL,
});

//actions gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    dispatch(fetchGenderBegin());
    try {
      let res = await getAllcodesBytype("gender");
      if (res?.data.EC === 0) {
        dispatch(fetchGenderSuceess(res?.data?.DT));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log(">>checek err:", error);
    }
  };
};
//role actions
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesBytype("role");
      if (res?.data.EC === 0) {
        dispatch(fetchRoleSuceess(res?.data?.DT));
      } else {
        fetchGenderFail();
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log(">>checek err:", error);
    }
  };
};
//position actions
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesBytype("position");

      if (res?.data.EC === 0) {
        dispatch(fetchPositionSuceess(res?.data?.DT));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log(">>checek err:", error);
    }
  };
};
//user create action
export const fetchCreateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewUser(data);
      if (res?.data?.EC === 0) {
        toast.success(res?.data?.EM);
        dispatch(fetchCreateUserSuceess());
        dispatch(fetchAllUser());
      } else {
        dispatch(fetchCreateUserFail());
      }
    } catch (error) {
      console.log(">>check erroe:", error);
    }
  };
};

//getAlluser
export const fetchAllUserSuceess = (data) => ({
  type: actionTypes.FETCH_ALLUSER_SUCCESS,
  data: data,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALLUSER_FAIL,
});
export const fetchAllUser = () => {
  return async (dispatch, getState) => {
    try {
      const res = await handleGetAllUser();
      if (res?.data?.EC === 0) {
        let users = res.data?.DT.reverse();
        dispatch(fetchAllUserSuceess(users));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (error) {
      console.log(">>check erroe:", error);
    }
  };
};
//update action
export const fetchUpdateUserSuceess = () => ({
  type: actionTypes.FETCH_UPDATEUSER_SUCCESS,
});
export const fetchUpdateUserFail = () => ({
  type: actionTypes.FETCH_UPDATEUSER_FAIL,
});
export const fetchUpdateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await updateUser(data);
      if (res?.data?.EC === 0) {
        toast.success(res?.data?.EM);
        dispatch(fetchUpdateUserSuceess());
        dispatch(fetchAllUser());
      } else {
        dispatch(fetchUpdateUserFail());
      }
    } catch (error) {
      console.log(">>check erroe:", error);
    }
  };
};

//getdoctorhhome
export const fetTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOPDOCTOR_SUCCESS,
  data,
});
export const fetTopDoctorFail = () => ({
  type: actionTypes.FETCH_TOPDOCTOR_FAIL,
});
export const fetchTopDoctorHome = (limit) => {
  return async (dispatch, getState) => {
    try {
      const res = await getTopDoctorHome(limit);
      console.log("res", res);
      if (res?.data?.EC === 0) {
        dispatch(fetTopDoctorSuccess(res?.data?.DT));
      } else {
        dispatch(fetTopDoctorFail());
      }
    } catch (error) {
      console.log(">>check erroe:", error);
    }
  };
};

//getALLdoctor
export const fetAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALLDOCTOR_SUCCESS,
  data,
});
export const fetAllDoctorFail = () => ({
  type: actionTypes.FETCH_TOPDOCTOR_FAIL,
});
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllDoctor();

      if (res?.data?.EC === 0) {
        dispatch(fetAllDoctorSuccess(res?.data?.DT));
      } else {
        dispatch(fetAllDoctorFail());
      }
    } catch (error) {
      console.log(">>check erroe:", error);
    }
  };
};

//postInfodoctor
export const fetInfoDoctorSuccess = () => ({
  type: actionTypes.FETCH_INFODOCTOR_SUCCESS,
});
export const fetInfoDoctorFail = () => ({
  type: actionTypes.FETCH_INFODOCTOR_FAIL,
});
export const fetchInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await saveInfoDoctor(data);
      if (res?.data?.EC === 0) {
        toast.success(res?.data?.EM);
        dispatch(fetInfoDoctorSuccess());
      } else {
        toast.error(res?.data?.EM);
        dispatch(fetInfoDoctorFail());
      }
    } catch (error) {
      toast.error("Error Something!");
      console.log(">>check erroe:", error);
    }
  };
};

//GET TIME DOCTOR
export const fetTimeDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TIMEDOCTOR_SUCCESS,
  data,
});
export const fetTimeDoctorFail = () => ({
  type: actionTypes.FETCH_TIMEDOCTOR_FAIL,
});
export const fetchTimeDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesBytype("time");
      if (res?.data?.EC === 0) {
        dispatch(fetTimeDoctorSuccess(res?.data?.DT));
      } else {
        dispatch(fetTimeDoctorFail());
      }
    } catch (error) {
      console.log(">>check erroe:", error);
    }
  };
};

//price
export const fetchPriceSuceess = (data) => ({
  type: actionTypes.FETCH_PRICEDOCTOR_SUCCESS,
  data,
});
export const fetchPriceFail = () => ({
  type: actionTypes.FETCH_PRICEDOCTOR_FAIL,
});
export const fetchPrice = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesBytype("price");

      if (res?.data.EC === 0) {
        dispatch(fetchPriceSuceess(res?.data?.DT));
      } else {
        dispatch(fetchPriceFail());
      }
    } catch (error) {
      dispatch(fetchPriceFail());
      console.log(">>checek err:", error);
    }
  };
};

//provice
export const fetchProviceSuceess = (data) => ({
  type: actionTypes.FETCH_PROVICEDOCTOR_SUCCESS,
  data: data,
});
export const fetchProviceFail = () => ({
  type: actionTypes.FETCH_PROVICEDOCTOR_FAIL,
});
export const fetchProvice = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesBytype("province");
      console.log("res", res);

      if (res?.data.EC === 0) {
        dispatch(fetchProviceSuceess(res?.data?.DT));
      } else {
        dispatch(fetchProviceFail());
      }
    } catch (error) {
      dispatch(fetchProviceFail());
      console.log(">>checek err:", error);
    }
  };
};

//payment
export const fetchPaymentSuceess = (data) => ({
  type: actionTypes.FETCH_PAYMENTDOCTOR_SUCCESS,
  data,
});
export const fetchPaymentFail = () => ({
  type: actionTypes.FETCH_PAYMENTDOCTOR_FAIL,
});
export const fetchPayment = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesBytype("payment");
      if (res?.data.EC === 0) {
        dispatch(fetchPaymentSuceess(res?.data?.DT));
      } else {
        dispatch(fetchPaymentFail());
      }
    } catch (error) {
      dispatch(fetchPaymentFail());
      console.log(">>checek err:", error);
    }
  };
};

//loading
export const fetchLoading = (flag) => ({
  type: actionTypes.FETCH_LOADING,
  flag,
});

//user-parameter
export const fetchUserParameterSucess = (data) => ({
  type: actionTypes.FETCH_USER_PARAREMER_SUCCESS,
  data,
});
export const fetchUserParameterFail = (data) => ({
  type: actionTypes.FETCH_USER_PARAREMER_FAIL,
  data,
});
export const fetchUserParameter = (query) => {
  return async (dispatch, getState) => {
    try {
      let res = await userParameter(query);
      if (res?.data.EC === 0) {
        dispatch(fetchUserParameterSucess(res?.data?.DT));
      } else {
        dispatch(fetchUserParameterFail());
      }
    } catch (error) {
      dispatch(fetchPaymentFail());
      console.log(">>checek err:", error);
    }
  };
};

//doctor-parameter
export const fetchDoctorParameterSucess = (data) => ({
  type: actionTypes.FETCH_DOCTOR_PARAREMER_SUCCESS,
  data,
});
export const fetchDoctorParameterFail = (data) => ({
  type: actionTypes.FETCH_DOCTOR_PARAREMER_FAIL,
  data,
});
export const fetchDoctorParameter = (query) => {
  return async (dispatch, getState) => {
    try {
      let res = await doctorParameter(query);
      console.log("res doctor", res);
      if (res?.data.EC === 0) {
        dispatch(fetchDoctorParameterSucess(res?.data?.DT));
      } else {
        dispatch(fetchDoctorParameterFail());
      }
    } catch (error) {
      dispatch(fetchPaymentFail());
      console.log(">>checek err:", error);
    }
  };
};

import actionTypes from "../actions/actionTypes";

const initialState = {
  genderData: [],
  positionData: [],
  roleData: [],
  usersData: [],
  totalPage: 0,
  usersDataPara: [],
  doctorsDataPara: [],
  totalPageDoctors: 0,
  isLoadingGender: false,
  idLoadingSave: false,
  topDoctor: [],
  allDoctor: [],
  isCorrectSaveInfo: false,
  scheduleDoctor: [],

  //INFO DOCTOR
  arrPrice: [],
  arrPayment: [],
  arrProvice: [],
  //isloadinh
  isLoadingRedux: true,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genderData = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genderData = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roleData = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.roleData = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positionData = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.roleData = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLUSER_SUCCESS:
      state.usersData = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLUSER_FAIL:
      state.usersData = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOPDOCTOR_SUCCESS:
      return {
        ...state,
        topDoctor: action.data,
      };
    case actionTypes.FETCH_TOPDOCTOR_FAIL:
      return {
        topDoctor: [],
        ...state,
      };
    case actionTypes.FETCH_ALLDOCTOR_SUCCESS:
      return {
        ...state,
        allDoctor: action.data,
      };
    case actionTypes.FETCH_ALLDOCTOR_FAIL:
      return {
        ...state,
        allDoctor: [],
      };
    case actionTypes.FETCH_INFODOCTOR_SUCCESS:
      return {
        ...state,
        isCorrectSaveInfo: true,
      };
    case actionTypes.FETCH_INFODOCTOR_FAIL:
      return {
        ...state,
        isCorrectSaveInfo: false,
      };
    case actionTypes.FETCH_TIMEDOCTOR_SUCCESS:
      return {
        ...state,
        scheduleDoctor: action.data,
      };
    case actionTypes.FETCH_TIMEDOCTOR_FAIL:
      return {
        ...state,
        scheduleDoctor: [],
      };
    case actionTypes.FETCH_PRICEDOCTOR_SUCCESS:
      return {
        ...state,
        arrPrice: action.data,
      };
    case actionTypes.FETCH_PRICEDOCTOR_FAIL:
      return {
        ...state,
        arrPrice: [],
      };
    case actionTypes.FETCH_PAYMENTDOCTOR_SUCCESS:
      return {
        ...state,
        arrPayment: action.data,
      };
    case actionTypes.FETCH_PAYMENTDOCTOR_FAIL:
      return {
        ...state,
        arrPayment: [],
      };
    case actionTypes.FETCH_PROVICEDOCTOR_SUCCESS:
      return {
        ...state,
        arrProvice: action.data,
      };
    case actionTypes.FETCH_PROVICEDOCTOR_FAIL:
      return {
        ...state,
        arrProvice: [],
      };
    case actionTypes.FETCH_LOADING:
      return {
        ...state,
        isLoadingRedux: action.flag,
      };
    case actionTypes.FETCH_USER_PARAREMER_SUCCESS:
      console.log("ac", action);
      return {
        ...state,
        usersDataPara: action.data.rows,
        totalPage: action.data.count,
      };
    case actionTypes.FETCH_USER_PARAREMER_FAIL:
      return {
        ...state,
        usersDataPara: [],
      };
    case actionTypes.FETCH_DOCTOR_PARAREMER_SUCCESS:
      console.log(">>>>>>>>>>>>>>>", action);
      return {
        ...state,
        doctorsDataPara: action.data.rows,
        totalPageDoctors: action.data.count,
      };
    case actionTypes.FETCH_DOCTOR_PARAREMER_FAIL:
      return {
        ...state,
        doctorsDataPara: [],
      };

    default:
      return state;
  }
};

export default adminReducer;

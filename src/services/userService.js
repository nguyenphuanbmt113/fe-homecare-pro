import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("api/v1/login", {
    email,
    password,
  });
};
const handleGetAllUser = () => {
  return axios.get("api/v1/user/all");
};
const createNewUser = (data) => {
  return axios.post("api/v1/user/create", {
    ...data,
  });
};
const deleteUser = (id) => {
  return axios.delete("api/v1/user/delete", { data: { id: id } });
};
const updateUser = (data) => {
  return axios.put("api/v1/user/update", { data });
};
const getAllcodesBytype = (type) => {
  return axios.get(`api/v1/allcodes?type=${type}`);
};
const getTopDoctorHome = (limit) => {
  return axios.get(`api/v1/top-doctor-home?limit=${limit}`);
};
const getAllDoctor = () => {
  return axios.get(`api/v1/doctor-all`);
};
const saveInfoDoctor = (data) => {
  return axios.post(`api/v1/create-info-doctor`, data);
};
const geteDetailInfoDoctor = (id) => {
  return axios.get(`api/v1/get-detail-doctor-by-id?id=${id}`);
};
const getSchedulebyDate = (doctorId, date) => {
  return axios.get(
    `api/v1/schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const saveBulkDoctor = (data) => {
  return axios.post(`api/v1/bulk-create-schedule`, { data });
};
const getDoctorExtraInforById = (doctorId) => {
  return axios.get(`api/v1/get-extra-infor-doctor-id?id=${doctorId}`);
};
const getProfileDoctorInforById = (doctorId) => {
  return axios.get(`api/v1/get-profile-doctor-id?id=${doctorId}`);
};
const postBookingPatient = (data) => {
  return axios.post(`api/v1/patient-book-appointment`, data);
};
const postVerifyEmail = (data) => {
  return axios.post(`api/v1/verify-book-appointment`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`api/v1/create-new-specialty`, data);
};
const createNewClinic = (data) => {
  return axios.post(`api/v1/create-new-clinic`, data);
};
const getSpecialty = () => {
  return axios.get(`api/v1/specialty`);
};
const getAllClinic = () => {
  return axios.get(`api/v1/all-clinic`);
};
const getSpecialtyByQuery = (id, location) => {
  return axios.get(
    `api/v1/get-detail-specialty-by-id?id=${id}&location=${location}`
  );
};
const getClinicByQuery = (id) => {
  return axios.get(`api/v1/get-detail-clinic-by-id?id=${id}`);
};
const getAllPatientForDoctor = (doctorId, date) => {
  return axios.get(
    `api/v1/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post(`api/v1/send-remedy`, data);
};
const userParameter = ({ limit, page }) => {
  return axios.get(`api/v1/user-parameter?limit=${limit}&page=${page}`);
};
const doctorParameter = ({ limit, page }) => {
  return axios.get(`api/v1/doctor-parameter?limit=${limit}&page=${page}`);
};
export {
  doctorParameter,
  userParameter,
  postSendRemedy,
  getAllPatientForDoctor,
  getClinicByQuery,
  getAllClinic,
  createNewClinic,
  handleLogin,
  handleGetAllUser,
  createNewUser,
  deleteUser,
  updateUser,
  getAllcodesBytype,
  getTopDoctorHome,
  getAllDoctor,
  saveInfoDoctor,
  geteDetailInfoDoctor,
  saveBulkDoctor,
  getSchedulebyDate,
  getDoctorExtraInforById,
  postBookingPatient,
  getProfileDoctorInforById,
  postVerifyEmail,
  createNewSpecialty,
  getSpecialty,
  getSpecialtyByQuery,
};

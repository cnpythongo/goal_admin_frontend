import axios from '../axios';

export default {
  getAccountUserList(params: any) {
    return axios.get(`/account/user/list`, params);
  },
  createAccountUser(data: any) {
    return axios.post(`/account/user/create`, data);
  },
  updateAccountUser(data: any) {
    return axios.post(`/account/user/update`, data);
  },
  deleteAccountUser(ids: number[]) {
    return axios.post(`/account/user/delete`, ids);
  },
  getSystemConfigList(params: any) {
    return axios.get(`/system/config/list`, params);
  },
};

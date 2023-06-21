
import router from "../router"; 
import httpClient from "./http.service";

const authService = {
  user: null,
  async login(formData) {
    try {
      const { status, data } = await httpClient.post("user/login", formData);
      if (status === 200) {
        localStorage.setItem("ACCESS_TOKEN", data.access_token);
      }
      return {
        success: true,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        errors: e.response.data.errors,
      }
    }
  },
  async register(formData) {
    try {
      const { status, data } = await httpClient.post("user/signup", formData);
      if (status === 200) {
        localStorage.setItem("ACCESS_TOKEN", data.access_token);
      }
      return {
        success: true,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        errors: e.response.data.errors,
      }
    }
  },

  async getCurrentUser(){
    if (!this.user){
    const {status, data} = await httpClient.post('user/data');
    if (status === 200){
      this.user = data;
    }
    return this.user;
  }
},

  setUser(user) {
    this.user = user;
    localStorage.setItem("ACCESS_TOKEN", user.access_token);
  },
  isLoggedIn() {
    return !!localStorage.getItem("ACCESS_TOKEN");
  },
  getToken() {
    return localStorage.getItem("ACCESS_TOKEN");
  },
  logout() {
    localStorage.removeItem("ACCESS_TOKEN");
    router.push({ name: "login" });
  },
};

export default authService;
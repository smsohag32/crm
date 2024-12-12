import axios from "axios";

export const loginApi = async (credential) => {
   try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/login/`, credential);
      return response;
   } catch (err) {
      console.log("loging error ", err.response.data);
      throw new Error(err?.response?.data);
   }
};

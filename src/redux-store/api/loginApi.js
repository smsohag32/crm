import axios from "axios";

export const loginApi = async (credential) => {
   try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/login/`, credential);
      return response;
   } catch (err) {
      throw {
         status: err.response?.status,
         message: err.response?.data?.detail || "Unknown error occurred during login",
      };
   }
};

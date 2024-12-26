import axios from "axios";

export const loginApi = async (credential) => {
   try {
      const response = await axios.post(
         `https://crm-backend-daai.onrender.com/api/users/login/`,
         credential
      );
      return response;
   } catch (err) {
      throw {
         status: err.response?.status,
         message: err.response?.data?.detail || "Unknown error occurred during login",
      };
   }
};

import axios from "axios";

export const getProducts = async () => {
  return await axios.get(`https://62becfba0bc9b125615fd0f7.mockapi.io/api/products?page=1&limit=10`);
}

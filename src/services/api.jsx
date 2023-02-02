import axios from 'axios';
/*key: '31896058-85566f2bc64dcb55d4cd975a7',*/

const KEY = '31896058-85566f2bc64dcb55d4cd975a7';

export const Api = async (searchText, page) => {
  const url = `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&q=${searchText}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`;
  const { data } = await axios.get(url);
  return data;
};

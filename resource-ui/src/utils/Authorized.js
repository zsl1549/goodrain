import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = (username,token) => {
  Authorized = RenderAuthorized(getAuthority());
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
};

export { reloadAuthorized };
export default Authorized;

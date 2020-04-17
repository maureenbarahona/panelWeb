/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-22T18:22:10-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-22T18:38:47-06:00
 */

import { getAuthority } from './authority';
import RenderAuthorized from './../components/Authorized';

let Authorized = RenderAuthorized(getAuthority());

const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;

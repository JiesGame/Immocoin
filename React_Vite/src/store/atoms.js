import { atom } from 'jotai';
import Cookies from 'js-cookie';

const userInfoCookie = Cookies.get('userInfo') === undefined ? false : true;
const parsedID = userInfoCookie ? JSON.parse(Cookies.get('userInfo')).id : "";
const parsedEmail = userInfoCookie ? JSON.parse(Cookies.get('userInfo')).email : "";

export const userAtom = atom({
  id: parsedID,
  email: parsedEmail,
  token: Cookies.get('token') || ""
});
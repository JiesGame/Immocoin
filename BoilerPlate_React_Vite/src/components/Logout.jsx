import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Logout = () => {
  const [userInfo, setUserInfo] = useAtom(userAtom)
  const navigate = useNavigate();

  const logout = () => {
    fetch("http://127.0.0.1:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${Cookies.get('token')}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
    Cookies.remove('token');
    Cookies.remove('userInfo');
    setUserInfo({"id":"", "email":"", "token":""})
    navigate('/login');
    toast.info('Vous vous êtes déconnectés.', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  return (
    <button className="block text-center w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" onClick={logout}>Se déconnecter</button>
  )
}

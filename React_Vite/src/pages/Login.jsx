import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().required("L'email est requis."),
    password: yup.string().required(),
  });

  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useAtom(userAtom)

  const onSubmit = (data) => {
    fetch("http://127.0.0.1:3000/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "user": {
          "email": data.email,
          "password": data.password
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Cookies.set('token',response.headers.get('Authorization').split(" ")[1], { expires: 7 });
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);
      Cookies.set('userInfo', JSON.stringify({"id":data.user.id, "email":data.user.email}), { expires: 7 });
      setUserInfo({"id":data.user.id, "email":data.user.email, "token":Cookies.get('token')});
      navigate('/');
      toast.success('Vous êtes connectés.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });


  }

  return (
    <div className='flex items-center justify-center '>
      <div className="w-[26rem]">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <h1 className='text-2xl text-center mb-4'>Connexion</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Email..." {...register('email')} />
            {errors.email?.message && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password" placeholder="Mot de passe..." {...register('password')} />
            {errors.password?.message && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
          </div>
          <div className="flex justify-around mb-4">
            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Se connecter" />
          </div>
          <div>
            <p className='mb-2'>
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Créer un compte
            </Link>
            </p>
            <Link to="/forgot_password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Mot de passe oublié ?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 JiesGame. All rights reserved.
        </p>
      </div>
    </div>
  )
}

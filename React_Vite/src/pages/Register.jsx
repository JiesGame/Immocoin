/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import APIManager from '../services/axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const schema = yup.object().shape({
    email: yup.string().email("La donnée fournie ne correspond pas à un email.").required("L'email est nécessaire."),
    password: yup.string().min(6, "Le mot de passe est nécessaire et doit faire entre 6 et 20 caractères.").max(20, "Le mot de passe est nécessaire et doit faire entre 6 et 20 caractères.").required(),
    password_confirmation: yup.string().oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas").required("La confirmation du mot de passe est nécessaire."),
    confirmationCGU: yup.bool().oneOf([true], "Vous devez accepter les conditions générales d'utilisation.")
  });
  const [userInfo, setUserInfo] = useAtom(userAtom)
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    }
  );

  const onSubmit = async (data) => {
    try {
    const response = await APIManager.registerUser(data.email, data.password, data.password_confirmation);
    console.log(response);
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
      toast.success('Votre compte a été créé et vous êtes désormais connecté.', {
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
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage("Cet email est déjà pris. Merci d'en sélectionner un autre.");
      }
    }
   }

  return (
    <div className='flex items-center justify-center '>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
          <h1 className='text-2xl text-center mb-4'>Créer un compte</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Adresse mail..." {...register('email')} />
            {errors.email?.message && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password" placeholder="Mot de passe..." {...register('password')} />
            {errors.password?.message && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmation du mot de passe
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password" placeholder="Confirmation du mot de passe..." {...register('password_confirmation')} />
            {errors.password_confirmation?.message && <p className="text-red-500 text-xs">{errors.password_confirmation?.message}</p>}
          </div>
          <div className="md:flex md:items-center mb-6">
            <label className="block text-gray-500 font-bold">
              <input type="checkbox" name="checkbox" {...register('confirmationCGU')}/>
              <span className="text-sm">
                J'accepte les CGU
              </span>
              {errors.confirmationCGU?.message && <p className="text-red-500 text-xs">{errors.confirmationCGU?.message}</p>}
            </label>
          </div>
          <div className="flex justify-center mb-2">
            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Créer le compte" />
          </div>
          {errorMessage && <p className='mt-4 text-sm text-red-500 text-center'>{errorMessage}</p>}
          <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Se connecter
          </Link>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 JiesGame. All rights reserved.
        </p>
      </div>
    </div>
  )
}

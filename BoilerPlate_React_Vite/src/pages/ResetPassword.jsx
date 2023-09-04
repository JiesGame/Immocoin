import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ResetPassword = () => {
  const schema = yup.object().shape({
    password: yup.string().min(6, "Le mot de passe est nécessaire et doit faire entre 6 et 20 caractères.").max(20, "Le mot de passe est nécessaire et doit faire entre 6 et 20 caractères.").required(),
    password_confirmation: yup.string().oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas").required("La confirmation du mot de passe est nécessaire.")
  });

  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const { token } = useParams();

  const onSubmit = (data) => {
    const userPassword = data.password
    fetch(`http://127.0.0.1:3000/password/reset/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        password: userPassword
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/login');
      toast.info("Votre mot de passe a été modifié.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);
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
            <h1 className='text-2xl text-center mb-4'>Réinitialisation du mot de passe</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="Mot de passe..." {...register('password')} />
            {errors.password?.message && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmation du mot de passe
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="Confirmation..." {...register('password_confirmation')} />
            {errors.password_confirmation?.message && <p className="text-red-500 text-xs">{errors.password_confirmation?.message}</p>}
          </div>
          <div className="flex justify-around">
            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Changer son mot de passe" />
          </div>
          <div>
            <p className='mb-2'>
            <Link to="/Login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Se connecter
            </Link>
            </p>
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Créer un compte
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

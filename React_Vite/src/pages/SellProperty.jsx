/* eslint-disable react/no-unescaped-entities */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toastSuccess, toastError } from '../services/toast';

export const SellProperty = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const schema = yup.object().shape({
    title: yup.string().min(10, "Le titre doit comprendre entre 10 et 30 caractères.").max(30, "Le titre doit comprendre entre 10 et 30 caractères.").required(),
    description: yup.string().min(30, "La description doit faire entre 40 et 200 caractères.").max(200, "La description doit faire entre 40 et 200 caractères.").required(),
    price: yup.number().positive("La valeur doit être positive.").required("Le prix est nécessaire."),
    featured_image: yup.mixed().required("L'image est nécessaire")
  });
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    }
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("property[featured_image]", data.featured_image[0]);
    formData.append("property[title]", data.title);
    formData.append("property[description]", data.description);
    formData.append("property[price]", data.price);

    fetch("http://127.0.0.1:3000/properties", {
      method: "POST",
      
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`,
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);
      navigate('/');
      toastSuccess("L'annonce a été publiée !")
    })
    .catch(error => {
      console.error("Fetch error:", error);
      setErrorMessage("Erreur lors de la création de l'annonce, merci de vérifier que l'image soit présente.");
      toastError("L'annonce n'a pas pu être publiée !")
    })
   };

  return (
    <div className='flex items-center justify-center '>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
          <h1 className='text-2xl text-center mb-4'>Mettre un bien en vente</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Titre
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Titre de l'annonce..." {...register('title')} />
            {errors.title?.message && <p className="text-red-500 text-xs">{errors.title?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Description..." {...register('description')} />
            {errors.description?.message && <p className="text-red-500 text-xs">{errors.description?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prix
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="number" placeholder="Prix..." {...register('price')} />
            {errors.price?.message && <p className="text-red-500 text-xs">{errors.price?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="file" name="featured_image" {...register('featured_image')} />
            {errors.featured_image?.message && <p className="text-red-500 text-xs">{errors.featured_image?.message}</p>}
          </div>
          <div className="flex justify-center mb-2">
            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Poster l'annonce" />
          </div>
          {errorMessage && <p className='mt-4 text-sm text-red-500 text-center'>{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}

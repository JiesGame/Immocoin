/* eslint-disable react/no-unescaped-entities */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditProperty = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const [dataProperty, setDataProperty] = useState([]);
  const schema = yup.object().shape({
    title: yup.string().min(10, "Le titre doit comprendre entre 10 et 30 caractères.").max(30, "Le titre doit comprendre entre 10 et 30 caractères.").required(),
    description: yup.string().min(30, "La description doit faire entre 40 et 200 caractères.").max(200, "La description doit faire entre 40 et 200 caractères.").required(),
    price: yup.number().positive("La valeur doit être positive.").required("Le prix est nécessaire."),
    featured_image: yup.mixed()
  });
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}, reset } = useForm({
    resolver: yupResolver(schema),
    }
  );


  useEffect(() => {
    fetch(`http://127.0.0.1:3000/properties/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Les informations sur l'annonce n'ont pas pu être récupérées !");
    })
    .then(data => {

      setDataProperty(data);
      reset(data);
    })
    .catch(error => {
      console.error(error);
    });
  },[reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    data.featured_image[0] && formData.append("property[featured_image]", data.featured_image[0]);
    formData.append("property[title]", data.title);
    formData.append("property[description]", data.description);
    formData.append("property[price]", data.price);
    fetch(`http://127.0.0.1:3000/properties/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`,
      },
      body:formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);
      navigate('/manage_sales');
      toast.success("L'annonce a été mise à jour !", {
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
      setErrorMessage("Erreur lors de la mise à jour de l'annonce.");
    })
   };

  return (
    <div className='flex items-center justify-center '>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
          <h1 className='text-2xl text-center mb-4'>Mise à jour d'une annonce</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Titre
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" defaultValue={dataProperty.title} {...register('title')} />
            {errors.title?.message && <p className="text-red-500 text-xs">{errors.title?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" defaultValue={dataProperty.description} {...register('description')} />
            {errors.description?.message && <p className="text-red-500 text-xs">{errors.description?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prix
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="number" defaultValue={dataProperty.price} {...register('price')} />
            {errors.price?.message && <p className="text-red-500 text-xs">{errors.price?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="file" defaultValue={dataProperty.featured_image} {...register('featured_image')} />
            {errors.featured_image?.message && <p className="text-red-500 text-xs">{errors.featured_image?.message}</p>}
          </div>
          <div className="flex justify-center mb-2">
            <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Mettre à jour l'annonce" />
          </div>
          {errorMessage && <p className='mt-4 text-sm text-red-500 text-center'>{errorMessage}</p>}
        </form>
        {dataProperty.featured_image && <img src={dataProperty.featured_image.url} alt={dataProperty.title}/>}
      </div>
    </div>
  )
}

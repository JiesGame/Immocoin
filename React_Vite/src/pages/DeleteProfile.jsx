/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from "../store/atoms";
import { toastSuccess, toastError, toastInfo } from "../services/toast";
import { useState } from "react";
import { deleteProfileFetch } from "../services/axios";

export const DeleteProfile = () => {
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useAtom(userAtom);
  const token = Cookies.get('token');
  const schema = yup.object().shape({    
    current_password: yup.string().required(),
  });

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsDeleteConfirmation(false)
    try {
      const userDeleteProfil = await deleteProfileFetch(data, token, setUserInfo);
      if(userDeleteProfil.success) {
        toastInfo("Votre compte a bien été supprimé.");
        navigate('/');
      }
    } catch(error) {
      toastError("Votre compte n'a pas pu être supprimé.");
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmation(true);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[26rem]">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe actuel
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="password"
              placeholder="Mot de passe..."
              {...register("current_password")}
            />
            {errors.current_password?.message && (
              <p className="text-red-500 text-xs">
                {errors.current_password?.message}
              </p>
            )}
          </div>
          <div className="flex justify-center mb-4">
          <input
            className="bg-red-500 hover:bg-red-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Supprimer le profil"
            onClick={handleDeleteClick}
          />
        </div>

          {isDeleteConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow-md">
                <p className="mb-4">
                  Êtes-vous sûr de vouloir supprimer votre profil ?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Oui
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                    onClick={() => setIsDeleteConfirmation(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

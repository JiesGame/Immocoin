import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const ShowProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/properties/${id}`, {
      method: 'get',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Pas de réponse.');
      }
      return response.json();
    })
    .then(data => setProperty(data))
    .catch(error => {
      console.error(error);
    })
  },[id])

  if (property.id) {
  return (
    <>
      <h1>{property.title}</h1>
      <div>
        <p>Vendeur: {property.user.email}</p>
        <p>Description: {property.description}</p>
        <p>Prix: {property.price} €</p>
      </div>
    </>
  )
  }
}
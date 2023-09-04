import { useState, useEffect } from "react";
import { DetailProperty } from './DetailProperty'

export const ListProperties = () => {
  const [propertiesNumber, setPropertiesNumber] = useState(0)
  const [dataProperties, setDataProperties] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:3000/properties', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',     
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("La liste des propriétés n'a pas pu être récupéré!");
    })
    .then(data => {
      setDataProperties(data.map(property => 
        <DetailProperty 
          key={property.id}
          id={property.id}
          title={property.title}
          description={property.description}
          price={property.price}
          user={property.user}
        />
      ));
      setPropertiesNumber(data.length);
    })
    .catch(error => {
      console.error(error);
    });
  }, [])

  return (
    <>
      <h2>Liste des propriétés</h2>
      <p>Il y a actuellement {propertiesNumber} propriétés à vendre.</p>
      {dataProperties}
    </>
  )
}
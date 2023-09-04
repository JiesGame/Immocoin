import { useAtom } from "jotai";
import { userAtom } from "../store/atoms";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DetailSpecificProperty } from "../components/DetailSpecificProperty";

export const ManageSales = () => {
  const [user] = useAtom(userAtom);
  const [propertiesNumber, setPropertiesNumber] = useState(0)
  const [dataProperties, setDataProperties] = useState([]);


  useEffect(() => {
    fetch(`http://127.0.0.1:3000/users/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${Cookies.get("token")}`,
      },
      })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setDataProperties(data.properties.map(property => 
        <DetailSpecificProperty 
          key={property.id}
          id={property.id}
          title={property.title}
          description={property.description}
          price={property.price}
          user={property.user}
        />
      ));
      setPropertiesNumber(data.properties.length);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
  }, [])

  return (
    <>
      <h1>Votre profil</h1>
      <p>Bonjour {user.email}, vous avez {propertiesNumber ? propertiesNumber : 0} annonces en cours</p>
      <div>{dataProperties}</div>
    </>
  )
}

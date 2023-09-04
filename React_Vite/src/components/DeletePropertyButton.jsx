import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const DeletePropertyButton = (props) => {
  const deleteProperty = () => {
    fetch(`http://127.0.0.1:3000/properties/${props.propertyID}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,  
      }
    })
    .then(() => {
      toast.info("L'annonce a été supprimée.", {
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
      console.error(error);
    });
  }

  return (
    <button onClick={deleteProperty}>Supprimer le post</button> 
  )
}

DeletePropertyButton.propTypes= {
  propertyID: PropTypes.number
}
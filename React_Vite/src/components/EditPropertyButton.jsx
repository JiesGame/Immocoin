/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const EditPropertyButton = (props) => {

  return (
    <button><Link to={`../edit_property/${props.propertyID}`}>Editer l'annonce</Link></button> 
  )
}

EditPropertyButton.propTypes= {
  propertyID: PropTypes.number
}
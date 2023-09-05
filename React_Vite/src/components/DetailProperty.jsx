import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const DetailProperty = (props) => {
  const username = props.user.email;
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const propertyID = props.id;

  return (
    <div key={propertyID}>
      <p><Link to={`property/${propertyID}`}>{title}</Link></p>
      <p className='my-2'>Propriété proposée par {username}</p>
      <p className='my-2'>description: {description}</p>
      <p>Au prix de {price} €</p>
      <p className='border-2 mt-2 mb-10'></p>
    </div>
  )
}

DetailProperty.propTypes= {
  propertyID: PropTypes.number,
  post: PropTypes.object,
  id: PropTypes.number,
  user: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number
}
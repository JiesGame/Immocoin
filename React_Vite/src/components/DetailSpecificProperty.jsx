import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DeletePropertyButton } from './DeletePropertyButton';
import { EditPropertyButton } from './EditPropertyButton';

export const DetailSpecificProperty = (props) => {
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const propertyID = props.id;

  return (
    <div key={propertyID}>
      <p><Link to={`property/${propertyID}`}>{title}</Link></p>
      <p>{description}</p>
      <p>Au prix de {price} €</p>
      <DeletePropertyButton propertyID={propertyID}/>
      <EditPropertyButton propertyID={propertyID}/>
      <p>---------</p>
    </div>
  )
}

DetailSpecificProperty.propTypes= {
  propertyID: PropTypes.number,
  post: PropTypes.object,
  id: PropTypes.number,
  user: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number
}
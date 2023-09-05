import PropTypes from 'prop-types';
import { DeletePropertyButton } from './DeletePropertyButton';
import { EditPropertyButton } from './EditPropertyButton';

export const DetailSpecificProperty = (props) => {
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const propertyID = props.id;
  const fetchAfterDelete = props.fetchAfterDelete;
  const setFetchAfterDelete = props.setFetchAfterDelete;

  return (
    <div key={propertyID}>
      <p>{title}</p>
      <p>{description}</p>
      <p>Au prix de {price} €</p>
      <div className='flex gap-4'>
        <DeletePropertyButton
          propertyID={propertyID}
          fetchAfterDelete={fetchAfterDelete}
          setFetchAfterDelete={setFetchAfterDelete}
        />
        <EditPropertyButton propertyID={propertyID}/>
      </div>
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
  price: PropTypes.number,
  fetchAfterDelete: PropTypes.bool,
  setFetchAfterDelete: PropTypes.func
}
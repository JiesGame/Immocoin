import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const DetailProperty = (props) => {
  const username = props.user.email;
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const postID = props.id;

  return (
    <div key={postID}>
      <p><Link to={`property/${postID}`}>{title}</Link></p>
      <p>Propriété proposée par {username}</p>
      <p>{description}</p>
      <p>Au prix de {price} €</p>
      <p>---------</p>
    </div>
  )
}

DetailProperty.propTypes= {
  postID: PropTypes.number,
  post: PropTypes.object,
  id: PropTypes.number,
  user: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number
}
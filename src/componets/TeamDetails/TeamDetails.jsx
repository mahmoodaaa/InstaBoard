import { useLocation, useNavigate } from 'react-router-dom';
import './TeamDetails.css';

const TeamDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  if (!user) {
    navigate('/team');
    return null;
  }

  const { name, email, phone, location, picture } = user;

  return (
    <div className="team-details">
      <div className="user-profile">
        <img src={picture.large} alt={`${name.first} ${name.last}`} />
        <h2>{`${name.first} ${name.last}`}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {location.street.number} {location.street.name}, {location.city}, {location.country}</p>
        <p><strong>Postal Code:</strong> {location.postcode}</p>
      </div>
      <button onClick={() => navigate('/team')} className="back-button">
        Back to Team
      </button>
    </div>
  );
};

export default TeamDetails;
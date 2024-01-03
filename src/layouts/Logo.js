import { Link } from "react-router-dom";

const Logo = () => {
  const imageLink = '/chef-hat_9518535.png';

  return (
    <Link to="/">
      <img
        src={imageLink}
        alt="Logo"
        style={{
          height: '60px',
          width: '90px',
          objectFit: 'cover',
        }}
      />
    </Link>
  );
};

export default Logo;

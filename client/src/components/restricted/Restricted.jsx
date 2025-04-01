import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Restricted = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div>
      <h2>You do not have access to this page.</h2>
    </div>
  );
};

export default Restricted;

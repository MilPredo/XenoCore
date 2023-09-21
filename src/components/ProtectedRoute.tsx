import React, {useEffect} from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated){
      navigate('/login')
    }
  }, [isAuthenticated])
  
  return isAuthenticated ? <>{element}</> : null;
}

export default ProtectedRoute;

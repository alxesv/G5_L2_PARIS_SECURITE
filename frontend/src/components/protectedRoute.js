import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const token = getCookie('accessToken');
  
    useEffect(() => {
      if (!token) {
        router.push('/login');
      }
    }, [token, router]);
  
    return token ? children : null;
  };
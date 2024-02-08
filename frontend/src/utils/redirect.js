import { useRouter } from "next/router";

const useRedirectTo = () => {
  const router = useRouter();
  const redirectToLogin = (result) => {
    if (result.invalid === true) {
      router.push("/login");
      return;
    }
  };
  return { redirectToLogin };
};

export default useRedirectTo;

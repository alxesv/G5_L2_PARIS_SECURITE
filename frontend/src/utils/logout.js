import { deleteCookie } from "cookies-next";

export default function logout() {
    deleteCookie("accessToken")
}
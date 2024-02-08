export function getCurrentUser(cookie) {
    let decoded = JSON.parse(atob(cookie.split('.')[1]));
    const username = decoded.username;
    const isAdmin = decoded.isAdmin;
    return {username: username, isAdmin: isAdmin};
}
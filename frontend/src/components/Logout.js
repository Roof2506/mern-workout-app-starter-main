const Logout = () => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";  // Redirect to login
    };
  
    return <button onClick={handleLogout}>Log Out</button>;
  };
  
  export default Logout;
  
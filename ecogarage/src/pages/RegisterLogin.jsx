import React from "react";
import FormLogin from "../components/formregister/FormLogin";
import FormRegister from "../components/formregister/FormRegister";
import '../styles/RegisterLogin.css';

const RegisterLogin = () => {
  return (
    <div className="register-login-container">
      <FormRegister />
      <FormLogin />
    </div>
  );
};

export default RegisterLogin;


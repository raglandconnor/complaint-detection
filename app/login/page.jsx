import React from 'react';
import { LoginCard } from './components/login-card';
import { Navbar } from '../components/navbar/navbar';

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-24">
        <div className="w-[90%] md:w-[500px]">
          <LoginCard />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

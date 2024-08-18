import React from 'react';
import { SignUpCard } from './components/sign-up-card';
import { Navbar } from '../components/navbar/navbar';

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-24">
        <div className="w-[90%] md:w-[500px]">
          <SignUpCard />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

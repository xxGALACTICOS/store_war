import { Link } from "react-router-dom";
import img from "../../../../assets/login.png";
import logo from "../../../../assets/logos.png";
import Logo from "../../../../assets/Logo.svg";
import Logincomp from "./Logincomp";

function Log() {
  return (
    <div className="flex h-screen">

      {/* Left Side */}
      <div className="w-[60%] bg-main text-white relative flex flex-col items-center">

        {/* Logo */}
        <Link to='/'>
          <img src={Logo} className='w-30 cursor-pointer absolute top-[30px] left-[40px]' alt='Store War' />
        </Link>

        {/* Center Content */}
        <div className="text-center mt-[100px] flex flex-col items-center">

          <p className="text-[25px] leading-[1.5] font-medium">
            Experience smarter shopping
            <br />
            with fast secure checkout
            <br />
            and seamless online stores.
          </p>

          {/* Logos */}
          <div className="mt-[20px]">
            <img
              src={logo}
              alt="brands"
              className="w-[230px]"
            />
          </div>

          {/* Illustration */}
          <div className="mt-[20px] flex justify-center">
            <img
              src={img}
              alt="shop img"
              className="w-[720px]"
            />
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="bg-main w-[40%] flex justify-center items-center relative">
        <Logincomp />
      </div>

    </div>
  );
}

export default Log;
// "use client"
import Image from "next/image";

// import SideNavbar from "./components/side-navbar";
import HomePage from "./components/homepage/home-page";
import { toast } from "react-toastify";

export default function Home() {
  // toast.error("Username or Password Incorrect!", {
  //   position: "top-right",
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // });
  return (
    <div className="flex">
      <HomePage />
    </div>
  );
}

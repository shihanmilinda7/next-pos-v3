"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { inputFieldValidation } from "@/app/utils/utils";
import { useDispatch } from "react-redux";
// import { updatebaseinfo } from "@/store/basinfo-update";
import {
  setBaseinfoId,
  setBaseinfoTitle,
  setIsBaseinfoUpdated,
} from "@/store/baseinfo-slice";

const BaseinfoAddnewPopup = ({
  baseinfoType,
  baseinfoId,
  parentbaseinfoId,
  optionArray,
}: {
  baseinfoType: string;
  baseinfoId?: any;
  parentbaseinfoId?: any;
  optionArray?: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [inputvalueid, setInputvalueid] = useState(baseinfoId ?? "");
  const [inputvalue, setInputvalue] = useState("");

  useEffect(() => {
    // console.log("id", id.Set);
    if (optionArray && baseinfoId) {
      const tmpId = baseinfoId;
      const foundElement = optionArray.find(
        (e: any) => e.value === parseFloat(tmpId)
      );
      // console.log("foundElement", foundElement);
      setInputvalue(foundElement?.name);
      setInputvalueid(tmpId);
      // console.log("foundElement", foundElement);
    }
  }, [baseinfoId]);

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (inputvalueid) {
      update();
    } else {
      addnew();
    }
    // dispatch(updatebaseinfo());
  };

  const addnew = async () => {
    const validation = inputFieldValidation({
      inputvalue,
    });

    if (validation == 0) {
      const curparentbaseinfoId = parentbaseinfoId?.values().next().value;
      const response = await fetch(pathname + "/api/addnew-baseinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputvalue, baseinfoType, curparentbaseinfoId }),
      });
      const res = await response.json();
      console.log("res", res);
      if (res.message == "SUCCESS") {
        setIsOpen(false);
        toast.success(`${baseinfoType} created successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(setBaseinfoId(res.curId));
        dispatch(setBaseinfoTitle(baseinfoType));
        dispatch(setIsBaseinfoUpdated());
        // setInputvalueid("");
        // setInputvalue("");
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return res;
    }
  };

  const update = async () => {
    const validation = inputFieldValidation({
      inputvalue,
    });

    if (validation == 0) {
      let tmppid: any;
      if (parentbaseinfoId) {
        tmppid = parentbaseinfoId.values().next().value;
      }
      const response = await fetch(pathname + "/api/addnew-baseinfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputvalueid,
          inputvalue,
          baseinfoType,
          tmppid,
        }),
      });

      const res = await response.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        toast.success(`${baseinfoType} updated successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(setBaseinfoId(baseinfoId.values().next().value));
        dispatch(setBaseinfoTitle(baseinfoType));
        dispatch(setIsBaseinfoUpdated());
        // setInputvalue(inputvalue);
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  return (
    <div>
      <span className="text-gray-500">
        {baseinfoId ? (
          <button className="">
            <AiFillEdit
              onClick={() => setIsOpen(true)}
              className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
            />
          </button>
        ) : (
          <button className="">
            <BsFillPlusCircleFill
              onClick={() => setIsOpen(true)}
              className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
            />
          </button>
        )}
      </span>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="flex items-center justify-center pl-2 pr-2">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="flex flex-wrap w-full">
              <div className="w-full px-1 py-2">
                <div className="flex flex-col mb-1 w-full">
                  <label
                    htmlFor="search"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    {baseinfoType}
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      type="text"
                      name="search"
                      className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Type to search..."
                      value={inputvalue}
                      onChange={(e) => setInputvalue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="px-3">
                <button className="">
                  <AiFillSave
                    onClick={submitButtonHandler}
                    className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                  />
                </button>
              </div>
              <div>
                <button className="">
                  <GiCancel
                    onClick={() => setIsOpen(false)}
                    className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default BaseinfoAddnewPopup;

"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { ItemTable } from "@/app/components/items/table";
import HtmlIconTextInput from "@/app/components/nextui-input-fields/html-text-input";

export default function Products() {
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

  const [search, setSearch] = useState("");
  const router = useRouter();
  const [itemRowObjects, setItemRowObjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItemCount, setTotalItemCount] = useState(1);

  const itemCallback = async () => {
    router.push("/home/items");
  };

  const getAllItemDetails = async () => {
    // declare the data fetching function

    const fetchData = async () => {
      console.log("search", search);
      const reponse = await fetch(
        pathname +
          "/api/items?currentPage=" +
          currentPage +
          "&searchValue=" +
          (search ?? "-1")
      );
      const res = await reponse.json();
      setItemRowObjects(res.items);

      const tmpCount = Math.ceil(res.itemCount / 10);
      setTotalItemCount(tmpCount);
      console.log("res.items", res.items);
    };

    // call the function
    fetchData().catch(console.error);
  };

  useEffect(() => {
    getAllItemDetails();
  }, [currentPage, search]);

  return (
    <div className="flex flex-col ml-3 w-full bg-slate-200">
      <span className="text-3xl font-black leading-none text-gray-900 select-none pt-2">
        Prod<span className="text-indigo-600">ucts</span>
      </span>
      <div className="w-full flex items-center m-2 sm:w-1/2 light:bg-white border border-gray-200 shadow-md p-2">
        <button className="">
          <BsFillPlusCircleFill
            onClick={itemCallback}
            className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
          />
        </button>
        <div className="flex flex-col mb-1 w-full">
          <label
            htmlFor="search"
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            Search
          </label>
          <div className="relative">
            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            </div>
            <input
              id="search"
              type="text"
              name="search"
              className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 w-fit">
        <ItemTable itemRowObjects={itemRowObjects} />
      </div>
    </div>
  );
}

"use client";

import { toast } from "react-toastify";
import { deleteItem } from "@/app/home/items/utils";
import { fetchSelItemDataForEdit } from "@/store/items/utils";
import { useRouter } from "next/navigation";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import HtmlButton from "../nextui-input-fields/html-button";

export const ItemTable = ({ itemRowObjects }: { itemRowObjects: any[] }) => {
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

  const dispatch = useDispatch();
  const router = useRouter();

  const tableHeads = [
    { label: "#", px: 1 },
    { label: "", px: 1 },
    { label: "", px: 1 },
    { label: "Code", px: 2 },
    { label: "Extra code", px: 1 },
    { label: "Name", px: 2 },
    { label: "Category", px: 2 },
    { label: "Subcategory", px: 2 },
    { label: "Brand", px: 2 },
    { label: "Sales price", px: 2 },
    { label: "Cost", px: 2 },
    { label: "Markup", px: 2 },
    { label: "Current stock", px: 2 },
    { label: "Stock limit", px: 2 },
    { label: "Unit", px: 2 },
    { label: "Net weight", px: 2 },
    { label: "Gross weight", px: 2 },
    { label: "Location", px: 2 },
  ];

  const editItem = async (itemcode: any) => {
    dispatch(fetchSelItemDataForEdit({ apiUrl: pathname, itemcode }));
    router.push("/home/items");
  };

  const handleDelete = async (itemcode: any) => {
    // Display a toast notification with a confirmation message.
    toast.warning("Are you sure you want to delete this item?", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false, // This ensures the notification doesn't auto-close
      closeOnClick: false, // This prevents the notification from closing when clicked
      closeButton: (
        <div className=" flex flex-col w-1/3 gap-1">
          <HtmlButton label="Yes" onClick={() => confirmDelete(itemcode)} />
          <HtmlButton
            label="No"
            onClick={() => {
              toast.dismiss();
            }}
            style="bg-red-600 hover:bg-red-700"
          />
        </div>
      ),
    });
  };

  const confirmDelete = async (itemcode: any) => {
    await deleteItem(pathname, itemcode);
    toast.dismiss();
    // router.push("/home/products");
  };

  return (
    <div className="md:px-2 py-2 w-screen">
      <div className="shadow rounded border-b border-gray-200 w-screen">
        <table className="min-w-screen border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              {tableHeads.map((head) => (
                <th
                  key={head.label}
                  className="bg-gray-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"
                >
                  {head.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {itemRowObjects?.map((tableRow: any, index: number) => (
              <tr
                className="even:bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                key={tableRow.itemcode}
              >
                <td className="text-left py-3 px-1 font-bold">{index + 1}</td>
                <td className="text-left py-3 px-1 font-bold">
                  <button className="">
                    <MdOutlineEditNote
                      onClick={() => editItem(tableRow.itemcode)}
                      className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                    />
                  </button>
                </td>
                <td className="text-left py-3 px-1 font-bold">
                  <button className="">
                    <RiDeleteBin5Line
                      onClick={() => handleDelete(tableRow.itemcode)}
                      className="inline-block h-6 w-6 text-red-700 hover:text-red-500 cursor-pointer"
                    />
                  </button>
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.itemcode.toString().padStart(5, "0")}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.extraitemcode}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.itemname}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.categoryname}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.subcategoryname ?? "-"}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.brandname}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.salesprice}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.cost}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.markup}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.currentstock}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.stocklimit}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.unit}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.netweight}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.grossweight}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {tableRow.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

{
  /* <table class="min-w-full border-collapse block md:table">
  <thead class="block md:table-header-group">
    <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
        Name
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
        User Name
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
        Email Address
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
        Mobile
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
        Actions
      </th>
    </tr>
  </thead>
  <tbody class="block md:table-row-group">
    <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Jamal
        Rios
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>
        jrios1
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">
          Email Address
        </span>
        jrios@icloud.com
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>
        582-3X2-6233
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
          Delete
        </button>
      </td>
    </tr>
    <tr class="bg-white border border-grey-500 md:border-none block md:table-row">
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Erwin
        Campbell
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>
        ecampbell088
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">
          Email Address
        </span>
        ecampbell088@hotmail.com
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>
        318-685-X414
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
          Delete
        </button>
      </td>
    </tr>
    <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Lillie
        Clark
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>
        lillie
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">
          Email Address
        </span>
        lillie.clark@gmail.com
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>
        505-644-84X4
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
          Delete
        </button>
      </td>
    </tr>
    <tr class="bg-white border border-grey-500 md:border-none block md:table-row">
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Name</span>Maribel
        Koch
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">User Name</span>
        maribelkoch
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">
          Email Address
        </span>
        mkoch@yahoo.com
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>
        582-400-3X36
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
          Delete
        </button>
      </td>
    </tr>
  </tbody>
</table>; */
}

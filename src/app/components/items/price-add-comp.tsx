"use client";

import HtmlTextInputField from "../nextui-input-fields/html-text-input";

export const PriceComponent = ({
  autosalesprice,
  salesprice,
  pricechange,
  markup,
  setSalesprice,
  setMarkup,
  setAutosalesprice,
  setPricechange,
  title,
}: {
  autosalesprice: any;
  salesprice: any;
  pricechange: any;
  markup: any;
  setSalesprice: any;
  setMarkup: any;
  setAutosalesprice: any;
  setPricechange: any;
  title: string;
}) => {
  return (
    <div className="flex flex-grow border border-gray-400 border-solid rounded-lg">
      <div className="flex flex-col w-full">
        <div className="mt-1 ml-1">
          <span className="inline-block mr-1 last:mr-0 py-1 px-2 rounded-full bg-blue-200 text-xs font-semibold text-blue-600 uppercase">
            {title}
          </span>
        </div>
        <div className="flex flex-wrap w-full">
          <div
            className={`flex w-full ${
              autosalesprice ? "sm:w-1/2" : "sm:w-1/3"
            } flex-wrap`}
          >
            <div className="flex flex-wrap m-1">
              <div
                className={`mb-6 md:mb-0 gap-4 w-full ${
                  autosalesprice ? "sm:w-1/2" : "sm:w-1/1"
                }`}
              >
                <HtmlTextInputField
                  label="Sales price"
                  value={salesprice}
                  onChange={(e) => setSalesprice(e.target.value)}
                  id={`${salesprice}`}
                />
              </div>
              <div
                className={
                  autosalesprice
                    ? "mb-6 md:mb-0 gap-4 w-full px-3 sm:w-1/2"
                    : "hidden"
                }
              >
                <HtmlTextInputField
                  label="Markup %"
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                  id={`${markup}`}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col w-full px-1 mt-2 ${
              autosalesprice ? "sm:w-1/2" : "sm:w-2/3"
            }`}
          >
            <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-1/5 flex items-center">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-red-600"
                  checked={autosalesprice}
                  onChange={(e) => setAutosalesprice(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">Automatic</span>
              </label>
            </div>
            <div className="mb-6 md:mb-0 gap-4 w-full px-1 sm:w-4/5 flex items-center">
              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-red-600"
                  checked={pricechange}
                  onChange={(e) => setPricechange(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">Allow price change at the moment of the sale</span>
              </label>
              {/* <Checkbox isSelected={pricechange} onValueChange={setPricechange}>
                Allow price change at the moment of the sale
              </Checkbox> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

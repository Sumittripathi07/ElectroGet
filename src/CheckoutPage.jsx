import React from "react";

const CheckoutPage = () => {
  return (
    <div className="container">
      <div className="grid grid-two-column">
        <div className="font-[sans-serif] bg-white">
          <div className="flex h-full gap-12 max-sm:flex-col max-lg:gap-4">
            <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
              <div className="relative h-full">
                <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex w-32 p-3 bg-gray-200 rounded-md h-28 max-lg:w-24 max-lg:h-24 shrink-0">
                        <img
                          src="https://readymadeui.com/images/product10.webp"
                          className="object-contain w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-gray-800 lg:text-base">
                          Split Sneakers
                        </h3>
                        <ul className="mt-3 space-y-1 text-xs text-gray-800">
                          <li className="flex flex-wrap gap-4">
                            Size <span className="ml-auto">37</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Quantity <span className="ml-auto">2</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price <span className="ml-auto">$40</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex w-32 p-3 bg-gray-200 rounded-md h-28 max-lg:w-24 max-lg:h-24 shrink-0">
                        <img
                          src="https://readymadeui.com/images/product11.webp"
                          className="object-contain w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-gray-800 lg:text-base">
                          Velvet Boots
                        </h3>
                        <ul className="mt-3 space-y-1 text-xs text-gray-800">
                          <li>
                            Size <span className="float-right">37</span>
                          </li>
                          <li>
                            Quantity <span className="float-right">2</span>
                          </li>
                          <li>
                            Total Price <span className="float-right">$40</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex w-32 p-3 bg-gray-200 rounded-md h-28 max-lg:w-24 max-lg:h-24 shrink-0">
                        <img
                          src="https://readymadeui.com/images/product14.webp"
                          className="object-contain w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-gray-800 lg:text-base">
                          Echo Elegance
                        </h3>
                        <ul className="mt-3 space-y-1 text-xs text-gray-800">
                          <li>
                            Size <span className="float-right">37</span>
                          </li>
                          <li>
                            Quantity <span className="float-right">2</span>
                          </li>
                          <li>
                            Total Price <span className="float-right">$40</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex w-32 p-3 bg-gray-200 rounded-md h-28 max-lg:w-24 max-lg:h-24 shrink-0">
                        <img
                          src="https://readymadeui.com/images/product13.webp"
                          className="object-contain w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-gray-800 lg:text-base">
                          Pumps
                        </h3>
                        <ul className="mt-3 space-y-1 text-xs text-gray-800">
                          <li>
                            Size <span className="float-right">37</span>
                          </li>
                          <li>
                            Quantity <span className="float-right">2</span>
                          </li>
                          <li>
                            Total Price <span className="float-right">$40</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full p-4 bg-gray-200 md:absolute md:left-0 md:bottom-0">
                  <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 lg:text-base">
                    Total <span className="ml-auto">$84.00</span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="sticky top-0 w-full max-w-4xl px-4 py-8 rounded-md h-max">
              <h2 className="text-2xl font-bold text-gray-800">
                Complete your order
              </h2>
              <form className="mt-8">
                <div>
                  <h3 className="mb-4 text-sm text-gray-800 lg:text-base">
                    Personal Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>

                    <div>
                      <input
                        type="number"
                        placeholder="Phone No."
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-sm text-gray-800 lg:text-base">
                    Shipping Address
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Address Line"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="State"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Zip Code"
                        className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-100 rounded-md focus:bg-transparent focus:outline-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 max-md:flex-col">
                    <button
                      type="button"
                      className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

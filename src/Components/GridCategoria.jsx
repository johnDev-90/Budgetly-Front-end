import React from "react";

const GridCategoria = () => {
  return (
    <div className="grid grid-cols-2 mt-20 gap-4 p-4 bg-base-200 rounded-md shadow-lg md:w-3/6 mx-auto">
      {/* Card 1 */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-bold">$447.84</h2>
        <p className="text-sm text-gray-500">Utilities</p>
        <p className="text-right text-gray-500">36%</p>
        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
      </div>

      {/* Card 2 */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-bold">$149.28</h2>
        <p className="text-sm text-gray-500">Expenses</p>
        <p className="text-right text-gray-500">12%</p>
        <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
      </div>
    </div>
  );
};

export default GridCategoria;

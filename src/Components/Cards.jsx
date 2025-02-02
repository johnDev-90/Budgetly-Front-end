import React from "react";

const Cards = () => {
  return (
    <div className="max-w-lg h-full mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        {/* <img src={chip} alt="Chip" className="w-12" /> */}
        <span className="text-white text-lg font-semibold">VISA</span>
      </div>

      <div className="text-white text-4xl font-semibold mb-4">
        **** **** **** <span>2356</span>
      </div>

      <div className="flex justify-between text-white text-sm">
        <div>
          <span>Cardholder</span>
          <p className="font-semibold">John Doe</p>
        </div>
        <div>
          <span>Expires</span>
          <p className="font-semibold">12/25</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 text-white text-xs">
        <p>Bank Name</p>
        {/* <img src={logovisa} alt="Visa Logo" className="w-12" /> */}
      </div>
    </div>
  );
};

export default Cards;

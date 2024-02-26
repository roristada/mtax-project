import React from "react";

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        {/* Sidebar content */}
        <div className="p-4 ">
          <h2 className="text-xl font-bold">Sidebar Menu</h2>
          <ul className="mt-4">
            <li className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center">Menu Item 1</li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center">Menu Item 2</li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer hover:rounded-md text-center">Menu Item 3</li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </div>

      
      
    </div>
  );
};

export default Sidebar;

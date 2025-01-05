import React from 'react';

export default function Tile(props) {
  const { photo, name, salts, price } = props.medicine;

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <img src={photo} alt={name} className="w-full h-40 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 truncate">{name}</h3>
        <p className="text-xs text-gray-500 truncate">{salts}</p>
        <p className="mt-2 text-sm font-semibold text-green-600">${price}</p>
      </div>
    </div>
  );
}

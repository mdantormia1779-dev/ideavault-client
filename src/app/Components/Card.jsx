import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ idea }) => {
  return (
    <div className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
      
      {/* Image */}
      <div className="overflow-hidden">
        <Image
        width={500}
        height={192}
          src={idea.image}
          alt={idea.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Category Badge */}
        <span className="inline-block text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-2">
          {idea.category}
        </span>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
          {idea.title}
        </h2>

        {/* Short Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {idea.shortDesc}
        </p>

        {/* Budget + Audience */}
        <div className="flex justify-between text-xs text-gray-400 mb-4">
          {idea.budget && <span>💰 {idea.budget}</span>}
          {idea.audience && <span>👥 {idea.audience}</span>}
        </div>

        {/* Button */}
        <Link href={`/ideas/${idea._id}`}>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            View Details →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
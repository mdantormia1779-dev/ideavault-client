import React from "react"
import { FaLightbulb, FaHeartbeat, FaRobot, FaGraduationCap } from "react-icons/fa"

const categories = [
  { name: "Tech", icon: <FaLightbulb />, color: "bg-blue-500" },
  { name: "Health", icon: <FaHeartbeat />, color: "bg-red-500" },
  { name: "AI", icon: <FaRobot />, color: "bg-purple-500" },
  { name: "Education", icon: <FaGraduationCap />, color: "bg-green-500" },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold mb-10">
          Explore by Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((cat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800 cursor-pointer"
            >
              <div className={`w-12 h-12 mx-auto flex items-center justify-center text-white text-xl rounded-full ${cat.color}`}>
                {cat.icon}
              </div>

              <h3 className="mt-4 font-semibold text-lg">
                {cat.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
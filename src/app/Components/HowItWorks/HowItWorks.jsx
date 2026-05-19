import React from "react"
import { FaPlusCircle, FaComments, FaRocket } from "react-icons/fa"

const steps = [
  {
    title: "Add Your Idea",
    desc: "Submit your startup idea easily with all details.",
    icon: <FaPlusCircle />,
  },
  {
    title: "Get Feedback",
    desc: "Receive comments and suggestions from other users.",
    icon: <FaComments />,
  },
  {
    title: "Grow & Launch",
    desc: "Improve your idea and turn it into a real startup.",
    icon: <FaRocket />,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">

        <h2 className="text-3xl font-bold mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-800"
            >
              <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
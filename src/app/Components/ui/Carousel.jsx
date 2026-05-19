"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="relative rounded-none w-full mx-auto">

      {/* Slider */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">

          {/* Slide 1 */}
          <div
            className="min-w-full h-112.5 bg-cover bg-center flex items-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72')" }}
          >
            <div className="w-full h-full bg-black/60 flex items-center">
              <div className="text-white p-10 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Turn Your Ideas Into Startups 
                </h1>
                <p className="mb-6 text-gray-200">
                  Share your innovative ideas and get feedback from a global community.
                </p>
                <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  Explore Ideas
                </button>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            className="min-w-full h-112.5 bg-cover bg-center flex items-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')" }}
          >
            <div className="w-full h-full bg-black/60 flex items-center">
              <div className="text-white p-10 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Discover Trending Innovations 
                </h1>
                <p className="mb-6 text-gray-200">
                  Explore trending startup ideas and find inspiration for your next big project.
                </p>
                <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  View Trending
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            className="min-w-full h-112.5 bg-cover bg-center flex items-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')" }}
          >
            <div className="w-full h-full bg-black/60 flex items-center">
              <div className="text-white p-10 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Collaborate & Grow Together 
                </h1>
                <p className="mb-6 text-gray-200">
                  Comment, discuss, and refine ideas with other innovators.
                </p>
                <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  Join Community
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur hover:bg-white/50 text-white p-3 rounded-full"
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur hover:bg-white/50 text-white p-3 rounded-full"
      >
        <FaChevronRight />
      </button>

    </div>
  )
}
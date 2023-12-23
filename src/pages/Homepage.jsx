import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import BannerImage from "../assets/HeroImage.jpg";

const ideasData = [
  {
    id: 1,
    title: "Content 1",
    description: "Deskripsi content 1.",
  },
  {
    id: 2,
    title: "Content 2",
    description: "Deskripsi content 2.",
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

export default function Homepage() {
  const [sortedIdeas, setSortedIdeas] = useState(ideasData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  useEffect(() => {
    const sortedData = ideasData.slice().sort((a, b) => b.id - a.id);
    setSortedIdeas(sortedData);
  }, []);

  const handleSortChange = (sortBy) => {
    const sortedData = [...sortedIdeas];

    if (sortBy === "newest") {
      sortedData.sort((a, b) => b.id - a.id);
    } else if (sortBy === "oldest") {
      sortedData.sort((a, b) => a.id - b.id);
    }

    setSortedIdeas(sortedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIdeas = sortedIdeas.slice(startIndex, endIndex);

  return (
    <div>
      <div className="py-5 px-24 w-full h-[100px] bg-[#FF6600] flex justify-between items-center">
        <img src={Logo} className="bg-white w-auto h-14" alt="Logo" />
        <div className="justify-end">
          <div className="flex justify-between font-semibold text-white text-[18px] gap-x-10">
            <div className="">
              <p>Work</p>
            </div>
            <div className="">
              <p>About</p>
            </div>
            <div className="border-b-4 rounded-b-sm border-white pb-1">
              <p>Ideas</p>
            </div>
            <div className="">
              <p>Career</p>
            </div>
            <div className="">
              <p>Contact</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src={BannerImage}
          className="w-full h-[400px] object-cover filter brightness-50"
          alt="Banner"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold">Ideas</h1>
          <p className="font-medium mt-2">Where all our great things begin</p>
        </div>
      </div>

      <div className="px-24 flex justify-end items-center mt-10 gap-10">
        <div>
          <label htmlFor="sortSelect" className="mr-3 font-medium">
            Sort By :
          </label>
          <select
            id="sortSelect"
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded-2xl px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <label htmlFor="itemsPerPageSelect" className="mr-3 font-medium">
            Items Per Page :
          </label>
          <select
            id="itemsPerPageSelect"
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="border rounded-2xl px-3 py-1"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto px-24 py-10">
        <div className="flex flex-wrap">
          {currentIdeas.map((idea) => (
            <div
              key={idea.id}
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
            >
              <div className="bg-white border rounded-md overflow-hidden shadow-md">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 line-clamp-3">
                    {idea.title}
                  </h3>
                  <p className="text-gray-600">{idea.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-10">
        {Array.from({
          length: Math.ceil(sortedIdeas.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-3 py-2 rounded ${
              currentPage === index + 1
                ? "bg-[#FF6600] text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

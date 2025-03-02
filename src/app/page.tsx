/* eslint-disable @next/next/no-img-element */
"use client"

// pages/index.js
import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ChevronDown } from 'lucide-react';

export default function BookOverview() {
  const [filter, setFilter] = useState('All');

  // Sample book data
  const books = [
    { id: 1, title: "The Midnight Library", author: "Matt Haig", cover: "https://www.norli.no/media/catalog/product/9/7/9781786892737_1_4.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover", progress: 65, category: "Fiction" },
    { id: 2, title: "Atomic Habits", author: "James Clear", cover: "https://www.norli.no/media/catalog/product/9/7/9781847941831_1.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover", progress: 30, category: "Self-Help" },
    { id: 3, title: "Project Hail Mary", author: "Andy Weir", cover: "https://www.norli.no/media/catalog/product/9/7/9781529157468_1_2.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover", progress: 0, category: "Sci-Fi" },
    { id: 4, title: "The Psychology of Money", author: "Morgan Housel", cover: "https://www.norli.no/media/catalog/product/9/7/9780857197689_1.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover", progress: 85, category: "Finance" },
    { id: 5, title: "Dune", author: "Frank Herbert", cover: "https://www.norli.no/media/catalog/product/9/7/9780340960196_1_1.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover", progress: 42, category: "Sci-Fi" },
    { id: 6, title: "The Alchemist", author: "Paulo Coelho", cover: "https://www.norli.no/media/catalog/product/9/7/9780008144227_1_1.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover", progress: 100, category: "Fiction" },
  ];

  const filteredBooks = filter === 'All' ? books : books.filter(book => book.category === filter);
  const categories = ['All', ...new Set(books.map(book => book.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Hondana</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="bg-gray-800 rounded-full py-2 pl-10 pr-4 text-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Filter:</span>
              <div className="relative">
                <button className="bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
                  {filter} <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded-lg shadow-lg w-36 hidden">
                  {categories.map(category => (
                    <div
                      key={category}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setFilter(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition">
                Recently Added
              </button>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                Import Books
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredBooks.map(book => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[2/3] mb-3 rounded-lg overflow-hidden group-hover:shadow-lg transition">

                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                    {book.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                        <div
                          className="h-full bg-indigo-500"
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                    )}
                    {book.progress === 100 && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                        Completed
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-white leading-tight">{book.title}</h3>
                  <p className="text-xs text-gray-400">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

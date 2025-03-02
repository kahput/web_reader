"use client"

// pages/books/[id].js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Settings, Bookmark, Sun, Moon, Type, AlignLeft, Share } from 'lucide-react';

export default function BookReader() {
    const [fontSize, setFontSize] = useState(18);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Sample book content
    const book = {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        totalPages: 283,
        chapters: [
            { title: "Chapter 1", page: 1 },
            { title: "Chapter 2", page: 17 },
            { title: "Chapter 3", page: 35 },
            // more chapters...
        ],
        content: `
      Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?

      A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time.

      Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life. While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better?

      In The Midnight Library, Matt Haig's enchanting blockbuster novel, Nora Seed finds herself faced with this decision. Faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.
    `
    };

    // Toggle settings panel
    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    // Change font size
    const changeFontSize = (size: number) => {
        setFontSize(size);
    };

    // Toggle light/dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Navigate between pages
    const navigatePage = (direction: string) => {
        if (direction === 'next' && currentPage < book.totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Hide controls after a few seconds of inactivity
    // useEffect(() => {
    //     if (showControls) {
    //         const timer = setTimeout(() => {
    //             setShowControls(false);
    //             setSettingsOpen(false);
    //         }, 3000);
    //
    //         return () => clearTimeout(timer);
    //     }
    // }, [showControls]);

    const contentBgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
    const textColorClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';

    return (
        <div
            className={`min-h-screen ${contentBgClass} flex flex-col`}
            onClick={() => setShowControls(true)}
        >
            {/* Top navigation bar - appears on click */}
            {showControls && (
                <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-10 transition-opacity">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white">
                            <ChevronLeft />
                            <span>Back to Library</span>
                        </Link>
                        <h1 className="text-lg font-medium text-white">{book.title}</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={() => { }} className="text-gray-300 hover:text-white">
                                <Bookmark />
                            </button>
                            <button onClick={toggleSettings} className="text-gray-300 hover:text-white">
                                <Settings />
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* Reading area */}
            <main className={`flex-1 px-4 md:px-0 pt-16 pb-16 flex justify-center ${showControls ? 'cursor-default' : 'cursor-none'}`}>
                <div className="w-full max-w-3xl mx-auto">
                    <div
                        className={`prose ${textColorClass} max-w-none`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        <p className="leading-relaxed">{book.content}</p>
                    </div>
                </div>
            </main>

            {/* Settings panel - slide in from right when settings button is clicked */}
            {settingsOpen && (
                <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg z-20 p-4 transform transition-transform">
                    <h3 className="text-xl font-semibold text-white mb-6">Reader Settings</h3>

                    <div className="mb-6">
                        <h4 className="text-gray-400 text-sm uppercase mb-2">Appearance</h4>
                        <div className="flex justify-between">
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-600'}`}
                            >
                                <Moon className="h-5 w-5 text-gray-300" />
                            </button>
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-lg ${!isDarkMode ? 'bg-gray-700' : 'bg-gray-600'}`}
                            >
                                <Sun className="h-5 w-5 text-gray-300" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <h4 className="text-gray-400 text-sm uppercase">Font Size</h4>
                            <span className="text-gray-300">{fontSize}px</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => changeFontSize(Math.max(12, fontSize - 2))}
                                className="text-gray-300 text-sm"
                            >
                                A-
                            </button>
                            <input
                                type="range"
                                min="12"
                                max="32"
                                value={fontSize}
                                onChange={(e) => changeFontSize(parseInt(e.target.value))}
                                className="flex-1"
                            />
                            <button
                                onClick={() => changeFontSize(Math.min(32, fontSize + 2))}
                                className="text-gray-300"
                            >
                                A+
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-gray-400 text-sm uppercase mb-2">Font Type</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="p-2 text-sm text-center bg-gray-700 rounded-lg text-gray-300">
                                Serif
                            </button>
                            <button className="p-2 text-sm text-center bg-gray-600 rounded-lg text-gray-300">
                                Sans-serif
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-400 text-sm uppercase mb-2">Text Alignment</h4>
                        <div className="flex justify-between">
                            <button className="p-2 rounded-lg bg-gray-700">
                                <AlignLeft className="h-5 w-5 text-gray-300" />
                            </button>
                            <button className="p-2 rounded-lg bg-gray-600">
                                <Type className="h-5 w-5 text-gray-300" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom navigation bar - appears on click */}
            {showControls && (
                <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-10 transition-opacity">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <button
                            onClick={() => navigatePage('prev')}
                            className="px-4 py-1.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage <= 1}
                        >
                            Previous
                        </button>

                        <div className="text-center">
                            <span className="text-gray-300">
                                {currentPage} / {book.totalPages}
                            </span>
                            <div className="w-full bg-gray-800 h-1 mt-2 rounded-full">
                                <div
                                    className="bg-indigo-500 h-1 rounded-full"
                                    style={{ width: `${(currentPage / book.totalPages) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigatePage('next')}
                            className="px-4 py-1.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage >= book.totalPages}
                        >
                            Next
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
}

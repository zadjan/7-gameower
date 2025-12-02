import { useState } from "react";
import { Search, Moon } from "lucide-react";
import logo from "../../images/logo.png";

export default function Header({ onSearch, dark, setDark }) {
  const [query, setQuery] = useState("");
  const [font, setFont] = useState("Inter");

  const submitSearch = () => {
    if (query.trim()) onSearch(query);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") submitSearch();
  };

  return (
    <header className="py-6 container mx-auto px-5">
      <div className="flex justify-between items-center mb-8">
        <img
          src={logo}
          alt="ZADJAN Logo"
          className="w-14 h-14 object-contain"
        />

        <div className="flex items-center gap-5">
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className={`px-3 py-2 rounded-lg cursor-pointer shadow ${
              dark ? "bg-gray-800 text-white" : "bg-white text-gray-700"
            }`}
          >
            <option value="Inter">Sans Serif</option>
            <option value="Serif">Serif</option>
            <option value="Mono">Mono</option>
          </select>

          <button
            onClick={() => setDark(!dark)}
            className={`w-12 h-6 rounded-full relative transition ${
              dark ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                dark ? "translate-x-6" : ""
              }`}
            />
          </button>

          <Moon
            size={20}
            className={dark ? "text-purple-500" : "text-gray-500"}
          />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search for a word..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onEnter}
          className={`w-full px-5 py-4 rounded-xl text-lg font-medium outline-none shadow ${
            dark
              ? "bg-[#1a1a1a] text-white placeholder-gray-500"
              : "bg-gray-100 text-gray-900 placeholder-gray-500"
          }`}
          style={{ fontFamily: font }}
        />

        <Search
          onClick={submitSearch}
          size={22}
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-purple-600 hover:text-purple-700"
        />
      </div>
    </header>
  );
}

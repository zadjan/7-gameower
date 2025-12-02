import { useState } from "react";
import Header from "./components/Header";
import Dictionary from "./components/Dictionary";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const toggleTheme = () => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
  };

  const searchWord = async (query) => {
    if (!query.trim()) {
      setMsg("Please enter a word.");
      setResult(null);
      return;
    }

    setLoading(true);
    setMsg("");
    setResult(null);

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );

      if (!res.ok) {
        throw new Error("Word not found");
      }

      const json = await res.json();
      setResult(json[0]);
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-[#0d0d0d] text-white" : "bg-[#f7f7f7] text-black"
      }`}
    >
      {/* HEADER */}
      <Header
        onSearch={searchWord}
        dark={theme === "dark"}
        setDark={toggleTheme}
      />

      {/* CONTENT */}
      <div className="container mx-auto px-5 py-6">
        {loading && (
          <div className="text-center animate-pulse py-10">
            <p className="opacity-70 text-lg">Searching...</p>
          </div>
        )}

        {msg && !loading && (
          <div className="text-center py-10">
            <p className="text-red-500 font-semibold">{msg}</p>
            <p className="opacity-60 mt-1">Try another word.</p>
          </div>
        )}

        {!loading && !msg && result && (
          <div className="animate-fade-in">
            <Dictionary data={result} dark={theme === "dark"} />
          </div>
        )}
      </div>
    </div>
  );
}

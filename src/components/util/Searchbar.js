import React,{ useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
export default function Searchbar() {
    const [originalData, setOriginalData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          const newFilter = originalData.filter((game) =>
            game.name.toLowerCase().includes(searchWord.toLowerCase())
          );
          setFilteredData(newFilter);
        }
      };
  
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/games/searchbar", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setOriginalData(data);
          setFilteredData(data)
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setIsLoading(false);
          setIsError(true);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <section className="">
        <div className="grid grid-cols-4 relative ">
          <input
            type="text"
            value={wordEntered}
            id="searchbar"
            onChange={handleFilter}
            className="rounded-md w-[100%] px-1 h-[1.5rem] col-span-4"
          />
          <div className="absolute right-1">
            {wordEntered.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon onClick={clearInput} />
            )}
          </div>
        </div>
        {isError ? (
          <div>Error occurred while retrieving data.</div>
        ) : (
          <div>
            {wordEntered.length !== 0 && filteredData.length !== 0 && (
              <div className="bg-orange-800 p-2 rounded-md absolute z-10">
                {filteredData.slice(0, 15).map((value, key) => (
                  <Link href={`/games/${value.id}`} key={value.id} target="_blank" className="flex flex-col hover:bg-gray-500 rounded-md p-1">
                    {value.name}
                    <hr className="border-1 border-gray-200"></hr>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    );
  }
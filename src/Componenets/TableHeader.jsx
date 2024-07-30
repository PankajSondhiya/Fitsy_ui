import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const TableHeader = ({ title, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  function handleSearch(term) {
    if (onSearch) {
      onSearch(term);
    }
  }

  return (
    <>
      <div
        className="heading_search d-flex py-5 align-items-center justify-content-between"
        style={{
          position: "sticky",
          height: "50px",
          top: "0px",
          backgroundColor: "#1E1E1E",

          zIndex: "1000",
        }}
      >
        <h3 className="table_heading text-light">{title} </h3>
        <div
          className="search d-flex  justify-content-center align-items-center"
          style={{ position: "relative", width: "40%" }}
        >
          <input
            type="text"
            className="form-control "
            value={searchTerm}
            placeholder="enter the name"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="search_icon " style={{ position: "absolute" }}>
            <FaSearch />
          </div>
        </div>
      </div>
    </>
  );
};
export default TableHeader;

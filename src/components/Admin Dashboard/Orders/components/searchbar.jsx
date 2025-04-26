import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="relative">
        <input
          type="text"
          placeholder="بحث في جميع الأعمدة"
          className="w-64 px-4 py-2 border-1 border-[#DFE1E3] rounded-lg pl-10 text-gray-700"
          value={searchTerm}
          onChange={onSearch}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
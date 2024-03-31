import { SearchOutline, TodayOutline } from "react-ionicons";

const Navbar = () => {
  return (
    <div className="w-full fixed flex flex-col md:flex-row items-center gap-2 justify-between pb-5 md:pb-0 px-5 h-[12vh] md:h-[10vh] top-0 border-b border-slate-300 bg-[#fff]">
      <div className="flex items-center gap-3">
        <TodayOutline
            color="#fb923c"
            width={"28px"}
            height={"28px"}
        />
        <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
            Task Board
        </span>
      </div>
      <div className="flex items-center gap-2 w-full bg-gray-100 rounded-lg px-3 py-[10px]">
        <SearchOutline color={"#999"} />
        <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 outline-none text-[15px]"
        />
      </div>
    </div>
  );
};

export default Navbar;

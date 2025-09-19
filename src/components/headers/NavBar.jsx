import Navigator from "./Navigator";
const NavBar = async () => {
  // FF725E
  // 407BFF BA68C8 bg-[#245A95]
  return (
    <div className="bg-[#212529] shadow-sm text-white  w-screen z-30 sticky top-0">
      <Navigator />
    </div>
  );
};

export default NavBar;

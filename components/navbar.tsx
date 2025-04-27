import Navlink from "./navlink";
import UserButton from "./user-button";

const links = [
  { url: "/", label: "Услуги" },
  { url: "/contacts", label: "Контакти" },
];

const Navbar = () => {
  return (
    <div className="w-full border-b-2 border-pink-200 bg-transparent fixed top-0 left-0 z-50 text-white p-4 h-16 text-2xl ">
      <ul className="flex gap-6 justify-center">
        {links.map((item, index) => (
          <Navlink key={index} label={item.label} url={item.url} />
        ))}
        <UserButton />
      </ul>
    </div>
  );
};

export default Navbar;



const Sidebar = () => {
  return (
    <div className="flex">
      <div className="navbar bg-base-100 fixed mb-4">
          <h1 className="text-xl">Navbar</h1>
        </div>
      <div className=" drawer-side fixed  top-0 left-0 h-screen w-80 bg-base-200 text-base-content p-4">
        <ul className="menu">
          <li>
            <a href="#item1">Sidebar Item 1</a>
          </li>
          <li>
            <a href="#item2">Sidebar Item 2</a>
          </li>
        </ul>
      </div>
      <div className="flex-1 ml-80 p-6 bg-blue-400">
        
        
      </div>
    </div>
  );
};

export default Sidebar;



const Sidebar = () => {
  return (
    <div className="flex">
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
    </div>
  );
};

export default Sidebar;

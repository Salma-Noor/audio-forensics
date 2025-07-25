const Sidebar = () => {
  const items = ["History", "Reports", "Settings"];

  return (
    <div className="w-64 bg-white h-screen border-r">
      <div className="text-2xl font-bold text-rouge p-4">AudioTool</div>
      <nav className="flex flex-col p-4 gap-4 text-gray-700">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-2 hover:bg-rouge hover:text-white rounded-md cursor-pointer transition-all"
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

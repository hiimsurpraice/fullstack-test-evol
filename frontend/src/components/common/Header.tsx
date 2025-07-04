const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Evol App</h1>
          <div className="text-sm text-gray-600">
            Administrador de Tareas
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
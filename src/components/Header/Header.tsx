import { HeaderIcon } from "../HeaderIcon/HeaderIcon";

export function Header() {
  return (
    <header className="bg-gray-dark py-6 px-4 md:px-32 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-purple-light rounded-full flex items-center justify-center shadow-md">
          <HeaderIcon />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-purple">
            IR Stock Calc
          </h1>
        </div>
      </div>
      {/* Espaço para futuro menu ou botão */}
      {/* <div className="mt-4 md:mt-0">
        <button className="bg-purple-light text-white px-4 py-2 rounded font-bold shadow hover:bg-purple-dark transition">
          Nova Operação
        </button>
      </div> */}
    </header>
  );
}

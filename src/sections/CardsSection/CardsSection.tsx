import {
  ChartBarIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/16/solid";

export function CardsSection() {
  return (
    <section className="mb-10" aria-labelledby="project-info-title">
      <header>
        <h2
          id="project-info-title"
          className="text-xl md:text-2xl font-bold mb-6 text-purple-light"
        >
          Sobre o Projeto
        </h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-dark rounded-lg p-6 flex flex-col items-center shadow-md">
          <ChartBarIcon className="w-10 h-10 text-purple-light mb-3" />
          <h3 className="text-lg font-bold text-purple-light mb-2">
            Calcule o IR sobre ações
          </h3>
          <p className="text-gray text-center text-sm">
            Informe suas operações de compra e venda e veja o imposto devido
            automaticamente.
          </p>
        </div>
        <div className="bg-gray-dark rounded-lg p-6 flex flex-col items-center shadow-md">
          <InformationCircleIcon className="w-10 h-10 text-purple-light mb-3" />
          <h3 className="text-lg font-bold text-purple-light mb-2">
            Resumo detalhado
          </h3>
          <p className="text-gray text-center text-sm">
            Visualize o resultado de cada ação, prejuízos acumulados e o IR
            total devido.
          </p>
        </div>
        <div className="bg-gray-dark rounded-lg p-6 flex flex-col items-center shadow-md">
          <ShieldCheckIcon className="w-10 h-10 text-purple-light mb-3" />
          <h3 className="text-lg font-bold text-purple-light mb-2">
            Seguro e prático
          </h3>
          <p className="text-gray text-center text-sm">
            Seus dados ficam apenas no seu navegador. Simples, rápido e seguro
            para investidores.
          </p>
        </div>
      </div>
    </section>
  );
}

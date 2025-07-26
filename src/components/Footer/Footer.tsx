export function Footer() {
  return (
    <footer className="bg-gray-dark py-6 px-4 text-center border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-gray text-sm">
          © {new Date().getFullYear()} Calculadora de IR sobre Ações
        </span>
        <span className="text-gray text-xs">
          Feito com <span className="text-purple-light font-bold">React</span>{" "}
          &amp;{" "}
          <span className="text-purple-light font-bold">Tailwind CSS</span>
        </span>
        <div className="flex gap-4">
          <a
            href="https://github.com/albertoaraujoo/stock-tax-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-light text-sm hover:text-purple-dark transition"
          >
            GitHub do Projeto
          </a>
          <a
            href="https://www.linkedin.com/in/albertoaraujoo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-light text-sm hover:text-purple-dark transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

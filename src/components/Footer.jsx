import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="my-10 text-center">
      <p className="font-bold">APV - Administrador de Pacientes de Veterinaria</p>
      <nav className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/Abra24-Ro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#10B981] text-2xl hover:text-[#059669] transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/robinson-ojeda-9273a4346/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0A66C2] text-2xl hover:text-[#004182] transition-colors"
        >
          <FaLinkedin />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;

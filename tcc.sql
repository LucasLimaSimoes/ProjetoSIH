-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30-Ago-2022 às 18:45
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tcc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `leitos`
--

CREATE TABLE `leitos` (
  `idleitos` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `qte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `leitos`
--

INSERT INTO `leitos` (`idleitos`, `tipo`, `qte`) VALUES
(1, 'UTI', 50),
(2, 'Enfermaria', 100);

-- --------------------------------------------------------

--
-- Estrutura da tabela `medicos`
--

CREATE TABLE `medicos` (
  `idmedicos` int(11) NOT NULL,
  `nome` text NOT NULL,
  `crm` int(11) NOT NULL,
  `especialidade` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `medicos`
--

INSERT INTO `medicos` (`idmedicos`, `nome`, `crm`, `especialidade`) VALUES
(2, 'Maria das Dores', 5678, 'Cardiologista'),
(3, 'João da Silva', 1234, 'Cardiologista'),
(6, 'Lorrane Lima', 1583, 'Ortopedista');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pacientes`
--

CREATE TABLE `pacientes` (
  `idpacientes` int(11) NOT NULL,
  `nome` text NOT NULL,
  `sus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pacientes`
--

INSERT INTO `pacientes` (`idpacientes`, `nome`, `sus`) VALUES
(1, 'Sicrano da Silva', 123456),
(2, 'Joãozinho', 98752);

-- --------------------------------------------------------

--
-- Estrutura da tabela `paciente_leito`
--

CREATE TABLE `paciente_leito` (
  `FK_paciente` int(11) NOT NULL,
  `leito` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `paciente_leito`
--

INSERT INTO `paciente_leito` (`FK_paciente`, `leito`) VALUES
(1, 'Enfermaria'),
(2, 'UTI');

-- --------------------------------------------------------

--
-- Estrutura da tabela `paciente_medico`
--

CREATE TABLE `paciente_medico` (
  `FK_paciente` int(11) NOT NULL,
  `FK_medico` int(11) NOT NULL,
  `prontuario` int(11) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `paciente_medico`
--

INSERT INTO `paciente_medico` (`FK_paciente`, `FK_medico`, `prontuario`, `data`) VALUES
(1, 2, 123, '2022-07-25'),
(2, 6, 258, '2022-07-27');

-- --------------------------------------------------------

--
-- Estrutura da tabela `paciente_remedio`
--

CREATE TABLE `paciente_remedio` (
  `FK_paciente` int(11) NOT NULL,
  `FK_remedio` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `paciente_remedio`
--

INSERT INTO `paciente_remedio` (`FK_paciente`, `FK_remedio`, `qte`, `data`) VALUES
(1, 3, 2, '2022-07-25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `remedios`
--

CREATE TABLE `remedios` (
  `idremedios` int(11) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `qte` int(11) NOT NULL,
  `lote` int(11) NOT NULL,
  `validade` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `remedios`
--

INSERT INTO `remedios` (`idremedios`, `nome`, `qte`, `lote`, `validade`) VALUES
(1, 'ZZZZZ', 10, 11111, '2022-12-01'),
(3, 'AAAAAA', 6, 123456, '2022-07-28'),
(4, 'ZZZZZ', 5, 147852, '2022-12-01');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `iduser` int(11) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `senha` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`iduser`, `usuario`, `senha`) VALUES
(1, 'teste', 'teste'),
(2, 'admin', '$2b$10$V7cHG/q2xJ6QGa9VdhSiY.e7KfyqAxcdm0msVti1guJbu.lQepwZi');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `leitos`
--
ALTER TABLE `leitos`
  ADD PRIMARY KEY (`idleitos`);

--
-- Índices para tabela `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`idmedicos`),
  ADD UNIQUE KEY `crm` (`crm`);

--
-- Índices para tabela `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`idpacientes`);

--
-- Índices para tabela `paciente_leito`
--
ALTER TABLE `paciente_leito`
  ADD PRIMARY KEY (`FK_paciente`),
  ADD KEY `FK_pacienteid` (`FK_paciente`);

--
-- Índices para tabela `paciente_medico`
--
ALTER TABLE `paciente_medico`
  ADD KEY `FK_pacienteid` (`FK_paciente`),
  ADD KEY `FK_medicoid` (`FK_medico`) USING BTREE;

--
-- Índices para tabela `paciente_remedio`
--
ALTER TABLE `paciente_remedio`
  ADD KEY `FK_pacienteid` (`FK_paciente`),
  ADD KEY `FK_remedioid` (`FK_remedio`) USING BTREE;

--
-- Índices para tabela `remedios`
--
ALTER TABLE `remedios`
  ADD PRIMARY KEY (`idremedios`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`iduser`),
  ADD UNIQUE KEY `user` (`usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `leitos`
--
ALTER TABLE `leitos`
  MODIFY `idleitos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `medicos`
--
ALTER TABLE `medicos`
  MODIFY `idmedicos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `idpacientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `remedios`
--
ALTER TABLE `remedios`
  MODIFY `idremedios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `paciente_leito`
--
ALTER TABLE `paciente_leito`
  ADD CONSTRAINT `FK_pacienteid` FOREIGN KEY (`FK_paciente`) REFERENCES `pacientes` (`idpacientes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `paciente_medico`
--
ALTER TABLE `paciente_medico`
  ADD CONSTRAINT `FK_medicoid` FOREIGN KEY (`FK_medico`) REFERENCES `medicos` (`idmedicos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_pacienteid2` FOREIGN KEY (`FK_paciente`) REFERENCES `pacientes` (`idpacientes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `paciente_remedio`
--
ALTER TABLE `paciente_remedio`
  ADD CONSTRAINT `FK_pacienteid3` FOREIGN KEY (`FK_paciente`) REFERENCES `pacientes` (`idpacientes`),
  ADD CONSTRAINT `FK_remedioid` FOREIGN KEY (`FK_remedio`) REFERENCES `remedios` (`idremedios`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

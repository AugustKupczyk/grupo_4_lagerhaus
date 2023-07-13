-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2023 a las 00:08:35
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lagerhaus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_products`
--

CREATE TABLE `categorias_products` (
  `id` int(4) NOT NULL,
  `nombre` STRING(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_products`
--

INSERT INTO `categorias_products` (`id`, `nombre`) VALUES
(1, 'Tapeo'),
(2, 'Burgers'),
(3, 'Sandwiches'),
(4, 'Sin Tacc'),
(5, 'Vegano'),
(6, 'Cervezas'),
(7, 'Tragos y Gaseosas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_users`
--

CREATE TABLE `categorias_users` (
  `id` int(4) NOT NULL,
  `rol` STRING(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_users`
--

INSERT INTO `categorias_users` (`id`, `rol`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(4) NOT NULL,
  `nombre` STRING(50) NOT NULL,
  `categoria_id` int(4) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` int(5) NOT NULL,
  `img` STRING(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `email` STRING(50) NOT NULL,
  `nombre` STRING(50) NOT NULL,
  `apellido` STRING(50) NOT NULL,
  `numero_celular` int(50) NOT NULL,
  `nacimiento` int(8) NOT NULL,
  `direccion` STRING(50) NOT NULL,
  `img` STRING(100) DEFAULT NULL,
  `contraseña` STRING(100) NOT NULL,
  `rol_id` STRING(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `categorias_products`
--
ALTER TABLE `categorias_products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias_users`
--
ALTER TABLE `categorias_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias_products`
--
ALTER TABLE `categorias_products`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `categorias_users`
--
ALTER TABLE `categorias_users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

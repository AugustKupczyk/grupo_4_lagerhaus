-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2023 a las 17:40:13
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

-- Crear la base de datos 'lagerhaus' si no existe
CREATE DATABASE IF NOT EXISTS lagerhaus;

-- Usar la base de datos 'lagerhaus'
USE lagerhaus;
--

-- Estructura de tabla para la tabla `categorias_products`
--

CREATE TABLE `categorias_products` (
  `id` int(4) NOT NULL,
  `nombre` varchar(50) NOT NULL
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
(7, 'Tragos y Gaseosas'),
(8, 'Wraps');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_users`
--

CREATE TABLE `categorias_users` (
  `id` int(4) NOT NULL,
  `rol` varchar(50) NOT NULL
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
  `nombre` varchar(50) NOT NULL,
  `categoria_id` int(4) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` int(5) NOT NULL,
  `img` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `nombre`, `categoria_id`, `descripcion`, `precio`, `img`) VALUES
(1, 'Nachos', 1, 'Con bondiola a la bbq.', 3000, '/imgs/products/tapeo-nachos-bondiola.jpg'),
(2, 'Tequeños', 1, 'Con salsa tártara.', 2000, '/imgs/products/tapeo-tequeños.jpg'),
(4, 'Mozzarellas empanizadas', 1, 'Con salsa fileto.', 1800, '/imgs/products/tapeo-muzzarellitas.jpg'),
(5, 'Papas completas', 1, 'Con queso cheddar, panceta y verdeo.', 1900, '/imgs/products/tapeo-papas-completas.JPG'),
(6, 'Pollo', 8, 'Con pollo crunch, lechuga, tomate, queso crema, queso provoleta y alioli de zanahoria.\"', 1800, '/imgs/products/wrap-pollo.JPG'),
(7, 'Veggie', 8, 'Lechuga, tomate, queso crema, queso provoleta y alioli de zanahoria.', 1800, '/imgs/products/wrap-veggie.JPG'),
(8, 'Tabla Vegana', 5, 'Para compartir. 3 empanadas notCarne, bastones de zanahoria, hummus de garbanzo, morrones en aceite, tomates cherry, berenjenas al escabeche, aceitunas verdes acompañada de batatas y papas fritas.', 4200, '/imgs/products/tapeo-papas-completas.JPG'),
(9, 'Burger notCo', 5, 'Medallón notCo simil carne, lechuga, tomate, queso cheddar vegano, pan vegano y notMayo.', 1900, '/imgs/products/tapeo-papas-completas.JPG'),
(10, 'Fernet con Cola', 7, 'Fernet con Coca Cola.', 1100, '/imgs/products/tragos-fernet.JPG'),
(11, 'Aperol Spritz', 7, 'Aperol Spritz con jugo de naranja', 1200, '/imgs/products/tragos-aperol.JPG'),
(12, 'Jagermeister & red bull', 7, 'Jagermeister con red bull.', 2400, '/imgs/products/tragos-jager-redbull.JPG'),
(13, 'Merle & Tonic', 7, 'Merle con Tónica', 1200, '/imgs/products/tragos-merle-tonic.JPG'),
(14, 'Cervecera', 2, 'Medallón de carne, huevo a la plancha, panceta ahumada, cebolla caramelizada, y queso cheddar.', 2000, '/imgs/products/burger-cervecera.JPG\"'),
(15, 'Clásica', 2, 'Medallón de carne, queso tybo, jamón, lechuga y tomate.', 1800, '/imgs/products/burger-clasica.JPG'),
(16, 'Doble Smash', 2, 'Doble carne SMASH, cuádruple cheddar y panceta ahumada.', 2400, '/imgs/products/burger-doble-smash.JPG'),
(17, 'Jack', 2, 'Medallón de carne, queso cheddar, panceta ahumada, aros de cebolla y salsa BBQ Jack Daniels.', 2400, '/imgs/products/burger-jack.JPG'),
(18, 'Bondiola Desmenuzada', 3, 'Bondiola braseada, cebolla caramelizada y salsa barbacoa.', 2300, '/imgs/products/sandwich-bondiola-desmenuzada.JPG'),
(19, 'Double Down', 3, 'Con dos piezas de pollo frito en lugar del pan, doble queso cheddar, panceta ahumada y salsa Big M.', 2900, '/imgs/products/sandwich-double-down.JPG'),
(20, 'Philly Cheesesteak', 3, 'Tiras de ojo de bife, queso cheddar y cebolla.', 2900, '/imgs/products/sandwich-phillycheesesteak.JPG'),
(21, 'Empanadas x3', 4, 'Carne / Jamón y Queso', 1800, '/imgs/products/sintacc-empanadas.JPG'),
(22, 'Tarta Individual', 4, 'Verdura / Jamón y Queso', 1800, '/imgs/products/sintacc-tartas.JPG'),
(23, 'Pinta', 6, 'Elegí de nuestras selección de +25 canillas!', 800, '/imgs/products/cerveza.JPG'),
(24, 'Media Pinta', 6, 'Elegí de nuestras selección de +25 canillas!', 600, '/imgs/products/cerveza.JPG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nacimiento` date NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `contraseña` varchar(100) NOT NULL,
  `rol_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `nombre`, `apellido`, `nacimiento`, `direccion`, `img`, `contraseña`, `rol_id`) VALUES
(1, 'augustkup@gmail.com', 'August', 'Kupczyk', 1163719380, '2001-07-30', 'Dorrego 968', '1690211125175-photo4954191471553128977.jpg', '$2a$12$PKoV9QrjK/6796iIXT2tEeXQeI2DIRGAZdptRb9B6GOIyZAVRsWcS', 1),
(2, 'pepito@hotmail.com', 'aaa', 'bbb', 11202020, '2022-05-02', 'aaa 123', 'sin_foto.jpg', '$2b$12$.J2A1PtddPKPrUpIJdFJ1OYA.hNH7VClUQUMa8l95mfrXMbl4oa/S', 2);

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `categorias_products`
--
ALTER TABLE `categorias_products`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

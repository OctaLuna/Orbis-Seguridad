-- Verificar usuarios con rol 6 (TEMPORAL) antes de eliminar
-- SELECT COUNT(*) FROM usuarios WHERE id_rol = 6;
-- Si hay usuarios con rol 6, reasignarlos primero.

-- Eliminar rol TEMPORAL si ya no se usa
DELETE FROM roles WHERE id_rol = 6;

-- Asegurar que VISITANTE exista en id_rol = 7
INSERT INTO roles (id_rol, nombre_rol)
VALUES (7, 'VISITANTE')
ON CONFLICT (id_rol) DO UPDATE SET nombre_rol = 'VISITANTE';

-- Verificar estado final
SELECT * FROM roles ORDER BY id_rol;

-- ============================================================
-- PARTE 1: Columnas nuevas en tabla usuarios
-- ============================================================

ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS nombre               VARCHAR(100),
  ADD COLUMN IF NOT EXISTS apellido             VARCHAR(100),
  ADD COLUMN IF NOT EXISTS correo_real          VARCHAR(255),
  ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS password_changed_at  TIMESTAMP,
  ADD COLUMN IF NOT EXISTS password_expires_at  TIMESTAMP,
  ADD COLUMN IF NOT EXISTS is_locked            BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS failed_attempts      INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_at            TIMESTAMP,
  ADD COLUMN IF NOT EXISTS reset_token          VARCHAR(255),
  ADD COLUMN IF NOT EXISTS reset_token_expires  TIMESTAMP,
  ADD COLUMN IF NOT EXISTS created_at           TIMESTAMP NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at           TIMESTAMP NOT NULL DEFAULT NOW();

-- Poblar password_expires_at para usuarios existentes
UPDATE usuarios
  SET password_expires_at = NOW() + INTERVAL '60 days'
  WHERE password_expires_at IS NULL;

-- ============================================================
-- PARTE 2: Tabla historial de contraseñas
-- ============================================================

CREATE TABLE IF NOT EXISTS password_history (
  id            SERIAL PRIMARY KEY,
  id_usuario    INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pwd_history_usuario
  ON password_history(id_usuario, created_at DESC);

-- ============================================================
-- PARTE 3: Tabla asignación investigador <-> empresa
-- ============================================================

CREATE TABLE IF NOT EXISTS investigador_empresa (
  id           SERIAL PRIMARY KEY,
  id_usuario   INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  id_empresa   INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
  asignado_por INTEGER REFERENCES usuarios(id_usuario),
  created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(id_usuario, id_empresa)
);

CREATE INDEX IF NOT EXISTS idx_inv_emp_usuario
  ON investigador_empresa(id_usuario);

-- ============================================================
-- PARTE 4: Actualizar roles (sin TRUNCATE, seguro con datos existentes)
-- ============================================================

INSERT INTO roles (id_rol, nombre_rol) VALUES
  (1, 'SUPERADMIN'),
  (2, 'ADMIN_RRHH'),
  (3, 'ADMIN_EMPRESAS'),
  (4, 'INVESTIGADOR_SENIOR'),
  (5, 'INVESTIGADOR_JUNIOR'),
  (6, 'TEMPORAL'),
  (7, 'VISITANTE')
ON CONFLICT (id_rol) DO UPDATE SET nombre_rol = EXCLUDED.nombre_rol;

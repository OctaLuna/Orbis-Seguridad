-- Ejecutar en Supabase ANTES de deployar el código con soft delete

ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_usuarios_deleted_at
  ON usuarios(deleted_at)
  WHERE deleted_at IS NULL;

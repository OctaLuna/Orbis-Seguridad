CREATE TABLE IF NOT EXISTS investigador_rubro (
  id          SERIAL PRIMARY KEY,
  id_usuario  INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  id_rubro    INTEGER NOT NULL REFERENCES rubros(id_rubro) ON DELETE CASCADE,
  UNIQUE(id_usuario, id_rubro)
);

CREATE INDEX IF NOT EXISTS idx_inv_rubro_usuario
  ON investigador_rubro(id_usuario);

# Contexto y Avance del Proyecto Orbis-Seguridad

## Fecha: Abril 28, 2026

## Resumen Ejecutivo

Este documento captura el estado completo del proyecto Orbis-Seguridad, incluyendo objetivos, progreso técnico, problemas encontrados y próximos pasos. Está diseñado para transferir contexto a otra IA o desarrollador.

## Objetivos Principales

1. **Desarrollo del módulo AdminEmpresasDashboard**: Panel de administración para gestión de empresas con roles SUPERADMIN y ADMIN_EMPRESAS.
2. **Integración de API**: Alineación con endpoints documentados en backend.
3. **Mejoras de UX**: Formularios funcionales, visualización de logos, navegación intuitiva.

## Arquitectura del Proyecto

### Frontend (React + Vite)
- **Framework**: React con hooks (useState, useEffect, useMemo)
- **Estilos**: Tailwind CSS
- **Rutas**: React Router
- **API Client**: Axios con configuración centralizada
- **Componentes**: Reutilizables con Heroicons

### Backend (NestJS + TypeORM)
- **Framework**: NestJS con controladores REST
- **Base de datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT con guards de roles
- **Validación**: Pipes globales con class-validator

## Estado Actual del Código

### ✅ Completado

#### 1. Estructura Base del Dashboard
- **Archivo**: `Frontend/src/components/AdminEmpresasDashboard.jsx`
- **Funcionalidades**:
  - Tabla responsive con empresas
  - Búsqueda por nombre
  - Filtro por sede
  - Paginación básica
  - Estados de carga y error

#### 2. Servicio de Empresas Admin
- **Archivo**: `Frontend/src/services/adminEmpresasService.js`
- **Endpoints implementados**:
  - `getAdminEmpresasSummary()`: GET /api/empresas
  - `registerEmpresa()`: POST /api/formulario (temporal)
  - `updateEmpresa()`: PUT /api/empresas/:id
  - `patchEmpresa()`: PATCH /api/empresas/:id
  - `getCatalogOptions()`: GET /api/tamanios-empresas

#### 3. Modal de Formulario
- **Archivo**: `Frontend/src/components/EmpresaFormModal.jsx`
- **Características**:
  - Campos: nombre, fecha fundación, tamaño
  - Validación con react-hook-form
  - Estados de carga y error

#### 4. Navegación y Roles
- **Archivo**: `Frontend/src/components/navbar.jsx`
- **Mejoras**:
  - Menú "ADMIN EMPRESAS" para roles [1,3]
  - Restricción de "DASHBOARDS" a roles específicos

#### 5. Integración de Rutas
- **Archivo**: `Frontend/src/components/App.js`
- **Rutas añadidas**:
  - `/admin-empresas` → AdminEmpresasDashboard

### 🔄 En Progreso

#### 1. Endpoint de Creación
- **Problema**: 404 en POST /api/empresas/registro
- **Solución temporal**: Usar POST /api/formulario
- **Estado**: Requiere payload completo del RegisterEmpresaDto

#### 2. Visualización de Logos
- **Estado**: Funcionalidad básica implementada
- **Pendiente**: Integrar en tabla del dashboard

#### 3. Etiquetas de Botones
- **Estado**: Botones sin texto visible
- **Pendiente**: Añadir tooltips y labels descriptivos

### ❌ Problemas Pendientes

#### 1. Error 404 en Creación de Empresa
```javascript
// Error actual
Failed to load resource: the server responded with a status of 404 (Not Found)

// Endpoint usado
POST /api/empresas/registro

// Endpoint correcto identificado
POST /api/formulario
```

#### 2. Payload Incompleto
El backend requiere campos adicionales para `RegisterEmpresaDto`:
- `rubros`: RegisterRubrosDto
- `tiposSocietarios`: RegisterTiposSocietariosDto
- `familia`: RegisterFamiliaDto
- `sedes`: RegisterSedeDto[]
- `fundadores`: string[]
- `servicios`: string[]
- `items`: string[]
- `municipios`: number[]
- `paisesOperaInternacionalmente`: number[]
- `reconocimientos`: RegisterReconocimientoDto[]
- `imagenes`: string[]
- `mensajeConmemorativo`: string
- `implementacion`: RegisterImplementacionDto
- `hitos`: RegisterHitoDto[]

#### 3. Normalización de Respuestas
- GET /api/empresas devuelve `{ empresas: Empresa[] }`
- GET /api/tamanios-empresas devuelve `{ tamaniosEmpresas: Tamanio[] }`
- Necesario normalizar en servicio

#### 4. Campos de Empresa
- `fechaFundacion` vs `foundationDate`
- `tamanioEmpresa` vs `size`
- `sedes[0].departamento.nombre` para sede

## Código Actual (Extractos Clave)

### AdminEmpresasDashboard.jsx
```jsx
const AdminEmpresasDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [headquartersFilter, setHeadquartersFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sizeOptions, setSizeOptions] = useState([]);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminEmpresasSummary();
      setCompanies(Array.isArray(response) ? response : response?.data || []);
    } catch (error) {
      console.error('Error cargando empresas:', error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSizeOptions = async () => {
    try {
      const response = await getCatalogOptions('tamanios');
      const normalized = Array.isArray(response)
        ? response.map((item) => ({
            id: item.id ?? item.value ?? item,
            label: item.nombre ?? item.label ?? String(item),
          }))
        : [];
      setSizeOptions(normalized);
    } catch (error) {
      console.error('Error cargando opciones de tamaño:', error);
    }
  };

  // ... resto del componente
};
```

### adminEmpresasService.js
```javascript
const normalizeResponseArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  if (Array.isArray(payload?.empresas)) {
    return payload.empresas;
  }
  if (Array.isArray(payload?.tamaniosEmpresas)) {
    return payload.tamaniosEmpresas;
  }
  return [];
};

export const getAdminEmpresasSummary = async () => {
  const response = await API.get('/api/empresas');
  return normalizeResponseArray(response.data);
};

export const registerEmpresa = async (payload) => {
  const response = await API.post('/api/formulario', payload);
  return response.data || null;
};

// ... otros métodos
```

## Próximos Pasos Prioritarios

### 1. Corregir Endpoint de Creación
- Cambiar POST /api/empresas/registro → POST /api/formulario
- Construir payload mínimo válido con campos requeridos
- Implementar campos opcionales en formulario

### 2. Mejorar UX del Dashboard
- Añadir logos de empresa en tabla
- Etiquetas descriptivas en botones (Editar, Eliminar)
- Tooltips informativos
- Estados de carga por fila

### 3. Validación Completa
- Verificar todos los endpoints contra documentación
- Normalizar respuestas de API
- Manejo de errores consistente

### 4. Testing
- Probar creación de empresa con payload completo
- Verificar filtros y búsqueda
- Validar permisos por rol

## Archivos Modificados Recientemente

1. `Frontend/src/services/adminEmpresasService.js`
2. `Frontend/src/components/AdminEmpresasDashboard.jsx`
3. `Frontend/src/components/EmpresaFormModal.jsx`
4. `Frontend/src/components/navbar.jsx`
5. `Frontend/src/components/App.js`

## Dependencias Actuales

### Frontend
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.20.0",
    "@heroicons/react": "^2.0.18",
    "react-hook-form": "^7.48.0",
    "tailwindcss": "^3.3.0"
  }
}
```

### Backend
- NestJS con TypeORM
- PostgreSQL
- JWT para autenticación
- Swagger para documentación

## Notas Técnicas

- **Autenticación**: Requiere token JWT válido
- **Roles**: SUPERADMIN (1), ADMIN_EMPRESAS (3)
- **CORS**: Configurado para desarrollo y producción
- **Validación**: Pipes globales activados
- **Base de datos**: Migraciones TypeORM

## Contacto y Continuación

Este documento proporciona contexto completo para continuar el desarrollo. Los archivos principales están en `Frontend/src/` y el backend en `Backend/src/`. 

Para continuar:
1. Revisar errores 404 en creación
2. Implementar payload completo para formulario
3. Mejorar UI/UX del dashboard
4. Probar integración completa

---

*Documento generado automáticamente el 28 de abril de 2026*
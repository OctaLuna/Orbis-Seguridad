# 📘 DOCUMENTACIÓN COMPLETA - ORBIS EMPRESARIAL

## 🎯 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Funcionamiento de Componentes](#funcionamiento-de-componentes)
6. [Tipos de Datos (FormData)](#tipos-de-datos)
7. [Hooks Personalizados](#hooks-personalizados)
8. [Sistema de API](#sistema-de-api)
9. [Endpoints Esperados](#endpoints-esperados)
10. [Flujo de Datos Completo](#flujo-de-datos-completo)
11. [Integración en Otras Páginas](#integración-en-otras-páginas)
12. [Variables de Entorno](#variables-de-entorno)

---

## 📖 Descripción General

### ¿Qué es Orbis Empresarial?

**Orbis Empresarial** es una plataforma web desarrollada por la Universidad Católica Boliviana "San Pablo" como parte del proyecto **"Bicentenario: Legado Boliviano"**.

### Objetivo Principal

Preservar y reconocer la memoria histórica de empresas bolivianas que han contribuido significativamente al desarrollo económico y social del país. El proyecto busca:

- 📚 Crear un archivo digital de historias empresariales
- 🏆 Reconocer la trayectoria de empresas emblemáticas
- 👥 Invitar a empresas seleccionadas a compartir su legado
- 🔒 Mantener confidencialidad y exclusividad en la información
- 🌱 Inspirar a futuras generaciones

### Público Objetivo

Empresas bolivianas reconocidas con:
- Trayectoria distinguida y establecida
- Contribución significativa al desarrollo nacional
- Historial empresarial notable
- Interés en preservar su legado corporativo

---

## 🛠️ Tecnologías Utilizadas

### Frontend Stack

```json
{
  "Framework": "React 19.1.1 con TypeScript 5.8.2",
  "Build Tool": "Vite 6.2.0",
  "Styling": "Tailwind CSS 3.4.4",
  "HTTP Client": "Axios 1.11.0",
  "Icons": "@heroicons/react 2.2.0",
  "Utilities": "clsx 2.1.1"
}
```

### Herramientas de Desarrollo

- **PostCSS**: Procesamiento de CSS
- **Autoprefixer**: Compatibilidad con navegadores
- **TypeScript**: Tipado estático y seguridad de tipos

### Requisitos del Sistema

- **Node.js**: Versión 16 o superior
- **npm** o **yarn**: Gestor de paquetes

---

## 📁 Estructura del Proyecto

```
LegadoBoliviano-EnterprisesPage/
├── src/
│   ├── App.tsx                          # Componente raíz principal
│   ├── index.tsx                        # Punto de entrada de React
│   ├── index.html                       # HTML base
│   ├── index.css                        # Estilos globales
│   ├── types.ts                         # Tipos TypeScript compartidos
│   ├── tailwind.config.js               # Configuración de Tailwind CSS
│   ├── vite.config.ts                   # Configuración de Vite
│   ├── tsconfig.json                    # Configuración de TypeScript
│   ├── postcss.config.js                # Configuración de PostCSS
│   │
│   ├── components/
│   │   ├── App.tsx                      # Componente principal
│   │   ├── Navbar.tsx                   # Barra de navegación
│   │   ├── HeroSection.tsx              # Sección de bienvenida
│   │   ├── PurposeSection.tsx           # Sección de objetivos
│   │   ├── TrustSection.tsx             # Sección de confianza
│   │   ├── ContactSection.tsx           # Sección de contacto
│   │   ├── RegistrationModal.tsx        # Modal de registro (formulario)
│   │   ├── Footer.tsx                   # Pie de página
│   │   └── Icons.tsx                    # Componentes de iconos SVG
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.ts              # Hook para detectar sección activa
│   │   └── useOnScreen.ts               # Hook para animaciones al scroll
│   │
│   ├── services/
│   │   └── api.ts                       # Cliente HTTP Axios
│   │
│   ├── public/
│   │   ├── logo.png
│   │   ├── background.png
│   │   ├── EstrellaIcon.png
│   │   ├── Seguridadicon.png
│   │   └── Legadoicon.png
│   │
│   └── assets/
│       └── fonts/
│
├── package.json                         # Dependencias y scripts
├── metadata.json                        # Metadata del proyecto
├── README.md                            # Archivo readme básico
└── DOCUMENTACION_COMPLETA.md            # Esta documentación
```

---

## ⚙️ Instalación y Configuración

### Paso 1: Clonar o Descargar el Repositorio

```bash
cd LegadoBoliviano-EnterprisesPage
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

**Nota**: Reemplazar la URL con la URL real de tu backend.

### Paso 4: Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

### Paso 5: Compilar para Producción

```bash
npm run build
```

### Paso 6: Vista Previa de Producción

```bash
npm run preview
```

---

## 🎨 Funcionamiento de Componentes

### 1. **App.tsx** - Componente Raíz

**Responsabilidad**: Orquestar la aplicación principal

```typescript
- Gestiona el estado del modal de registro
- Renderiza la estructura general de la página
- Proporciona funciones para abrir/cerrar el modal
```

**Estructura**:
```typescript
<div> {/* contenedor principal */}
  <Navbar />
  <main>
    <HeroSection onOpenModal={handleOpenModal} />
    <PurposeSection />
    <TrustSection />
    <ContactSection />
  </main>
  <Footer />
  <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
</div>
```

### 2. **Navbar.tsx** - Barra de Navegación

**Responsabilidades**:
- Navegación con scroll suave
- Detección de sección activa con `useScrollSpy`
- Menú móvil responsive
- Cambio de estilo al hacer scroll

**Características**:
- 3 enlaces principales:
  - `#objetivo` → PurposeSection
  - `#privacidad` → TrustSection
  - `#contacto` → ContactSection
- Altura adaptable del navbar
- Logo que cambia según el estado de scroll
- Cierre del menú con tecla ESC

### 3. **HeroSection.tsx** - Sección de Bienvenida

**Responsabilidades**:
- Presentación visual inicial
- Botón para abrir el modal de registro
- Animaciones de entrada

**Contenido**:
```
- Título: "Orbis Empresarial"
- Subtítulo: "Conozcamos a las empresas que forjaron nuestro país"
- Descripción del proyecto
- Botón de llamada a acción: "Unirme al proyecto"
- Fondo con imagen personalizada
```

### 4. **PurposeSection.tsx** - Sección de Objetivos

**Responsabilidades**:
- Explicar el propósito del proyecto
- Mostrar el logo del proyecto
- Animaciones al scroll

**Contenido**:
- Descripción detallada del proyecto
- Imagen del logo de Orbis

### 5. **TrustSection.tsx** - Sección de Confianza

**Responsabilidades**:
- Transmitir valores y garantías
- Mostrar tres pilares principales

**Pilares**:
1. **Exclusividad**: Invitación selectiva para empresas emblemáticas
2. **Confidencialidad**: Protección de información empresarial
3. **Legado y Visibilidad**: Preservación para futuras generaciones

### 6. **ContactSection.tsx** - Sección de Contacto

**Responsabilidades**:
- Proporcionar información de contacto
- Mostrar datos de la institución

**Información de Contacto**:
```
Email: legado.bicentenario@ucb.edu.bo
Teléfono: (+591) 2-2782222
Dirección: Universidad Católica Boliviana "San Pablo"
          Av. 14 de Septiembre, Obrajes. La Paz, Bolivia.
```

### 7. **RegistrationModal.tsx** - Modal de Registro (Formulario Principal)

**Responsabilidades**:
- Capturar información empresarial completa
- Validar datos del formulario
- Enviar información al backend
- Gestionar archivos adjuntos

**Estructura de 7 Pasos**:

1. **Identidad** (Paso 1)
   - Nombre comercial
   - Fecha de fundación
   - Fundadores
   - Tamaño de empresa

2. **Perfil** (Paso 2)
   - Sector actual y cambios históricos
   - Empresa familiar
   - Tipo societario
   - Operaciones internacionales

3. **Visión** (Paso 3)
   - Visión empresarial
   - Misión
   - Sitio web
   - Actividad principal
   - Productos y servicios

4. **Alcance** (Paso 4)
   - Departamentos donde opera
   - Sede principal
   - Municipios

5. **Legado** (Paso 5)
   - Hitos históricos
   - Premios
   - Distinciones

6. **Impacto** (Paso 6)
   - Iniciativas de impacto social
   - Objetivos de Desarrollo Sostenible (ODS)
   - Proyectos asociados

7. **Archivos** (Paso 7)
   - Carga de documentos
   - Mensaje conmemorativo

### 8. **Footer.tsx** - Pie de Página

**Contenido**:
- Logo de la universidad
- Año de copyright
- Enlace a política de privacidad

### 9. **Icons.tsx** - Componentes de Iconos

**Iconos Disponibles**:
- `IconTarget` - Objetivo
- `IconShieldCheck` - Seguridad/Privacidad
- `IconPhone` - Teléfono
- `IconMail` - Correo electrónico
- `IconLocation` - Ubicación
- `IconClose` - Cerrar
- `IconUpload` - Subir archivo
- `IconExclamationCircle` - Advertencia
- `IconPlus` - Agregar
- `IconTrash` - Eliminar
- `IconPhotograph` - Foto
- `IconBuilding` - Edificio
- `IconEye` - Ver
- `IconGlobe` - Globo/Internacional
- `IconHeart` - Corazón
- `IconFile` - Archivo
- `IconUser` - Usuario
- `IconPen` - Editar

---

## 📋 Tipos de Datos

### Estructura Principal: `FormData`

Este es el tipo raíz que contiene TODA la información que se envía al backend.

```typescript
interface FormData {
  // ============================================
  // 1. INFORMACIÓN BÁSICA (PASO 1)
  // ============================================
  companyName: string;                    // Nombre comercial
  foundationDate: string;                 // Fecha de fundación (YYYY-MM-DD)
  founders: Founder[];                    // Lista de fundadores
  companySizeId: string;                  // ID del tamaño de empresa

  // ============================================
  // 2. PERFIL DE NEGOCIOS (PASO 2)
  // ============================================
  currentSector: string;                  // Sector actual (ID o "OTRO")
  currentSectorOther: string;             // Texto si sector es "OTRO"
  hasChangedSector: boolean;              // ¿Ha cambiado de sector?
  sectorHistory: SectorChange[];          // Histórico de cambios de sector

  isFamilyOwned: boolean;                 // ¿Es empresa familiar?
  familyStatusChangeYear: string;         // Año de cambio de estado familiar

  currentCorporateType: string;           // Tipo societario actual
  hasChangedCorporateType: boolean;       // ¿Ha cambiado de tipo?
  corporateTypeChangeDate: string;        // Fecha del cambio

  hasInternationalOperations: boolean;    // ¿Tiene operaciones internacionales?
  internationalOperationsCountries: number[]; // IDs de países

  // ============================================
  // 3. VISIÓN Y MISIÓN (PASO 3)
  // ============================================
  mainActivity: string;                   // Actividad principal
  mainProducts: SimpleListItem[];         // Productos principales (max 5)
  mainServices: SimpleListItem[];         // Servicios principales (max 5)
  vision: string;                         // Visión empresarial
  mission: string;                        // Misión empresarial
  website: string;                        // Sitio web de la empresa

  // ============================================
  // 4. ALCANCE GEOGRÁFICO (PASO 4)
  // ============================================
  departments: string[];                  // Departamentos donde opera
  headquarters: string;                   // Sede principal
  municipalities: string[];               // Municipios

  // ============================================
  // 5. LEGADO E HISTORIA (PASO 5)
  // ============================================
  milestones: Milestone[];                // Hitos históricos
  awards: AwardOrDistinction[];           // Premios
  distinctions: AwardOrDistinction[];     // Distinciones

  // ============================================
  // 6. IMPACTO SOCIAL (PASO 6)
  // ============================================
  impactInitiative: 'none' | 'social' | 'sustainability' | 'both';
  impactInitiativeYear: string;           // Año de inicio
  selectedSdgs: number[];                 // IDs de ODS seleccionados
  sdgProjects: Record<number, SdgProject[]>; // Proyectos por ODS

  // ============================================
  // 7. ARCHIVOS Y MENSAJE FINAL (PASO 7)
  // ============================================
  files: File[];                          // Archivos adjuntos
  commemorativeMessage: string;           // Mensaje conmemorativo
}
```

### Tipos Componentes

#### `Milestone` - Hito Histórico
```typescript
interface Milestone {
  id: number;           // ID único (Date.now())
  name: string;         // Nombre del hito (max 300 caracteres)
  description: string;  // Descripción (max 999 caracteres)
  startDate: string;    // Fecha inicio (YYYY-MM-DD)
  endDate: string;      // Fecha fin opcional (YYYY-MM-DD)
}
```

#### `Founder` - Fundador
```typescript
interface Founder {
  id: number;           // ID único
  name: string;         // Nombre del fundador
}
```

#### `SimpleListItem` - Item Genérico
```typescript
interface SimpleListItem {
  id: number;           // ID único
  name: string;         // Nombre del item
}
```

#### `AwardOrDistinction` - Premio o Distinción
```typescript
interface AwardOrDistinction {
  id: number;           // ID único
  name: string;         // Nombre del premio (max 999 caracteres)
  year: string;         // Año (número, no > año actual)
  isInternational: boolean; // ¿Es internacional?
}
```

#### `SdgProject` - Proyecto ODS
```typescript
interface SdgProject {
  id: number;           // ID único
  name: string;         // Nombre del proyecto (max 300 caracteres)
}
```

#### `SectorChange` - Cambio de Sector
```typescript
interface SectorChange {
  id: number;           // ID único para React key
  sectorId: string;     // ID del sector o "OTRO"
  sectorOther: string;  // Texto si es "OTRO"
}
```

---

## 🪝 Hooks Personalizados

### 1. `useScrollSpy` - Detectar Sección Activa

**Ubicación**: `hooks/useScrollSpy.ts`

**Propósito**: Detectar cuál sección está visible en el viewport

**Uso**:
```typescript
const sectionIds = ['objetivo', 'privacidad', 'contacto'];
const activeSection = useScrollSpy(sectionIds);
// Retorna: 'objetivo' | 'privacidad' | 'contacto' | ''
```

**Características**:
- Usa `IntersectionObserver` para mejor rendimiento
- Threshold de múltiples puntos para suavidad
- Línea de activación en el centro de la pantalla (`-50% 0px -50% 0px`)

### 2. `useOnScreen` - Animaciones al Scroll

**Ubicación**: `hooks/useOnScreen.ts`

**Propósito**: Detectar cuando un elemento entra al viewport para animaciones

**Uso**:
```typescript
const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

<section ref={ref} className={isVisible ? 'opacity-100' : 'opacity-0'}>
  Contenido con animación
</section>
```

**Opciones**:
```typescript
interface IntersectionObserverOptions {
  threshold?: number;    // 0 a 1 (default: 0.15)
  rootMargin?: string;   // CSS margin format
}
```

**Retorno**:
- `ref`: Ref para adjuntar al elemento DOM
- `isVisible`: Boolean indicando si está visible

---

## 🔌 Sistema de API

### Configuración Base

**Archivo**: `services/api.ts`

```typescript
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("VITE_API_URL no está definida en tu archivo .env.local");
}

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

**Características**:
- Validación de URL de backend en tiempo de construcción
- Headers por defecto configurados
- Instancia singleton de Axios

### Cómo Usar el Cliente API

#### En un Componente React

```typescript
import apiClient from '../services/api';

// GET
const response = await apiClient.get('/empresas');

// POST
await apiClient.post('/empresas/registro', formData);

// PUT
await apiClient.put('/empresas/1', updatedData);

// DELETE
await apiClient.delete('/empresas/1');
```

#### Con Manejo de Errores

```typescript
try {
  const response = await apiClient.post('/empresas/registro', data);
  console.log('Éxito:', response.data);
} catch (error) {
  if (error.response) {
    console.error('Error:', error.response.data);
  }
}
```

---

## 🔗 Endpoints Esperados

El backend debe proporcionar los siguientes endpoints. El cliente espera que todos los datos se envíen en un solo POST.

### 1. **Obtener Catálogos de Datos**

#### Tamaños de Empresa
```
GET /api/catalogo/tamanios
Respuesta:
{
  "data": [
    { "id": 1, "nombre": "Microempresa" },
    { "id": 2, "nombre": "Pequeña" },
    { "id": 3, "nombre": "Mediana" },
    { "id": 4, "nombre": "Grande" }
  ]
}
```

#### Sectores
```
GET /api/catalogo/sectores
Respuesta:
{
  "data": [
    { "id": "1", "nombre": "Agricultura" },
    { "id": "2", "nombre": "Manufactura" },
    { "id": "3", "nombre": "Servicios" },
    ...
    { "id": "OTRO", "nombre": "Otro" }
  ]
}
```

#### Tipos Societarios
```
GET /api/catalogo/tipos-societarios
Respuesta:
{
  "data": [
    { "id": "SA", "nombre": "Sociedad Anónima" },
    { "id": "SRL", "nombre": "Sociedad Responsabilidad Limitada" },
    { "id": "EIRL", "nombre": "Empresa Individual" },
    ...
  ]
}
```

#### Departamentos (Bolivia)
```
GET /api/catalogo/departamentos
Respuesta:
{
  "data": [
    { "id": 1, "nombre": "La Paz" },
    { "id": 2, "nombre": "Cochabamba" },
    { "id": 3, "nombre": "Santa Cruz" },
    ...
  ]
}
```

#### Municipios
```
GET /api/catalogo/municipios?departamento_id=1
Respuesta:
{
  "data": [
    { "id": 1, "nombreMunicipio": "La Paz", "idDepartamento": 1 },
    { "id": 2, "nombreMunicipio": "El Alto", "idDepartamento": 1 },
    ...
  ]
}
```

#### Países (para operaciones internacionales)
```
GET /api/catalogo/paises
Respuesta:
{
  "data": [
    { "id": 1, "nombre": "Argentina" },
    { "id": 2, "nombre": "Brasil" },
    { "id": 3, "nombre": "Chile" },
    ...
  ]
}
```

#### Objetivos de Desarrollo Sostenible (ODS)
```
GET /api/catalogo/sdgs
Respuesta:
{
  "data": [
    { "id": 1, "nombre": "Fin de la Pobreza" },
    { "id": 2, "nombre": "Hambre Cero" },
    { "id": 3, "nombre": "Salud y Bienestar" },
    ...
    { "id": 17, "nombre": "Alianzas para lograr los objetivos" }
  ]
}
```

#### Acciones (para proyectos ODS)
```
GET /api/catalogo/acciones
Respuesta:
{
  "data": [
    { "id_accion": 1, "nombre": "Acción 1" },
    { "id_accion": 2, "nombre": "Acción 2" },
    ...
  ]
}
```

### 2. **Registrar Empresa (Principal)**

```
POST /api/empresas/registro
Content-Type: multipart/form-data (si hay archivos)
o
Content-Type: application/json (solo datos)

Body: Objeto FormData completo (ver tipos)

Respuesta de Éxito (201):
{
  "success": true,
  "message": "Empresa registrada exitosamente",
  "data": {
    "id": 123,
    "companyName": "...",
    "createdAt": "2025-04-28T10:30:00Z"
  }
}

Respuesta de Error (400/422):
{
  "success": false,
  "errors": {
    "companyName": ["El nombre de la empresa es requerido"],
    "foundationDate": ["La fecha de fundación no es válida"]
  }
}
```

### 3. **Envío de Archivos**

Si los archivos se envían por separado:

```
POST /api/empresas/{id}/documentos
Content-Type: multipart/form-data

Body:
- file: <archivo binario>
- type: "documento" | "foto" | "otro"

Respuesta:
{
  "success": true,
  "data": {
    "documentId": 456,
    "fileName": "documento.pdf",
    "url": "/uploads/456/documento.pdf"
  }
}
```

### 4. **Validación y Verificación**

```
GET /api/empresas/verificar-nombre?name=MiEmpresa
Respuesta:
{
  "available": true,
  "message": "El nombre está disponible"
}
```

---

## 🔄 Flujo de Datos Completo

### Diagrama de Flujo

```
┌─────────────────────────────────┐
│  Usuario abre la página         │
│  (App.tsx se monta)             │
└─────────────────┬───────────────┘
                  │
                  ▼
        ┌─────────────────────┐
        │  Se cargan datos    │
        │  (catalogo de       │
        │   departamentos,    │
        │   sectores, etc.)   │
        └─────────────────────┘
                  │
                  ▼
        ┌─────────────────────┐
        │  Usuario hace clic  │
        │  "Unirme al proyecto"
        └─────────────┬───────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │  Se abre                 │
        │  RegistrationModal       │
        │  (isModalOpen = true)    │
        └─────────────┬────────────┘
                      │
    ┌─────────────────┴──────────────────┐
    │  Usuario completa los 7 pasos:    │
    │  1. Identidad                     │
    │  2. Perfil                        │
    │  3. Visión                        │
    │  4. Alcance                       │
    │  5. Legado                        │
    │  6. Impacto                       │
    │  7. Archivos                      │
    └─────────────────┬──────────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │  Usuario hace clic en    │
        │  botón "Enviar"          │
        └─────────────┬────────────┘
                      │
                      ▼
        ┌──────────────────────────────┐
        │  Se valida FormData          │
        │  (campos requeridos, tipos)  │
        └─────────────┬────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼ (Válido)          ▼ (Inválido)
    ┌────────┐           ┌────────────┐
    │ Enviar │           │ Mostrar    │
    │ POST   │           │ errores    │
    └────┬───┘           └────────────┘
         │
         ▼
    ┌────────────────────────────────┐
    │  POST /api/empresas/registro   │
    │  + FormData completo           │
    │  + Archivos (si aplica)        │
    └────────┬───────────────────────┘
             │
    ┌────────┴──────────┐
    │                   │
    ▼ (201/200)    ▼ (4xx/5xx)
┌──────────┐    ┌──────────────┐
│ Éxito    │    │ Error HTTP   │
│ Mostrar  │    │ Mostrar      │
│ mensaje  │    │ error msg    │
│ Cerrar   │    │ en modal     │
│ modal    │    └──────────────┘
└──────────┘
```

### Flujo Detallado en RegistrationModal

1. **Inicialización**: Cargar catálogos del backend
2. **Validación en Tiempo Real**: Validar campos mientras el usuario escribe
3. **Cambio de Paso**: Al hacer clic en "Siguiente", validar paso actual
4. **Estado del Formulario**: Mantener `FormData` en estado de React
5. **Envío**: Al hacer clic en "Enviar", compilar todo en un POST
6. **Respuesta**: 
   - Éxito: Mostrar mensaje, cerrar modal
   - Error: Mostrar errores en los campos correspondientes

---

## 🌐 Integración en Otras Páginas

### Opción 1: Embeber como iFrame

Si tu proyecto está en una URL pública:

```html
<iframe 
  src="https://tu-dominio.com" 
  width="100%" 
  height="800"
  frameborder="0"
  allowFullscreen>
</iframe>
```

### Opción 2: Integrar en un Sitio Existente

#### Instalación como Librería

1. **Compilar el proyecto a UMD**:

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/App.tsx'),
      name: 'OrbisEmpresarial',
      fileName: (format) => `orbis-empresarial.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

2. **Usar en otra página HTML**:

```html
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
  <script src="https://tu-cdn.com/orbis-empresarial.umd.js"></script>
  <link rel="stylesheet" href="https://tu-cdn.com/orbis-empresarial.css">
</head>
<body>
  <div id="orbis-root"></div>
  <script>
    const { default: App } = window.OrbisEmpresarial;
    ReactDOM.render(
      <App />,
      document.getElementById('orbis-root')
    );
  </script>
</body>
</html>
```

### Opción 3: Usar como Componente en Otro Proyecto React

1. **Publicar el proyecto en npm** (si es privado, usar npm privado)

2. **En el otro proyecto React**:

```bash
npm install @tu-org/orbis-empresarial
```

3. **Importar y usar**:

```typescript
import React from 'react';
import OrbisEmpresarial from '@tu-org/orbis-empresarial';
import '@tu-org/orbis-empresarial/dist/style.css';

function MiPagina() {
  return (
    <div>
      <h1>Otros contenidos</h1>
      <OrbisEmpresarial />
    </div>
  );
}

export default MiPagina;
```

### Opción 4: Crear una Ventana Emergente

```typescript
function abrirOrbisEnVentanaNew() {
  const width = 1000;
  const height = 800;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  
  window.open(
    'https://tu-dominio.com',
    'OrbisEmpresarial',
    `width=${width},height=${height},left=${left},top=${top}`
  );
}
```

### Opción 5: Comunicación Entre Ventanas (PostMessage)

**En Orbis (src/App.tsx)**:

```typescript
useEffect(() => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'OPEN_REGISTRATION') {
      setIsModalOpen(true);
    }
  });
}, []);

// Al cerrar modal, notificar
const handleCloseModal = () => {
  setIsModalOpen(false);
  window.parent.postMessage({ type: 'REGISTRATION_CLOSED' }, '*');
};
```

**En página padre**:

```typescript
const orbisWindow = window.open('https://tu-dominio.com', 'Orbis');

document.getElementById('open-registration-btn').addEventListener('click', () => {
  orbisWindow.postMessage({ type: 'OPEN_REGISTRATION' }, '*');
});

window.addEventListener('message', (event) => {
  if (event.data.type === 'REGISTRATION_CLOSED') {
    console.log('Registro completado');
  }
});
```

### Opción 6: API REST para Compartir Datos

Si Orbis está en un dominio diferente, usar CORS:

**Backend (CORS habilitado)**:

```javascript
// Express.js ejemplo
app.use(cors({
  origin: ['https://tu-sitio-principal.com', 'https://otro-sitio.com'],
  credentials: true
}));
```

**Desde otro sitio**:

```javascript
// Obtener datos del formulario completado
fetch('https://orbis.com/api/empresas/123', {
  method: 'GET',
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log('Datos de empresa:', data));
```

---

## 🔐 Variables de Entorno

### Archivo: `.env.local`

```env
# ==========================================
# CONFIGURACIÓN DEL BACKEND
# ==========================================

# URL base de la API del backend
# Reemplaza con tu URL real
VITE_API_URL=http://localhost:3000/api

# Alternativas según el entorno:
# Desarrollo: http://localhost:3000/api
# Staging: https://staging-api.tu-dominio.com/api
# Producción: https://api.tu-dominio.com/api

# ==========================================
# OPCIONAL: CONFIGURACIÓN ADICIONAL
# ==========================================

# Timeout para peticiones (en ms)
# VITE_API_TIMEOUT=30000

# Habilitar logs de desarrollo
# VITE_DEBUG=true
```

### Cómo Acceder en el Código

```typescript
// En components o services
const apiUrl = import.meta.env.VITE_API_URL;
const debug = import.meta.env.VITE_DEBUG;

console.log(`Conectando a ${apiUrl}`);
```

### Variables de Entorno por Entorno

**Desarrollo** (`.env.local`):
```env
VITE_API_URL=http://localhost:3000/api
```

**Staging** (`.env.staging`):
```env
VITE_API_URL=https://staging-api.tudominio.com/api
```

**Producción** (`.env.production`):
```env
VITE_API_URL=https://api.tudominio.com/api
```

Usar:
```bash
npm run dev                          # .env.local
vite build --mode staging            # .env.staging
vite build --mode production         # .env.production
```

---

## 📊 Estructura de Respuestas del Backend

### Respuesta Exitosa

```json
{
  "success": true,
  "message": "Operación completada exitosamente",
  "data": {
    "id": 123,
    "companyName": "Mi Empresa",
    ...
  }
}
```

### Respuesta con Errores de Validación

```json
{
  "success": false,
  "message": "Validación fallida",
  "errors": {
    "companyName": ["El nombre es requerido"],
    "foundationDate": ["La fecha no es válida"],
    "mainProducts": ["Debe incluir al menos un producto"]
  }
}
```

### Respuesta de Error de Servidor

```json
{
  "success": false,
  "message": "Error interno del servidor",
  "error": "INTERNAL_SERVER_ERROR",
  "status": 500
}
```

---

## 🎨 Estilos y Colores de Marca

### Paleta de Colores (Tailwind)

```javascript
// tailwind.config.js
{
  theme: {
    colors: {
      'brand-blue': '#2C5282',      // Azul principal
      'brand-dark': '#1A202C',      // Oscuro
      'brand-cream': '#F7FAFC',     // Crema/fondo claro
      'brand-slate': '#4A5568',     // Gris oscuro
      'brand-gray': '#CBD5E0',      // Gris
      'brand-beige': '#E2E8F0',     // Beige
      'brand-stone': '#A0AEC0',     // Piedra
      'brand-red': '#F56565',       // Rojo (errores)
    }
  }
}
```

### Tipografía

- **Serif**: Para títulos principales (h1, h2)
- **Sans-serif**: Para cuerpo de texto y UI

---

## 🚀 Despliegue a Producción

### Build para Producción

```bash
npm run build
```

Genera:
- `dist/index.html`
- `dist/assets/index-*.js`
- `dist/assets/style-*.css`

### Opciones de Hosting

#### 1. Vercel (Recomendado para Vite + React)

```bash
npm install -g vercel
vercel
```

#### 2. Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### 3. GitHub Pages

```bash
npm install gh-pages --save-dev
# Añadir a package.json:
# "deploy": "npm run build && gh-pages -d dist"
npm run deploy
```

#### 4. Servidor Propio (Nginx)

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        root /var/www/orbis-empresarial;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://tu-backend:3000;
    }
}
```

---

## 🔍 Resolución de Problemas Comunes

### Error: "VITE_API_URL no está definida"

**Solución**: Crear `.env.local` con:
```env
VITE_API_URL=http://localhost:3000/api
```

### Error: CORS en Requests

**Solución**: Configurar CORS en el backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Modal no Abre

**Causa**: `handleOpenModal` no está siendo pasado correctamente
**Solución**: Verificar que `HeroSection` recibe la prop:
```typescript
<HeroSection onOpenModal={handleOpenModal} />
```

### Archivos no se Suben

**Causa**: Configuración incorrecta de `FormData` en JavaScript
**Solución**:
```typescript
const formData = new FormData();
formData.append('companyName', data.companyName);
files.forEach(file => {
  formData.append('files', file);
});
```

---

## 📚 Recursos Adicionales

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Docs](https://axios-http.com)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## 📞 Contacto y Soporte

Para preguntas o soporte:

**Email**: legado.bicentenario@ucb.edu.bo
**Teléfono**: (+591) 2-2782222
**Dirección**: Universidad Católica Boliviana "San Pablo"
            Av. 14 de Septiembre, Obrajes. La Paz, Bolivia.

---

## ✅ Checklist para Nuevos Desarrolladores

- [ ] Clonar el repositorio
- [ ] Ejecutar `npm install`
- [ ] Crear `.env.local` con `VITE_API_URL`
- [ ] Ejecutar `npm run dev`
- [ ] Verificar que la página carga en `http://localhost:5173`
- [ ] Hacer clic en "Unirme al proyecto" para abrir el modal
- [ ] Completar un paso del formulario
- [ ] Revisar la consola del navegador para errores
- [ ] Revisar la documentación de endpoints
- [ ] Contactar al equipo de backend para confirmar URLs de API

---

**Versión**: 1.0  
**Última Actualización**: 28 de Abril, 2025  
**Mantenedor**: Universidad Católica Boliviana "San Pablo"

# 📚 FRONTEND - DOCUMENTACIÓN EXHAUSTIVA

**Proyecto:** Orbis Seguridad - Frontend Bicentenario  
**Fecha de Análisis:** Abril 2026  
**Última Actualización:** Abril 2026

---

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura General](#arquitectura-general)
4. [Estructura de Directorios](#estructura-de-directorios)
5. [Dependencias Principales](#dependencias-principales)
6. [Sistema de Rutas](#sistema-de-rutas)
7. [Autenticación & Gestión de Estado](#autenticación--gestión-de-estado)
8. [Componentes Principales](#componentes-principales)
9. [Sección AboutUs - Componentes Especializados](#sección-aboutus---componentes-especializados)
10. [Páginas/Screens](#páginasscreens)
11. [Servicios de API](#servicios-de-api)
12. [Custom Hooks](#custom-hooks)
13. [Configuración de Estilos](#configuración-de-estilos)
14. [Utilidades & Cache System](#utilidades--cache-system)
15. [Configuraciones Externas](#configuraciones-externas)
16. [Flujos de Datos](#flujos-de-datos)
17. [Asset Management](#asset-management)

---

## 🎯 Resumen Ejecutivo

### Propósito
Frontend moderno para gestionar y visualizar:
- 🏠 **Homepage interactiva** con carrusel de empresas
- 🏢 **Catálogo de empresas** con búsqueda y filtros
- 👥 **Panel de administración** (admin only) para usuarios y empresas
- 📧 **Formulario de contacto** y registro de empresas
- 🎨 **Diseño responsive** mobile-first
- 🔐 **Autenticación JWT** con persistencia en localStorage

### Escala del Proyecto
| Métrica | Cantidad |
|---------|----------|
| **Componentes totales** | ~100+ |
| **Componentes base** | 20+ |
| **Componentes AboutUs** | 14+ |
| **Páginas/Screens** | 10+ |
| **Servicios de API** | 4 |
| **Custom Hooks** | 3 |
| **Líneas de código** | ~10,000+ |

### Stack Tecnológico Resumido
```
Framework:      React 18.0.0
Routing:        React Router v6
HTTP Client:    Axios v1.8.4
Styling:        Tailwind CSS v3 + PostCSS
Animaciones:    Framer Motion v12
Iconos:         React Icons + Lucide React
Storage:        Firebase Storage
Imágenes:       Cloudinary
UI Components:  Custom + Lucide
Build Tool:     Create React App
```

---

## 🛠 Stack Tecnológico

### Core Framework & Runtime
```
react                           ^18.0.0    # Framework UI
react-dom                       ^18.0.0    # Renderizado en DOM
react-router-dom                ^6.0.0     # Enrutamiento cliente
react-scripts                   ^5.0.0     # CRA build tool
```

### HTTP & API Communication
```
axios                           ^1.8.4     # Cliente HTTP REST
```

### Backend Integration
```
firebase                        ^11.6.0    # Storage + Analytics
@cloudinary/url-gen             ^1.21.0    # Optimización de imágenes
@cloudinary/react               ^1.14.1    # Componentes Cloudinary
```

### UI & Styling
```
tailwindcss                     ^3.4.17    # Framework CSS utility-first
@tailwindcss/postcss            ^4.1.3     # PostCSS para Tailwind v4
postcss                         ^8.5.3     # Procesador CSS
autoprefixer                    ^10.4.21   # Prefijos de navegador
framer-motion                   ^12.15.0   # Animaciones y transiciones
react-icons                     ^5.5.0     # Iconos SVG reutilizables
lucide-react                    ^0.544.0   # Librería de iconos moderna
```

### UI Components & Utilities
```
react-datepicker                ^8.3.0     # Selector de fechas
clsx                            ^2.1.1     # Combinación condicional de clases
tailwind-merge                  ^3.3.1     # Fusión inteligente de clases Tailwind
```

### Herramientas de Desarrollo
```
@types/react                    ^18.0.0    # Tipos de React (TypeScript)
@types/react-dom                ^18.0.0    # Tipos de ReactDOM
```

---

## 🏗 Arquitectura General

### Patrón Arquitectónico
```
React Component Architecture
├── Pages/Screens (Nivel de ruta)
├── Componentes (Reutilizables)
├── Servicios de API (Axios + Redux/Context)
├── Custom Hooks (Lógica compartida)
├── Configuración (Firebase, Cloudinary)
└── Utilidades (Helpers, Cache)
```

### Filosofía de Componentes
- **Separación de Concerns**: Componentes simples y reutilizables
- **Custom Hooks**: Lógica compartida sin HOCs
- **Props Drilling Mínimo**: Context cuando es necesario
- **Responsive First**: Tailwind mobile-first
- **Animaciones Sutiles**: Framer Motion para UX mejorada

### Flujo de Datos Principal
```
User Interaction (Click, Input, etc.)
        ↓
Component State (useState)
        ↓
Event Handler
        ↓
Servicio API (axios)
        ↓
Backend (https://api-rest-bicentenario-gcex.onrender.com)
        ↓
Respuesta JSON
        ↓
Update State → Component Re-render
        ↓
UI Updated
```

### Flujo de Autenticación
```
localStorage.authData → App.js detecta token
        ↓
axios.defaults.headers.common['Authorization'] = 'Bearer token'
        ↓
Rutas protegidas verifican token
        ↓
Si inválido → Logout, redirige a /
        ↓
Si válido → Acceso a panel admin (según rol)
```

---

## 📂 Estructura de Directorios

### Árbol Completo `/src`
```
Frontend/src/
│
├── index.js                         # Punto de entrada - Renderiza App
├── index.css                        # Estilos globales con @tailwind
│
├── cloudinaryConfig.js              # Configuración de Cloudinary
│
├── firebase/
│   └── firebaseConfig.js            # Inicialización Firebase
│
├── assets/                          # Recursos estáticos
│   ├── logo.png
│   ├── bolivia.svg
│   ├── bolivia.jpg
│   ├── vita.jpg
│   ├── jessica.jpg
│   ├── guido.jpg
│   ├── ovando.jpg
│   ├── futbol.jpg
│   ├── mineros.jpg
│   └── quien-contra-nosotros.jpg
│
├── fonts/                           # Fuentes tipográficas locales
│   ├── BodoniStd.otf                # Títulos
│   ├── TrajanProRegular.ttf         # Títulos alt
│   ├── RNSMiles-Light.otf           # Body text
│   └── CenturyGothic.ttf            # Fallback
│
├── components/                      # Componentes Reutilizables
│   │
│   ├── App.js                       # Componente raíz con Router
│   │
│   ├── header.jsx                   # Encabezado principal
│   ├── navbar.jsx                   # Barra de navegación
│   ├── footerBar.js                 # Pie de página
│   │
│   ├── inicioSesion.js              # Modal de login
│   ├── administrarUsuarioPanel.js   # Panel de usuarios (admin)
│   ├── panelEditorUsuarios_temp.js  # Editor usuarios (desarrollo)
│   │
│   ├── empresasPanel.js             # Panel principal de empresas
│   ├── EmpresasPanelWrapper.js      # Contenedor de empresas
│   ├── empresaPanelNuevo.js         # Panel crear empresa
│   ├── empresaCard.js               # Tarjeta individual
│   ├── empresaLista.js              # Lista de empresas
│   ├── empresaBuscador.js            # Buscador/filtro
│   ├── empresaModal.js              # Modal de empresa
│   ├── panelEditorEmpresas.js       # Editor de empresas (admin)
│   ├── fichaExpandida.js            # Vista expandida lectura
│   ├── fichaExpandidaEditable.jsx   # Vista expandida editable
│   │
│   ├── videoPanel.js                # Reproductor de videos
│   ├── barraHorizontal.js           # Barra decorativa
│   ├── contenedorLateral.js         # Contenedor lateral
│   ├── contenedorImagenes.js        # Gestor de imágenes
│   ├── carruselImagenes.js          # Carrusel/slider
│   ├── imagenInteractiva.js         # Imagen con efectos
│   ├── logoInteractivo.js           # Logo animado
│   ├── mapaBolivia.js               # Mapa interactivo
│   │
│   ├── LoadingSpinner.js            # Spinner de carga
│   ├── InlineSpinner.js             # Spinner inline
│   ├── informacionDepartamento.js   # Info de departamentos
│   │
│   ├── AboutUs/                     # Componentes de Acerca de Nosotros
│   │   ├── AboutUsContainer.jsx     # Contenedor principal
│   │   ├── AnimatedSection.jsx      # Sección con animaciones
│   │   ├── Button.jsx               # Botón reutilizable
│   │   ├── CardFlip.jsx             # Tarjeta con flip
│   │   ├── Carousel.jsx             # Carrusel de testimonios
│   │   ├── ImageSection.jsx         # Sección de imágenes
│   │   ├── MisionSection.jsx        # Sección Misión
│   │   ├── MobileTopNav.jsx         # Nav móvil superior
│   │   ├── NosotrosSection.jsx      # Sección Nosotros
│   │   ├── ObjetivoSection.jsx      # Sección Objetivos
│   │   ├── PersonalSection.jsx      # Sección Personal
│   │   ├── Reveal.jsx               # Componente Reveal
│   │   ├── SideNav.jsx              # Nav lateral (desktop)
│   │   ├── TestimonialCard.jsx      # Tarjeta de testimonio
│   │   ├── Timeline.jsx             # Línea de tiempo
│   │   └── [más componentes...]
│   │
│   ├── hooks/                       # Custom Hooks
│   │   ├── use-toast.jsx            # Sistema de notificaciones
│   │   ├── use-mobile.jsx           # Detección de móvil
│   │   └── use-in-view.js           # Intersection Observer
│   │
│   ├── lib/                         # Utilidades de librerías
│   │   └── utils.js                 # Función cn() para clases
│   │
│   └── utils/                       # Utilidades de componentes
│       └── cacheUtils.js            # Gestor de cache en memoria
│
├── screens/                         # Páginas/Pantallas Principales
│   ├── homePage.js                  # Página principal
│   ├── empresasPage.js              # Catálogo de empresas
│   ├── contactoPage.js              # Página de contacto
│   ├── historiaPage.js              # Historia/Nosotros
│   ├── equipoPage.js                # Página del equipo
│   ├── editorEmpresasPage.js        # Editor empresas (admin)
│   ├── editorUsuariosPage.js        # Editor usuarios (admin)
│   ├── registroEmpresaPage.js       # Registro nueva empresa
│   ├── revistaPage.jsx              # Revista (comentada)
│   └── revistaPage.css              # Estilos revista
│
├── services/                        # Servicios de API
│   ├── api.js                       # Configuración Axios base
│   ├── authService.js               # Autenticación JWT
│   ├── empresaService.js            # Gestión de empresas
│   └── usuarioService.js            # Gestión de usuarios
│
└── public/                          # Archivos estáticos (servidos)
    ├── index.html                   # HTML base
    ├── icons/
    │   └── [iconos estáticos]
    └── media/
        ├── busqueda/
        ├── contactoPage/
        ├── empresasPage/
        ├── equipoPage/
        ├── footer/
        ├── header/
        ├── historiapage/
        ├── homePage/
        └── revista/
```

### Resumen de Estructura
| Carpeta | Propósito |
|---------|-----------|
| `/components` | Componentes reutilizables (20+ base + 14 AboutUs) |
| `/components/AboutUs` | Componentes especializados para sección "Acerca de" |
| `/components/hooks` | Custom Hooks (toast, mobile detection, scroll) |
| `/screens` | Páginas principales de la aplicación |
| `/services` | Servicios de API y comunicación con backend |
| `/assets` | Imágenes y recursos estáticos |
| `/fonts` | Fuentes tipográficas locales |
| `/firebase` | Configuración de Firebase |
| `cloudinaryConfig.js` | Configuración de Cloudinary |
| `index.css` | Estilos globales |

---

## 📦 Dependencias Principales

### Versiones Instaladas (package.json)
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.8.4",
    "firebase": "^11.6.0",
    "@cloudinary/url-gen": "^1.21.0",
    "@cloudinary/react": "^1.14.1",
    "framer-motion": "^12.15.0",
    "react-icons": "^5.5.0",
    "lucide-react": "^0.544.0",
    "react-datepicker": "^8.3.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17",
    "@tailwindcss/postcss": "^4.1.3",
    "postcss": "^8.5.3",
    "autoprefixer": "^10.4.21"
  }
}
```

### Agrupación por Funcionalidad
| Categoría | Paquetes | Función |
|-----------|----------|---------|
| **React Core** | react, react-dom, react-scripts | Framework y renderizado |
| **Routing** | react-router-dom | Navegación SPA |
| **HTTP** | axios | Llamadas a API |
| **Backend** | firebase, @cloudinary/* | Storage e imágenes |
| **Styling** | tailwindcss, postcss, autoprefixer | Estilos CSS |
| **Animaciones** | framer-motion | Transiciones y efectos |
| **Iconos** | react-icons, lucide-react | Librerías de iconos |
| **UI Helpers** | react-datepicker, clsx, tailwind-merge | Componentes y utilidades |

### Scripts Disponibles
```json
{
  "start": "react-scripts start",       // Desarrollo: localhost:3000
  "build": "react-scripts build",       // Build producción en /build
  "test": "react-scripts test",         // Tests con Jest
  "eject": "react-scripts eject"        // Expone configuración (irreversible)
}
```

---

## 🗺 Sistema de Rutas

### Árbol de Rutas (React Router v6)

```
Raíz: / (App.js)
│
├── / (HomePage)
│   └── Página principal con video hero, carrusel, paneles
│
├── /empresas (EmpresasPage)
│   └── Catálogo completo de empresas, búsqueda, filtros
│
├── /empresa/:id
│   └── Detalle de empresa individual (público/privado)
│
├── /historia (HistoriaPage)
│   └── Sección "Acerca de Nosotros" - Historia de la organización
│
├── /equipo (EquipoPage)
│   └── Presentación del equipo de trabajo
│
├── /contacto (ContactoPage)
│   └── Formulario de contacto e información
│
├── /registro-empresa (RegistroEmpresaPage)
│   └── Formulario de registro de nueva empresa
│
├── /editor-empresas (EditorEmpresasPage) [ADMIN ONLY]
│   └── Panel para editar empresas (Requiere rol 1 o 2)
│
├── /editor-usuarios (EditorUsuariosPage) [ADMIN ONLY]
│   └── Panel para editar usuarios (Requiere rol 1 o 2)
│
├── /panel-usuarios (PanelEditorUsuarios) [ADMIN ONLY]
│   └── Panel antiguo de usuarios (desarrollo)
│
└── /revistaPage (RevistaPage) [COMENTADA]
    └── Página de revista (deshabilitada temporalmente)
```

### Tabla de Rutas
| Ruta | Componente | Tipo | Acceso | Propósito |
|------|-----------|------|--------|----------|
| `/` | HomePage | Pública | Todos | Página principal |
| `/empresas` | EmpresasPage | Pública | Todos | Catálogo de empresas |
| `/historia` | HistoriaPage | Pública | Todos | Historia/Nosotros |
| `/equipo` | EquipoPage | Pública | Todos | Equipo de trabajo |
| `/contacto` | ContactoPage | Pública | Todos | Contacto |
| `/registro-empresa` | RegistroEmpresaPage | Pública | Todos | Registro empresa |
| `/editor-empresas` | EditorEmpresasPage | **Privada** | Admin (roles 1,2) | Editor de empresas |
| `/editor-usuarios` | EditorUsuariosPage | **Privada** | Admin (roles 1,2) | Editor de usuarios |
| `/panel-usuarios` | PanelEditorUsuarios | **Privada** | Admin (roles 1,2) | Panel usuarios (legacy) |

### Control de Acceso por Rol
```javascript
// En App.js
const rolesAdmin = [1, 2];  // SUPERADMIN y ADMIN

if (rolesAdmin.includes(user.id_rol)) {
  // Usuario puede acceder a:
  // - /editor-empresas
  // - /editor-usuarios
  // - /panel-usuarios
} else {
  // Usuario solo puede acceder a rutas públicas
}
```

---

## 🔐 Autenticación & Gestión de Estado

### Flujo de Autenticación Completo

```
┌──────────────────────────────────────────┐
│ 1. Usuario ingresa credenciales           │
│    inicioSesion.js → Modal de login      │
│    Input: usuario, contraseña             │
└────────────┬─────────────────────────────┘
             │
┌────────────▼─────────────────────────────┐
│ 2. Llama authService.login()              │
│    axios.post('/api/auth/login', data)   │
└────────────┬─────────────────────────────┘
             │
┌────────────▼─────────────────────────────┐
│ 3. Backend retorna JWT Token              │
│    Response: {                            │
│      token: "eyJhbGc...",                │
│      usuario: "admin",                    │
│      id_rol: 2                            │
│    }                                      │
└────────────┬─────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────┐
│ 4. authService decodifica JWT                        │
│    const decoded = jwtDecode(token)                   │
│    Extrae: { id_usuario, usuario, id_rol }           │
└────────────┬──────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│ 5. Establece JWT en header de Axios                   │
│    axios.defaults.headers.common['Authorization']     │
│    = `Bearer ${token}`                                │
└────────────┬──────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│ 6. Guarda authData en localStorage                    │
│    localStorage.setItem('authData', JSON.stringify({  │
│      user: { id_usuario, usuario, id_rol },          │
│      token                                            │
│    }))                                                │
└────────────┬──────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│ 7. Actualiza estado en App.js                         │
│    setAuthState({                                     │
│      user: { id_usuario, usuario, id_rol },          │
│      token                                            │
│    })                                                 │
└────────────┬──────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│ 8. Redirige a página anterior o homepage              │
│    navigate(-1) o navigate('/')                       │
│                                                        │
│    UI actualiza:                                      │
│    - Header muestra nombre de usuario                 │
│    - Botón logout aparece                            │
│    - Links admin visibles (si rol 1 o 2)             │
└──────────────────────────────────────────────────────┘
```

### Persistencia de Sesión (App.js)

```javascript
// Al montar App.js:
useEffect(() => {
  const authData = localStorage.getItem('authData');
  
  if (authData) {
    try {
      const { user, token } = JSON.parse(authData);
      
      // Restaura JWT en axios headers
      setAuthToken(token);
      
      // Actualiza estado
      setAuthState({ user, token });
    } catch (error) {
      // Token corrupto o expirado
      localStorage.removeItem('authData');
      clearAuthToken();
    }
  }
}, []);
```

### Logout - Limpieza de Sesión

```javascript
// En cualquier componente:
const handleLogout = async () => {
  // 1. Llama logout service
  await authService.logout();
  
  // 2. Limpia localStorage
  localStorage.removeItem('authData');
  
  // 3. Limpia axios headers
  clearAuthToken();
  
  // 4. Limpia estado
  setAuthState({ user: null, token: null });
  
  // 5. Redirige a home
  navigate('/');
};
```

### Estructura de Estado de Autenticación

```javascript
// En App.js
const [authState, setAuthState] = useState({
  user: {
    id_usuario: null,    // ID único del usuario
    usuario: null,       // Nombre de usuario
    id_rol: null         // Rol: 1=SUPERADMIN, 2=ADMIN, 3=INVESTIGADOR, 4=TEMPORAL, 5=VISITANTE
  },
  token: null            // JWT token
});

// Props pasadas a componentes
<Header user={authState.user} token={authState.token} />
<main>
  <Routes>
    {authState.user?.id_rol && [1, 2].includes(authState.user.id_rol) && (
      <Route path="/editor-empresas" element={<EditorEmpresasPage />} />
    )}
  </Routes>
</main>
```

---

## 🎨 Componentes Principales

### Componentes de Layout Global

| Componente | Archivo | Propósito |
|-----------|---------|-----------|
| **App** | `App.js` | Raíz con Router, gestión de autenticación, state provider |
| **Header** | `header.jsx` | Encabezado principal, logo, navegación, login/logout |
| **Navbar** | `navbar.jsx` | Barra de navegación con links según rol |
| **FooterBar** | `footerBar.js` | Pie de página, contacto, enlaces |

### App.js - Arquitectura Central
```javascript
export default function App() {
  const [authState, setAuthState] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  // Restaura sesión de localStorage
  useEffect(() => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const { user, token } = JSON.parse(authData);
      setAuthToken(token);
      setAuthState({ user, token });
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Header user={authState.user} onLogout={handleLogout} />
      <Navbar user={authState.user} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/equipo" element={<EquipoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        
        {/* Rutas protegidas - solo admin */}
        {authState.user?.id_rol && [1, 2].includes(authState.user.id_rol) && (
          <>
            <Route path="/editor-empresas" element={<EditorEmpresasPage />} />
            <Route path="/editor-usuarios" element={<EditorUsuariosPage />} />
          </>
        )}
      </Routes>
      
      <FooterBar />
    </BrowserRouter>
  );
}
```

### Componentes de Empresas

| Componente | Propósito |
|-----------|-----------|
| **EmpresasPanelWrapper** | Contenedor padre que gestiona estado de empresas |
| **empresasPanel.js** | Panel principal con lista/grid |
| **empresaCard.js** | Tarjeta individual de empresa |
| **empresaBuscador.js** | Buscador y filtros (por rubro, tamaño, etc.) |
| **empresaModal.js** | Modal popup para ver detalles |
| **fichaExpandida.js** | Vista expandida completa (lectura) |
| **fichaExpandidaEditable.jsx** | Vista expandida con campos editables |
| **empresaPanelNuevo.js** | Formulario para crear empresa |
| **panelEditorEmpresas.js** | Editor CRUD empresas (admin) |

### Componentes de UI Comunes

| Componente | Propósito |
|-----------|-----------|
| **LoadingSpinner.js** | Spinner de carga animado |
| **InlineSpinner.js** | Spinner pequeño inline |
| **videoPanel.js** | Contenedor para videos |
| **barraHorizontal.js** | Barra decorativa horizontal |
| **carruselImagenes.js** | Carrusel de imágenes con navegación |
| **imagenInteractiva.js** | Imagen con efectos hover |
| **logoInteractivo.js** | Logo animado |
| **mapaBolivia.js** | Mapa SVG interactivo |
| **contenedorImagenes.js** | Gestor de múltiples imágenes |
| **contenedorLateral.js** | Contenedor lateral responsive |

### Componentes de Autenticación & Admin

| Componente | Propósito |
|-----------|-----------|
| **inicioSesion.js** | Modal/formulario de login |
| **administrarUsuarioPanel.js** | Panel de gestión de usuarios |
| **panelEditorUsuarios_temp.js** | Editor de usuarios (desarrollo) |

---

## 🎪 Sección AboutUs - Componentes Especializados

### Árbol de Componentes AboutUs
```
AboutUs/
├── AboutUsContainer.jsx          # Contenedor principal
├── AnimatedSection.jsx           # Sección con entrada animada
├── Button.jsx                    # Botón reutilizable
├── CardFlip.jsx                  # Tarjeta con efecto flip
├── Carousel.jsx                  # Carrusel de testimonios
├── ImageSection.jsx              # Sección con imágenes responsive
├── MisionSection.jsx             # Sección dedicada a Misión
├── MobileTopNav.jsx              # Navegación superior móvil
├── NosotrosSection.jsx           # Sección "Nosotros"
├── ObjetivoSection.jsx           # Sección de Objetivos
├── PersonalSection.jsx           # Sección de Personal/Equipo
├── Reveal.jsx                    # Componente Reveal (animación)
├── SideNav.jsx                   # Navegación lateral (desktop)
├── TestimonialCard.jsx           # Tarjeta de testimonio
├── Timeline.jsx                  # Línea de tiempo de historia
└── [más componentes especializados...]
```

### Componentes AboutUs Detallados

| Componente | Props | Propósito |
|-----------|-------|-----------|
| **AboutUsContainer** | — | Orquesta todos los componentes AboutUs |
| **AnimatedSection** | title, children, delay | Sección con animación de entrada Framer Motion |
| **Button** | text, onClick, className | Botón reutilizable personalizado |
| **CardFlip** | front, back, onClick | Tarjeta que gira al pasar cursor |
| **Carousel** | items, autoPlay, interval | Carrusel automático de items |
| **ImageSection** | image, title, description | Sección con imagen responsive |
| **MisionSection** | mision | Panel dedicado a la Misión |
| **MobileTopNav** | items | Navegación superior optimizada para móvil |
| **NosotrosSection** | content | Sección principal "Nosotros" |
| **ObjetivoSection** | objetivos | Lista de objetivos |
| **PersonalSection** | personas | Grid de personas con foto y bio |
| **Reveal** | children, delay | Componente que se revela en viewport |
| **SideNav** | sections, active | Navegación lateral sticky |
| **TestimonialCard** | nombre, cargo, texto, imagen | Tarjeta de testimonio |
| **Timeline** | eventos | Línea de tiempo horizontal/vertical |

### Uso en HistoriaPage
```javascript
// src/screens/historiaPage.js
export default function HistoriaPage() {
  return (
    <div>
      <MobileTopNav items={navItems} />
      <SideNav sections={sections} />
      
      <AboutUsContainer>
        <NosotrosSection content={nosotrosText} />
        <MisionSection mision={misionText} />
        <ObjetivoSection objetivos={objetivos} />
        <Timeline eventos={historiaEventos} />
        <PersonalSection personas={equipo} />
        <Carousel items={testimonios} />
      </AboutUsContainer>
    </div>
  );
}
```

---

## 📱 Páginas/Screens

### HomePage - Página Principal
**Archivo:** `src/screens/homePage.js`

**Contenido:**
- Video hero (video.webm)
- Carrusel de empresas destacadas
- Panel de estadísticas (última actualización, total empresas, etc.)
- Sección "¿Quiénes Somos?"
- CTA (Call To Action) para registro de empresas

**Componentes Utilizados:**
```javascript
<header>
  <VideoPanel video="public/media/homePage/video.webm" />
  <h1>Bienvenido a Orbis Seguridad</h1>
</header>

<CarruselImagenes empresas={empresasDestacadas} />

<section>
  <h2>Últimas Empresas Registradas</h2>
  <EmpresaCard key={e.id} empresa={e} />
</section>

<section className="stats">
  <StatBox label="Total Empresas" value={countEmpresas} />
  <StatBox label="Sedes" value={countSedes} />
</section>
```

### EmpresasPage - Catálogo de Empresas
**Archivo:** `src/screens/empresasPage.js`

**Funcionalidades:**
- Grid/lista de todas las empresas
- Búsqueda por nombre
- Filtros por: rubro, tamaño, municipio
- Paginación
- Modal/detalle de empresa al click

**Componentes Utilizados:**
```javascript
<div className="container">
  <empresaBuscador 
    onSearch={handleSearch}
    onFilterChange={handleFilter}
  />
  
  <div className="grid">
    {empresas.map(e => (
      <empresaCard 
        key={e.id_empresa}
        empresa={e}
        onClick={() => setSelectedEmpresa(e)}
      />
    ))}
  </div>
  
  {selectedEmpresa && (
    <empresaModal
      empresa={selectedEmpresa}
      onClose={() => setSelectedEmpresa(null)}
    />
  )}
</div>
```

### HistoriaPage - Historia / Acerca de Nosotros
**Archivo:** `src/screens/historiaPage.js`

**Contenido:**
- Sección "Nosotros" con historia de organización
- Misión y Visión
- Objetivos
- Línea de tiempo
- Equipo de trabajo
- Testimonios

**Componentes Utilizados:**
```javascript
<AboutUsContainer>
  <NosotrosSection />
  <MisionSection />
  <ObjetivoSection />
  <Timeline />
  <PersonalSection />
  <Carousel items={testimonios} />
</AboutUsContainer>
```

### EquipoPage - Equipo de Trabajo
**Archivo:** `src/screens/equipoPage.js`

**Contenido:**
- Fotos y bios del equipo
- Roles y responsabilidades
- Redes sociales

**Estructura:**
```javascript
<div className="team-grid">
  {equipo.map(persona => (
    <CardFlip
      key={persona.id}
      front={<img src={persona.foto} />}
      back={<BioInfo nombre={persona.nombre} bio={persona.bio} />}
    />
  ))}
</div>
```

### ContactoPage - Página de Contacto
**Archivo:** `src/screens/contactoPage.js`

**Contenido:**
- Formulario de contacto (nombre, correo, asunto, mensaje)
- Información de ubicación
- Datos de contacto (teléfono, email)
- Mapa

**Formulario:**
```javascript
<form onSubmit={handleSubmit}>
  <input name="nombre" placeholder="Tu nombre" required />
  <input name="correo" type="email" placeholder="Tu correo" required />
  <input name="asunto" placeholder="Asunto" required />
  <textarea name="mensaje" placeholder="Tu mensaje" required />
  <button type="submit">Enviar</button>
</form>
```

⚠️ **Nota del Proyecto:** La página de Dashboard (`dashboardPage.jsx`) ha sido **omitida deliberadamente de esta versión de la documentación** para enfocarse en funcionalidades core. El código completo se encuentra en `src/screens/dashboardPage.jsx` en el repositorio.

### EditorEmpresasPage - Panel de Edición de Empresas (ADMIN)
**Archivo:** `src/screens/editorEmpresasPage.js`

**Funcionalidades:**
- CRUD completo de empresas
- Crear empresa nueva
- Editar empresa existente
- Eliminar empresa
- Administrar relaciones (fundadores, servicios, etc.)

**Componentes Utilizados:**
```javascript
<panelEditorEmpresas
  empresas={empresas}
  onCreateEmpresa={handleCreate}
  onUpdateEmpresa={handleUpdate}
  onDeleteEmpresa={handleDelete}
/>
```

### EditorUsuariosPage - Panel de Edición de Usuarios (ADMIN)
**Archivo:** `src/screens/editorUsuariosPage.js`

**Funcionalidades:**
- CRUD de usuarios
- Crear usuario
- Editar usuario
- Eliminar usuario
- Cambiar roles

**Componentes Utilizados:**
```javascript
<administrarUsuarioPanel
  usuarios={usuarios}
  onCreateUsuario={handleCreate}
  onUpdateUsuario={handleUpdate}
  onDeleteUsuario={handleDelete}
/>
```

### RegistroEmpresaPage - Registro de Nueva Empresa
**Archivo:** `src/screens/registroEmpresaPage.js`

**Funcionalidades:**
- Formulario multi-step para registro
- Validación de campos
- Subida de imágenes
- Selección de servicios, rubros, sedes
- Confirmación y envío

---

## 🔌 Servicios de API

### api.js - Configuración de Axios Base

**Archivo:** `src/services/api.js`

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://api-rest-bicentenario-gcex.onrender.com';

// Crear instancia Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar JWT en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export default api;
```

### authService.js - Servicio de Autenticación

**Archivo:** `src/services/authService.js`

```javascript
import api from './api';
import { jwtDecode } from 'jwt-decode';

class AuthService {
  // Login
  async login(usuario, contrasenia) {
    try {
      const response = await api.post('/api/auth/login', {
        usuario,
        contrasenia
      });
      
      const { token } = response.data;
      const decoded = jwtDecode(token);
      
      return {
        token,
        user: {
          id_usuario: decoded.id,
          usuario: decoded.usuario,
          id_rol: decoded.rol
        }
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en login');
    }
  }

  // Register
  async register(usuario, correo, contrasenia, id_rol = 5) {
    try {
      const response = await api.post('/api/auth/register', {
        usuario,
        correo,
        contrasenia,
        id_rol
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en registro');
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('authData');
    delete api.defaults.headers.common['Authorization'];
  }
}

export default new AuthService();
```

### empresaService.js - Servicio de Empresas

**Archivo:** `src/services/empresaService.js`

```javascript
import api from './api';

class EmpresaService {
  // Obtener todas las empresas (público)
  async getEmpresas(skip = 0, take = 10) {
    try {
      const response = await api.get('/api/empresas/cards/public', {
        params: { skip, take }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching empresas:', error);
      throw error;
    }
  }

  // Obtener empresa por ID
  async getEmpresaById(id) {
    try {
      const response = await api.get(`/api/empresas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching empresa:', error);
      throw error;
    }
  }

  // Buscar empresas con filtros
  async buscarEmpresas(filtros) {
    try {
      const response = await api.get('/api/empresas', { params: filtros });
      return response.data;
    } catch (error) {
      console.error('Error searching empresas:', error);
      throw error;
    }
  }

  // Crear empresa (requiere autenticación)
  async crearEmpresa(data) {
    try {
      const response = await api.post('/api/empresas', data);
      return response.data;
    } catch (error) {
      console.error('Error creating empresa:', error);
      throw error;
    }
  }

  // Actualizar empresa
  async actualizarEmpresa(id, data) {
    try {
      const response = await api.patch(`/api/empresas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating empresa:', error);
      throw error;
    }
  }

  // Eliminar empresa
  async eliminarEmpresa(id) {
    try {
      await api.delete(`/api/empresas/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting empresa:', error);
      throw error;
    }
  }

  // Helpers específicos
  pickFirstImage(empresa) {
    return empresa.imagenes?.[0]?.url || '/default-empresa.png';
  }

  isValidImage(url) {
    return url && (url.startsWith('http') || url.startsWith('/'));
  }

  normalizeRubro(rubro) {
    return rubro?.nombre || 'Sin categoría';
  }
}

export default new EmpresaService();
```

### usuarioService.js - Servicio de Usuarios

**Archivo:** `src/services/usuarioService.js`

```javascript
import api from './api';

class UsuarioService {
  // Obtener todos los usuarios (admin)
  async getUsuarios() {
    try {
      const response = await api.get('/api/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      throw error;
    }
  }

  // Obtener usuario por ID
  async getUsuarioById(id) {
    try {
      const response = await api.get(`/api/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching usuario:', error);
      throw error;
    }
  }

  // Crear usuario
  async createUsuario(data) {
    try {
      const response = await api.post('/api/usuarios', data);
      return response.data;
    } catch (error) {
      console.error('Error creating usuario:', error);
      throw error;
    }
  }

  // Actualizar usuario
  async updateUsuario(id, data) {
    try {
      const response = await api.patch(`/api/usuarios/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating usuario:', error);
      throw error;
    }
  }

  // Eliminar usuario
  async deleteUsuario(id) {
    try {
      await api.delete(`/api/usuarios/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting usuario:', error);
      throw error;
    }
  }
}

export default new UsuarioService();
```

---

## 🪝 Custom Hooks

### use-toast.jsx - Sistema de Notificaciones

**Archivo:** `src/components/hooks/use-toast.jsx`

```javascript
import { useReducer, useCallback } from 'react';

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), ...action.payload }];
    case 'REMOVE':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

export function useToast() {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    dispatch({
      type: 'ADD',
      payload: { id, message, type }
    });

    if (duration > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE', id });
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  return { toasts, addToast, removeToast };
}
```

**Uso:**
```javascript
const { toasts, addToast } = useToast();

// Mostrar notificación exitosa
addToast('Empresa guardada correctamente', 'success', 3000);

// Mostrar error
addToast('Error al guardar empresa', 'error', 5000);

// Notificación persistente
addToast('Operación en progreso...', 'info', 0);
```

### use-mobile.jsx - Detección de Dispositivo Móvil

**Archivo:** `src/components/hooks/use-mobile.jsx`

```javascript
import { useEffect, useState } from 'react';

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
}
```

**Uso:**
```javascript
const isMobile = useMobile();

return (
  <div>
    {isMobile ? (
      <MobileLayout />
    ) : (
      <DesktopLayout />
    )}
  </div>
);
```

### use-in-view.js - IntersectionObserver para Scroll

**Archivo:** `src/components/hooks/use-in-view.js`

```javascript
import { useRef, useEffect, useState } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
```

**Uso:**
```javascript
const [ref, isInView] = useInView();

return (
  <motion.div
    ref={ref}
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
  >
    Contenido que aparece al scroll
  </motion.div>
);
```

---

## 🎨 Configuración de Estilos

### Tailwind CSS - Configuración Personalizada

**Archivo:** `tailwind.config.js`

```javascript
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FEFCFB',        // Casi blanco
        surface: '#F5F3F0',           // Beige sutil
        'surface-elevated': '#FFFFFF', // Blanco puro
        primary: '#0f2c4a',           // Azul marino oscuro
        'vibrant-blue': '#2563eb',    // Azul vibrante
        accent: '#F29E38',            // Naranja vibrante
        'text-main': '#464E59',       // Gris azulado oscuro
        'text-muted': '#9298A6',      // Gris azulado medio
        stroke: '#BFAEA4',            // Beige medio
        detail: '#D9CBBF'             // Beige claro
      },
      fontFamily: {
        bodoni: ["'Bodoni Std'", "'Bodoni'", 'serif'],
        miles: ["'Miles Light'", 'sans-serif'],
        playfair: ["'Playfair Display'", 'serif']
      }
    }
  },
  plugins: []
};
```

### Paleta de Colores
| Nombre | Hex | Uso |
|--------|-----|-----|
| background | #FEFCFB | Fondo general |
| surface | #F5F3F0 | Superficie secundaria |
| surface-elevated | #FFFFFF | Tarjetas, modales |
| primary | #0f2c4a | Botones principales, links |
| vibrant-blue | #2563eb | Acentos azules |
| accent | #F29E38 | CTA, highlights |
| text-main | #464E59 | Texto principal |
| text-muted | #9298A6 | Texto secundario |
| stroke | #BFAEA4 | Bordes, separadores |
| detail | #D9CBBF | Detalles sutiles |

### Fuentes Personalizadas

**Archivo:** `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

@font-face {
  font-family: 'Bodoni Std';
  src: url('/fonts/BodoniStd.otf') format('opentype');
}

@font-face {
  font-family: 'Miles Light';
  src: url('/fonts/RNSMiles-Light.otf') format('opentype');
}

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Estilos base personalizados */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    @apply font-bodoni font-bold;
  }

  body {
    @apply font-miles text-text-main;
  }
}
```

### PostCSS - Configuración

**Archivo:** `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

---

## 🛠 Utilidades & Cache System

### utils.js - Combinador de Clases CSS

**Archivo:** `src/components/lib/utils.js`

```javascript
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina múltiples clases CSS
 * Resuelve conflictos de Tailwind correctamente
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Uso:
const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-primary text-white',
  !isActive && 'bg-gray-200 text-gray-800',
  className // props className
);
```

### cacheUtils.js - Gestor de Cache en Memoria

**Archivo:** `src/components/utils/cacheUtils.js`

```javascript
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  /**
   * Establece un valor en cache
   */
  set(key, value, ttl = 60000) { // 60 segundos por defecto
    this.cache.set(key, value);
    this.timestamps.set(key, Date.now() + ttl);
  }

  /**
   * Obtiene un valor del cache
   * Retorna null si expiró
   */
  get(key) {
    const timestamp = this.timestamps.get(key);
    
    if (!timestamp || Date.now() > timestamp) {
      this.cache.delete(key);
      this.timestamps.delete(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  /**
   * Elimina un valor del cache
   */
  remove(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  /**
   * Limpia todo el cache
   */
  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  /**
   * Debug: muestra contenido del cache
   */
  debug() {
    console.log('Cache contents:', this.cache);
    console.log('Timestamps:', this.timestamps);
  }
}

export const cacheManager = new CacheManager();
```

**Uso:**
```javascript
// Guardar datos en cache
cacheManager.set('empresas-list', empresas, 300000); // 5 minutos

// Recuperar del cache
const cached = cacheManager.get('empresas-list');
if (cached) {
  setEmpresas(cached);
} else {
  // Fetch from API
}

// Limpiar cache
cacheManager.remove('empresas-list');
```

---

## ⚙️ Configuraciones Externas

### Firebase - Configuración

**Archivo:** `src/firebase/firebaseConfig.js`

```javascript
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCtUHNWLoon8Jnr9VBmAcAsOmI3f2rLsCg',
  authDomain: 'imagenesbicentenario-1f800.firebaseapp.com',
  projectId: 'imagenesbicentenario-1f800',
  storageBucket: 'imagenesbicentenario-1f800.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
```

**Funcionalidades:**
- ✅ Firebase Storage - Almacenamiento de imágenes
- ✅ Firebase Analytics - Tracking de eventos (opcional)
- ❌ Firebase Auth - No se usa (JWT del backend)

**Uso para Subida de Imágenes:**
```javascript
import { storage } from './firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function uploadImage(file) {
  const storageRef = ref(storage, `empresas/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
```

### Cloudinary - Configuración

**Archivo:** `src/cloudinaryConfig.js`

```javascript
export const CLOUDINARY_CLOUD_NAME = 'diswqpy8v';

/**
 * Genera URL optimizada de Cloudinary
 * Transforma y sirve imágenes responsivas
 */
export function getCloudinaryUrl(publicId, options = {}) {
  const {
    width = 500,
    height = 500,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
}
```

**Funcionalidades:**
- ✅ Optimización de imágenes (webp, compression)
- ✅ Responsive images (diferentes tamaños)
- ✅ CDN global para servir imágenes rápido
- ✅ Transformaciones (resize, crop, quality)

**Uso:**
```javascript
import { CldImage } from '@cloudinary/react';

<CldImage
  src="empresas/empresa-123"
  width={500}
  height={500}
  crop="fill"
  quality="auto"
  format="auto"
/>
```

---

## 🔄 Flujos de Datos

### Flujo 1: Obtener Empresas (Lectura Pública)

```
┌──────────────────────────────────────┐
│ 1. Usuario navega a /empresas         │
│    EmpresasPage monta                 │
└────────────┬─────────────────────────┘
             │
┌────────────▼─────────────────────────────────────┐
│ 2. useEffect dispara getEmpresas()                │
│    empresaService.getEmpresas(0, 10)             │
└────────────┬─────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────┐
│ 3. Axios GET /api/empresas/cards/public           │
│    Response: {                                   │
│      data: [EmpresaCard[], ...],                │
│      total: 234,                                │
│      page: 1,                                   │
│      pageSize: 10                               │
│    }                                            │
└────────────┬─────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────┐
│ 4. setEmpresas(response.data)                    │
│    Estado se actualiza                          │
└────────────┬─────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────┐
│ 5. Componente re-renderiza                       │
│    {empresas.map(e => <empresaCard key={e.id} />)}
│                                                 │
│    UI muestra:                                   │
│    - Grid de tarjetas de empresas                │
│    - Información: nombre, imagen, descripción   │
│    - Botones: Ver más, Contactar                │
└──────────────────────────────────────────────────┘
```

### Flujo 2: Búsqueda y Filtrado de Empresas

```
┌─────────────────────────────────────────┐
│ 1. Usuario escribe en buscador o filtra  │
│    empresaBuscador onChange                │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│ 2. handleSearch / handleFilterChange         │
│    Actualiza estado: { busqueda, filtros }  │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│ 3. Dispara búsqueda:                        │
│    empresaService.buscarEmpresas({          │
│      nombre: busqueda,                      │
│      rubro: filtros.rubro,                  │
│      tamanio: filtros.tamanio,              │
│      municipio: filtros.municipio           │
│    })                                       │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│ 4. GET /api/empresas?nombre=x&rubro=y       │
│    Backend filtra y retorna resultados     │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│ 5. setEmpresas(resultados)                  │
│    UI actualiza con empresas filtradas     │
│                                            │
│    Muestra:                                 │
│    - Número de resultados encontrados       │
│    - Tarjetas filtradas                     │
│    - Opción para limpiar filtros            │
└────────────────────────────────────────────┘
```

### Flujo 3: Login y Autenticación

```
┌────────────────────────────────────────┐
│ 1. Usuario hace click en botón Login    │
│    Modal inicioSesion aparece           │
└────────────┬─────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│ 2. Usuario ingresa credenciales y envía         │
│    handleLogin(usuario, contrasenia)            │
│    Llama: authService.login()                   │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│ 3. POST /api/auth/login                         │
│    Response:                                    │
│    {                                            │
│      token: "eyJhbGc...",                      │
│      usuario: "admin",                          │
│      id_rol: 2                                  │
│    }                                            │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│ 4. authService:                                 │
│    1. Decodifica JWT                            │
│    2. Extrae: { id_usuario, usuario, id_rol }  │
│    3. Retorna decoded data                      │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│ 5. En App.js:                                   │
│    1. setAuthToken(token)                       │
│       → Axios header Authorization: Bearer ... │
│    2. setAuthState({ user, token })             │
│    3. localStorage.setItem('authData', ...)     │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│ 6. UI actualiza:                                │
│    - Header muestra nombre: "Bienvenido admin"  │
│    - Botón Login → Botón Logout                 │
│    - Si rol 1 o 2: muestra links admin          │
│    - Modal cierra                               │
│                                                │
│    navigate(-1) → Retorna a página anterior     │
└────────────────────────────────────────────────┘
```

### Flujo 4: Crear Nueva Empresa (Admin)

```
┌──────────────────────────────────────────┐
│ 1. Admin navega a /registro-empresa       │
│    Formulario multi-step abre             │
└────────────┬─────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│ 2. Step 1: Información Básica            │
│    - Nombre comercial                    │
│    - Fecha fundación                     │
│    - Visión, misión                      │
│    - Actividad                           │
│    - Tamaño de empresa                   │
│    → onClick "Siguiente"                 │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│ 3. Step 2: Ubicaciones (Sedes)           │
│    - Departamentos donde opera           │
│    - Dirección de cada sede              │
│    - Si es central o no                  │
│    → onClick "Siguiente"                 │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│ 4. Step 3: Servicios y Rubros            │
│    - Selecciona servicios                │
│    - Selecciona rubros/sectores          │
│    - Tipo societario                     │
│    → onClick "Siguiente"                 │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│ 5. Step 4: Imágenes y Galería            │
│    - Subir imagen principal              │
│    - Galería (múltiples imágenes)        │
│    - Procesa uploads a Firebase          │
│    → onClick "Siguiente"                 │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│ 6. Step 5: Información Adicional         │
│    - Fundadores                          │
│    - Premios                             │
│    - Hitos                               │
│    - ODS/Sostenibilidad                  │
│    → onClick "Enviar"                    │
└────────────┬────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────┐
│ 7. Validación Local:                            │
│    - Verifica campos requeridos                  │
│    - Valida formatos (emails, URLs, etc.)        │
│    - Si errores → Muestra toasts rojos           │
│    - Si OK → Continúa                           │
└────────────┬──────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────┐
│ 8. POST /api/formulario/registrar                │
│    Body: { empresa: {...}, fundadores: [], ... }│
└────────────┬──────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────┐
│ 9. Backend procesa en TRANSACCIÓN                 │
│    - Crea empresa base                           │
│    - Crea relaciones (sedes, servicios, etc.)    │
│    - Si error → ROLLBACK completo                │
│    - Si OK → COMMIT                              │
└────────────┬──────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────┐
│ 10. Response 201:                                │
│     {                                            │
│       empresa: { id_empresa: 567, ... },        │
│       message: "Empresa registrada exitosamente"│
│     }                                            │
└────────────┬──────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────┐
│ 11. UI finaliza:                                 │
│     - addToast("¡Empresa creada!", "success")   │
│     - Limpia formulario                         │
│     - Redirige a /empresas                       │
│     - Nueva empresa visible en catálogo          │
└──────────────────────────────────────────────────┘
```

---

## 📁 Asset Management

### Imágenes Estáticas (src/assets/)

| Archivo | Tipo | Uso |
|---------|------|-----|
| logo.png | PNG | Logo principal de la web |
| bolivia.svg | SVG | Mapa de Bolivia |
| bolivia.jpg | JPG | Imagen de Bolivia |
| vita.jpg | JPG | Foto de persona (Vita) |
| jessica.jpg | JPG | Foto de persona (Jessica) |
| guido.jpg | JPG | Foto de persona (Guido) |
| ovando.jpg | JPG | Foto de persona (Ovando) |
| futbol.jpg | JPG | Imagen evento futbol |
| mineros.jpg | JPG | Imagen evento minería |
| quien-contra-nosotros.jpg | JPG | Imagen campaña |

### Fuentes Tipográficas (src/fonts/)

| Archivo | Formato | Nombre CSS | Uso |
|---------|---------|-----------|-----|
| BodoniStd.otf | OpenType | 'Bodoni Std' | Títulos elegantes |
| TrajanProRegular.ttf | TrueType | 'Bodoni' (alt) | Títulos alternativo |
| RNSMiles-Light.otf | OpenType | 'Miles Light' | Texto body |
| CenturyGothic.ttf | TrueType | 'Century Gothic' | Fallback |

### Medios Públicos (public/media/)

```
media/
├── busqueda/                # Imágenes para página búsqueda
├── contactoPage/            # Imágenes página contacto
├── dashboardsPage/          # Backgrounds (bg.jpg)
├── empresasPage/            # Imágenes catalogo empresas
├── equipoPage/              # Fotos equipo
├── footer/                  # Logo/iconos footer
├── header/                  # Logo/banner header
├── historiapage/            # Imágenes historia
├── homePage/                # Hero video (video.webm), barra (barra.png)
└── revista/                 # Imágenes revista
```

### Optimización de Imágenes

**Strategy:**
1. **Firebase Storage** → Almacenamiento original de imágenes subidas
2. **Cloudinary** → Transformación y servido optimizado

**Ventajas:**
- Webp automático en navegadores soportados
- Compression según dispositivo
- CDN global para speed
- Responsive images según viewport

**Uso:**
```javascript
// Imagen Firebase (original)
<img src={firebaseUrl} alt="..." />

// Imagen Cloudinary (optimizada)
<CldImage
  src={cloudinaryPublicId}
  width={500}
  height={500}
  quality="auto"
  format="auto"
/>
```

---

## 🚀 Flujo de Desarrollo Local

### Setup Inicial
```bash
cd Frontend
npm install
npm start
```

Abre: `http://localhost:3000`

### Build para Producción
```bash
npm run build
```

Output: `build/` folder lista para deploy

### Estructura de Build
```
build/
├── index.html
├── static/
│   ├── js/
│   │   ├── main.xxxxx.js (bundle principal)
│   │   └── ...
│   └── css/
│       └── main.xxxxx.css (estilos compilados)
├── media/
└── fonts/
```

---

## 📊 Resumen de Características

### Funcionalidades Implementadas
✅ **Autenticación JWT** con persistencia en localStorage  
✅ **Control de acceso** por roles (admin/user)  
✅ **CRUD de Empresas** con búsqueda y filtros  
✅ **CRUD de Usuarios** (admin only)  
✅ **Sistema de notificaciones** (toast messages)  
✅ **Responsive Design** mobile-first con Tailwind  
✅ **Animaciones** con Framer Motion  
✅ **Custom Hooks** para lógica compartida  
✅ **Cache en memoria** para optimización  
✅ **Firebase Storage** para imágenes  
✅ **Cloudinary** para transformación de imágenes  
✅ **Analytics** vía Firebase Analytics  
✅ **Integración Dashboard externo**  
✅ **Formularios multi-step**  
✅ **Modal system** para interacciones  

### Componentes Reutilizables
- 20+ componentes base comunes
- 14 componentes AboutUs especializados
- 3 custom hooks (toast, mobile, scroll)
- Sistema de utilidades (cn(), cache manager)
- Múltiples páginas funcionales (10+ screens)

### Integración con Backend
- **Base URL:** https://api-rest-bicentenario-gcex.onrender.com
- **Autenticación:** JWT Bearer Token
- **Comunicación:** Axios con interceptores
- **Error Handling:** Try-catch con mensajes amigables
- **Loading States:** Spinners y skeleton screens

---

## 💡 Conclusión

Este frontend es una **aplicación React moderna y profesional** con:

✅ **Arquitectura modular** bien organizada  
✅ **Separación clara** de componentes, servicios, hooks  
✅ **Autenticación robusta** con persistencia  
✅ **UI responsiva** y animada  
✅ **Integración completa** con backend NestJS  
✅ **Almacenamiento** con Firebase + Cloudinary  
✅ **Performance optimizado** con cache y lazy loading  
✅ **Custom hooks** para lógica reutilizable  
✅ **Tamaño de bundle** optimizado  
✅ **Escalable** para futuras features  

**El proyecto está listo para producción con excelentes patrones de desarrollo.**

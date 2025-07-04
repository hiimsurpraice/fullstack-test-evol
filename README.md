# evol-app
instalación y Configuración
desde la raíz del proyecto ejecutar:
docker-compose up --build
La aplicación estará disponible en:

Frontend: http://localhost:5173
Backend API: http://localhost:3000/api
PostgreSQL: localhost:5432

Estructura del Proyecto
fullstack-test-evol/
├── docker-compose.yml
├── backend/
│   ├── src/
│   │   ├── tasks/          # Módulo de tareas
│   │   ├── tags/           # Módulo de etiquetas
│   │   ├── database/       # Configuración de BD
│   │   └── common/         # Utilidades compartidas
│   └── test/
└── frontend/
    ├── src/
    │   ├── app/            # Store de Redux
    │   ├── components/     # Componentes React
    │   ├── features/       # Slices de Redux
    │   ├── hooks/          # Custom hooks
    │   ├── services/       # Servicios API
    │   ├── pages/          # Pages
    │   └── types/          # TypeScript types
    └── tests/

https://github.com/hiimsurpraice/evol-app
# TaskAppFront 

Este proyecto tiene como funcionalidad gestionar tareas permitiendo:
- Ver una lista de tareas.
- Agregar una nueva tarea (con título, descripción y estado
pendiente/completado).
- Marcar una tarea como completada.
- Eliminar una tarea.

## Tecnologías Utilizadas 💻
- Angular: Framework para el desarrollo frontend, creado con Angular CLI versión 19.2.3.
- TypeScript: Con fuerte tipado y uso de decoradores como @Input y @Output para manejar la comunicación entre componentes.
- Tailwind CSS & Sass: Framework de utilidades CSS junto con Sass para los estilos. Implementación mobile-first y soporte para modo oscuro.
- HTML: Uso de directivas como *ngFor para iterar sobre colecciones y *ngIf para manejar secciones condicionales.

## Requisitos ⚙️️

Para ejecutar el proyecto, asegúrate de tener los siguientes componentes instalados: 

- Node.js y npm
- Angular CLI
- Visual Studio Code o cualquier editor de tu preferencia.

Para correr el proyecto ejecute los siguientes comandos:

para instalar dependencias:
```bash
npm i
```
Para correr el proyecto
```bash
ng serve 
```

La aplicación estará disponible en: http://localhost:4200/.

## Arquitectura y Diseño 🏗️

Este proyecto sigue una arquitectura basada en componentes combinada con los principios de Atomic Design, lo que permite organizar la aplicación de manera modular y escalable. Los componentes están jerárquicamente estructurados (átomos, moléculas, organismos) para promover la reutilización y el mantenimiento fácil.

### Características de la Arquitectura:
- Componente Principal (main-task): Contiene la lógica central de la aplicación y maneja la mayoría de las interacciones del usuario. Se comunica con los servicios para gestionar tareas y manejar la configuración del tema.
- Servicios Angular: Se utilizan para la gestión de la lógica de negocio, como la manipulación de datos y el consumo de la API de tareas.
- Enfoque Mobile-First: El diseño está optimizado para dispositivos móviles y se adapta a pantallas más grandes utilizando Tailwind CSS y Sass para los estilos.
### Optimización de Rendimiento:
- Lazy Loading: Se implementó lazy loading en las rutas para cargar solo los módulos necesarios, mejorando así el rendimiento de la aplicación.
- CDN Global: La aplicación utiliza una Content Delivery Network (CDN) para la distribución de los archivos estáticos, asegurando tiempos de carga rápidos en todo el mundo.

## Despligue 🛫

El proyecto se despliega en Vercel gracias a su facilidad de integración con GitHub y su soporte para aplicaciones Angular. Los beneficios de usar Vercel incluyen:

- Conecta tu repositorio en GitHub, GitLab o Bitbucket, y Vercel desplegará automáticamente cada vez que hagas un push.
- Vercel utiliza una red de distribución de contenido (CDN) para servir los archivos estáticos de manera rápida y eficiente en todo el mundo.
- Para desplegar una aplicación Angular en Vercel, solo necesitas compilarla con ng build --prod y subir los archivos estáticos generados. No se requieren configuraciones complejas de servidor.
- Vercel gestiona la infraestructura automáticamente, asegurando que tu aplicación escale según la demanda sin necesidad de intervención manual.

## Aplicación desplegada.

https://task-app-lemon-mu.vercel.app/

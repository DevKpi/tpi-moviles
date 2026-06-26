TPI - App de Tareas

Descripción
-----------

Proyecto de aplicación móvil para gestión de tareas. Permite crear, editar, marcar como completadas y organizar tareas. Actualmente en desarrollo; esta README recoge la estructura prevista, pantallas y funcionalidades básicas.

Integrantes
-----------

- DevKpi
- TekoBC

Pantallas previstas
-------------------

- Pantalla de inicio 
(
    - Header: Hola {usuario}, barra de busqueda de tarea, menú (nombre App, navbar a crear tarea, ver tarea y botón de cambio de theme) y botón de notis 
    - Main: Flatlist de tareas (últimas 5-7 tareas a vencer) - Encima del flatlist botón ir a tareas - botón a screen crear tarea
    - Barra de nav inferior: botón para volver a la pantalla de inicio (Home) y para navegar hacia la screen de la lista completa de tareas.
)
- Pantalla de tareas
(
    Header: Se mantiene el mismo que en la de inicio
    Main: Flatlist con la lista total de tareas, agregar filtro para aplicar a la lista de tareas, botón a un lado de cada tarea para editarlas, botón para alternar el estado de las tareas y/o eliminarlas.
)
- Pantalla de detalle de tarea
(
    Header
    Main: Tarjeta de tarea (nombre tarea, descripción, estado [completada, pendiente, incompleta], fecha de vencimiento), editar tarea, eliminar tarea.
)
- Pantalla de creación/edición de tarea
(
    Header
    Main: campos a completar/editar (nombre tarea, descripción, estado [toda tarea nueva tiene por default pendiente], fecha de vencimiento, prioridad/importancia).
)
- PopUp de ajustes (cambio de tema y de nombre de usuario)
(
    Header
    Main: botones de cambio de tema y campo de edición de nombre de usuario
)
- PopUp de login / nombre (meramente visual, sin funcionalidades)
(
    Ingreso nombre guardo en asyncstorage.
)
- Pantalla de registro (meramente visual, sin funcionalidades)
(
    Header: Logo y/o nombre de la App
    Main: Campo de ingreso de mail, nombre y password, botón de "Registrarme"
)

- PopUp de Suscripción(
    Boton de adjuntar archivos en la tarjeta de tareas onPress ScreenSub
    en AddTask & EditTask.
    Adjuntar / vincular con claude
)

Funcionalidades básicas previstas
---------------------------------

- Crear, editar y eliminar tareas
- Marcar tareas como completadas / pendientes / incompletas
- Ordenar y filtrar tareas (por fecha, prioridad, estado)
- Guardado local (y/o sincronización remota en el futuro)
- Notificaciones / recordatorios (opcional)

Cómo clonar el repositorio
--------------------------

1. Desde la terminal o PowerShell ejecuta:

	git clone <URL_DEL_REPOSITORIO>

2. Entra en la carpeta del proyecto:

	cd tpi-moviles

Instalar dependencias
----------------------

El proyecto usa Node.js. Desde la raíz del proyecto ejecuta:

	npm install

o si usas yarn:

	yarn install

Poner en funcionamiento el proyecto
----------------------------------

- El siguiente proyecto está desarrollado con Expo, por lo que los comandos para iniciarlo son los siguientes:

```bash
npx expo start -c
```

ó

```bash
npx expo start
```

Notas
-----

- Reemplaza <URL_DEL_REPOSITORIO> por la URL real del repositorio.
- Añadiremos instrucciones específicas (Android/iOS, Expo, variables de entorno) cuando el stack esté definido.



# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# 📱 TodoList App – Examen Final React Native (Expo + TypeScript)

Aplicación móvil desarrollada para el **Examen Final** del ramo de React Native.  
Permite gestionar tareas (**Todo List**) totalmente conectadas a un **backend real**, con:

- Autenticación JWT  
- CRUD completo de tareas  
- Subida de imágenes  
- Uso de **APIs nativas** (cámara y galería)  
- Persistencia de sesión con **AsyncStorage**  
- Navegación con **Expo Router**  
- Hooks y **Custom Hooks** para la lógica de negocio  

---

## 👥 Integrantes del grupo

- 🧑‍🎓 Nombre 1  
- 🧑‍🎓 Nombre 2  
- 🧑‍🎓 Nombre 3  
- 🧑‍🎓 Nombre 4  

> **Instituto Profesional San Sebastián**

---

## 🚀 Tecnologías utilizadas

- React Native (Expo)
- TypeScript
- Expo Router
- Axios
- AsyncStorage
- Expo Image Picker (API nativa)
- JWT Authentication
- Custom Hooks
- Cloudflare R2 (imágenes vía backend)

---

## 🔗 Backend obligatorio del examen

La aplicación consume el backend oficial:

https://todo-list.dobleb.cl

Documentación Swagger:

https://todo-list.dobleb.cl/docs

Endpoints principales utilizados:

- POST /auth/login
- POST /auth/register
- GET /todos
- POST /todos
- PATCH /todos/{id}
- DELETE /todos/{id}
- POST /images

---

## 🔐 Autenticación

✔️ Login con email y contraseña  
✔️ Token JWT recibido desde backend  
✔️ Token persistido en **AsyncStorage**  
✔️ Rutas protegidas con Expo Router  
✔️ Cierre de sesión con borrado de token  

---

## 🧩 Arquitectura y organización

app/
 ├─ (auth)/          → login y registro
 ├─ (tabs)/          → pantalla principal y perfil
 └─ _layout.tsx      → protección de rutas

src/
 ├─ hooks/           → useTodos (custom hook)
 ├─ context/         → AuthContext (autenticación)
 ├─ services/        → API, auth, todos, images
 ├─ components/      → TodoItem
 └─ interfaces/      → Tipos TypeScript

---

## 📸 Funcionalidades de imágenes

✔️ Tomar foto con **cámara nativa**  
✔️ Elegir desde galería  
✔️ Subir archivo multipart/form-data  
✔️ Guardar URL entregada por backend  
✔️ Mostrar imagen dentro de cada tarea  

> Se utiliza expo-image-picker como API nativa

---

## 🧠 Preguntas teóricas abordadas en el video

1. Estado en React y uso de useState  
2. Qué significa que la app sea nativa y uso de APIs nativas  
3. Servicio REST y autenticación mediante token JWT  
4. Hooks y creación del custom hook useTodos  

---

## 🛠️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

git clone https://github.com/usuario/repositorio.git
cd repositorio

### 2️⃣ Instalar dependencias

npm install

### 3️⃣ Configurar variables de entorno

Crear archivo:

.env

y agregar:

EXPO_PUBLIC_API_URL=https://todo-list.dobleb.cl

### 4️⃣ Ejecutar la aplicación

npx expo start

Puedes correrla en:

- Android Emulator  
- iOS Simulator  
- Expo Go en tu celular  

---

## 🤖 Uso de Inteligencia Artificial (obligatorio)

En el desarrollo de este proyecto se utilizó **IA como apoyo**, principalmente para:

- generación de fragmentos de código
- mejora de estilos visuales
- redacción del README
- explicación de conceptos teóricos
- guía en estructura de proyecto y arquitectura

Todas las decisiones finales, integración y pruebas fueron realizadas por el equipo.

---

## 🎥 Video del proyecto

📌 Se adjuntó video en EVA que incluye:

- demostración funcional completa  
- respuesta en video a las 4 preguntas teóricas  
- explicación con código en pantalla  

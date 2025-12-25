---
description: Cómo desplegar la aplicación en Vercel
---

Para desplegar tu aplicación en Vercel de forma rápida y profesional, sigue estos pasos:

### Opción 1: GitHub (Recomendado para actualizaciones automáticas)
1. Sube tu código a un repositorio de **GitHub**.
2. Ve a [vercel.com](https://vercel.com) e inicia sesión.
3. Haz clic en "Add New" -> "Project".
4. Importa tu repositorio de GitHub.
5. En la sección **Environment Variables**, añade:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase.
   - `VITE_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase.
   - `VITE_GEMINI_API_KEY`: Tu clave de Google Gemini (si la usas).
6. Haz clic en **Deploy**.

### Opción 2: Vercel CLI (Desde la terminal)
// turbo
1. Instala el CLI de Vercel si no lo tienes:
   `npm install -g vercel`
2. Ejecuta el comando de despliegue:
   `vercel`
3. Sigue las instrucciones en la terminal. Cuando te pregunte por las variables de entorno, asegúrate de añadirlas en el panel de Vercel una vez creado el proyecto.

### Notas importantes:
- El comando de build es: `npm run build`
- El directorio de salida es: `dist`
- El framework es: `Vite`

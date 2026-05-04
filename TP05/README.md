# TP05 — Buscador de películas (React + Vite + OMDb)

Aplicación que busca películas y series con la [OMDb API](https://www.omdbapi.com/) usando Axios.

## Requisito obligatorio: clave de API

Sin una clave válida la app mostrará un error en pantalla. La clave **no** va en el código: se configura con una variable de entorno de Vite.

### Pasos (hacelos en orden)

1. **Pedir la clave en OMDb**  
   Entrá a [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx), completá el formulario y activá la clave cuando te llegue el correo (la versión gratuita tiene un límite diario de consultas).

2. **Crear el archivo `.env.local` en la raíz del proyecto**  
   Carpeta: `TP05` (al lado de `package.json` y `vite.config.js`).  
   Podés copiar `.env.example` y renombrar la copia a `.env.local`, o crear un archivo nuevo llamado exactamente `.env.local`.

3. **Pegar la clave con este formato** (sin comillas, sin espacios raros alrededor del `=`):

   ```env
   VITE_OMDB_API_KEY=tu_clave_que_te_dio_omdb
   ```

4. **Reiniciar el servidor de desarrollo**  
   Vite **solo lee** las variables al arrancar.  
   - Cortá el proceso con `Ctrl+C` en la terminal.  
   - Volvé a ejecutar:

   ```bash
   npm run dev
   ```

5. **Probar**  
   Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`). Deberías ver la grilla de resultados y poder buscar.

### Problemas frecuentes

| Síntoma | Qué revisar |
|--------|----------------|
| Sigue el mensaje “Falta VITE_OMDB_API_KEY…” | El archivo se llama `.env.local`, está en la raíz de `TP05`, la variable empieza con `VITE_`, reiniciaste `npm run dev`. |
| “Invalid API key” | Clave mal copiada, espacios extra, o clave aún no activada en el mail de OMDb. |
| La app no encuentra el archivo | En Windows, si el Explorador no deja nombrar `.env.local`, creá el archivo desde el editor (Cursor: archivo nuevo → guardar como `.env.local`). |

**Seguridad:** no subas `.env.local` a Git ni pegues tu clave en WhatsApp/Discord. `.env.local` está ignorado por `*.local` en `.gitignore`.

## Scripts

```bash
npm install    # dependencias
npm run dev    # desarrollo
npm run build  # producción
npm run preview
```

## Estructura principal

- `src/api/omdbClient.js` — llamadas Axios a OMDb  
- `src/components/` — SearchBar, MovieList, MovieCard, MovieDetail, Loader, ErrorMessage  
- `src/constants/omdb.js` — búsqueda inicial por defecto  

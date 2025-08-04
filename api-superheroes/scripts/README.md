# Scripts para Limpiar Duplicados de Superhéroes

Este directorio contiene scripts para identificar y eliminar superhéroes duplicados en la base de datos.

## 📋 Scripts Disponibles

### 1. `findDuplicateHeroes.js`
**Propósito**: Solo identifica y muestra los superhéroes duplicados sin hacer cambios.

**Uso**:
```bash
node scripts/findDuplicateHeroes.js
```

**Resultado**: Muestra una lista de todos los superhéroes duplicados encontrados.

### 2. `removeDuplicateHeroes.js`
**Propósito**: Elimina los superhéroes duplicados manteniendo solo la primera ocurrencia de cada nombre.

**Uso**:
```bash
node scripts/removeDuplicateHeroes.js
```

**Resultado**: Elimina duplicados y muestra el conteo final.

### 3. `addUniqueIndex.js`
**Propósito**: Agrega un índice único al campo `name` para prevenir futuros duplicados.

**Uso**:
```bash
node scripts/addUniqueIndex.js
```

**Resultado**: Crea un índice único que impedirá agregar héroes con nombres duplicados.

### 4. `cleanupDuplicates.js` ⭐ **RECOMENDADO**
**Propósito**: Script completo que ejecuta todos los pasos de limpieza automáticamente.

**Uso**:
```bash
node scripts/cleanupDuplicates.js
```

**Resultado**: 
1. Identifica duplicados
2. Elimina duplicados
3. Agrega índice único para prevenir futuros duplicados

### 5. `addDifferentHeroes.js` 🆕 **NUEVO**
**Propósito**: Elimina duplicados existentes y agrega 100 superhéroes diferentes a la base de datos.

**Uso**:
```bash
node scripts/addDifferentHeroes.js
```

**Resultado**: 
1. Elimina todos los duplicados existentes
2. Agrega 100 superhéroes únicos de Marvel
3. Incluye héroes de Los Vengadores, X-Men, Spider-Verse y más

### 6. `addDifferentPets.js` 🆕 **NUEVO**
**Propósito**: Elimina duplicados existentes y agrega 100 mascotas diferentes a la base de datos.

**Uso**:
```bash
node scripts/addDifferentPets.js
```

**Resultado**: 
1. Elimina todos los duplicados existentes
2. Agrega 100 mascotas únicas inspiradas en Marvel
3. Incluye mascotas de diferentes equipos: Domésticas, Salvajes, Místicas, etc.

## 🔧 Cambios Realizados

### En el Esquema (`models/heroSchema.js`)
Se agregó la restricción `unique: true` al campo `name`:

```javascript
name: { type: String, unique: true, required: true }
```

## ⚠️ Importante

- **Backup**: Siempre haz una copia de seguridad de tu base de datos antes de ejecutar estos scripts.
- **Orden de ejecución**: Si usas scripts individuales, ejecuta primero `removeDuplicateHeroes.js` y luego `addUniqueIndex.js`.
- **Script recomendado**: Usa `cleanupDuplicates.js` que hace todo automáticamente.

## 🎯 Beneficios

1. **Elimina duplicados existentes**: Mantiene solo la primera ocurrencia de cada nombre.
2. **Previene futuros duplicados**: El índice único impedirá agregar héroes con nombres repetidos.
3. **No afecta el programa**: Los cambios son solo en la base de datos, no en la lógica de la aplicación.
4. **Seguro**: Los scripts muestran exactamente qué se va a eliminar antes de proceder.

## 🚀 Ejecución Rápida

### Para limpiar duplicados:
```bash
cd api-superheroes
node scripts/cleanupDuplicates.js
```

### Para agregar 100 superhéroes diferentes:
```bash
cd api-superheroes
node scripts/addDifferentHeroes.js
```

### Para agregar 100 mascotas diferentes:
```bash
cd api-superheroes
node scripts/addDifferentPets.js
```

¡Eso es todo! Tu base de datos estará limpia y llena de superhéroes y mascotas únicos. 
# 🚀 Comandos para Probar el Proyecto

## Construcción de la Imagen Docker

```bash
docker build -t webcodec .
```

## Ejecutar Ejemplo Básico (Por Defecto)

```bash
docker run --rm -v $(pwd)/output:/app/output webcodec
```

El video se guardará en `output/basic_example_[timestamp].mp4`

## Ejecutar Ejemplo Avanzado

```bash
docker run --rm -v $(pwd)/output:/app/output webcodec npm run example:advanced
```

El video se guardará en `output/advanced_example_[timestamp].mp4`

## Ejecutar Tests

```bash
docker run --rm -v $(pwd)/output:/app/output webcodec npm test
```

## Notas Importantes

- ✅ No necesitas instalar `node_modules` localmente
- ✅ El Dockerfile ya tiene glibc 2.39 (Ubuntu 24.04)
- ✅ El Dockerfile ya tiene FFmpeg 6
- ✅ Todos los videos se guardan en la carpeta `output/`
- ✅ El volumen `-v $(pwd)/output:/app/output` persiste los videos en tu máquina local

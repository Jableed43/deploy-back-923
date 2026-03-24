# Análisis de Conectividad MongoDB Atlas: Error SRV DNS

## 1. El Diagnóstico (¿Qué pasó?)

El error `querySrv ECONNREFUSED` es un fallo de resolución de nombres a nivel de red, no de código.
* **Causa**: Tu sistema no pudo resolver el registro **SRV** de DNS.
* **Por qué sucede**: El protocolo `mongodb+srv://` es un "descubridor" automático de servidores. Algunos proveedores de internet (ISP) bloquean estas consultas.
* **Por qué falló ahora y antes no**: Las versiones recientes de Node.js (como la v24 que tienes instalada) han cambiado su motor de DNS interno para ser más estrictos, o tu ISP aplicó un nuevo filtro.

## 2. Cómo generar el String de Conexión Estándar (Fix)

Para evitar este error, se debe usar la "Standard Connection String" que no depende de DNS SRV:

### Pasos Manuales (Atlas UI):
1. Ve a **Clusters** > **Connect** > **Drivers**.
2. En el desplegable de **Node.js version**, cambia la versión a **"3.6 or later"**.
3. Copia la cadena que empieza con `mongodb://` (sin el `+srv`).

### Pasos Técnicos para recrearlo (desde consola):
Si no tienes acceso al panel de Atlas, puedes investigar los nodos manualmente:
1. **Buscar nodos**: `nslookup -type=SRV _mongodb._tcp.tu-cluster.mongodb.net`
2. **Buscar opciones**: `nslookup -type=TXT tu-cluster.mongodb.net`
3. **Armar el string**:
   `mongodb://[USER]:[PASS]@[NODO_1]:27017,[NODO_2]:27017,[NODO_3]:27017/[DB_NAME]?ssl=true&replicaSet=[REPLICA_SET]&authSource=admin`

## 3. Guía para Soporte / IA

Si necesitas asistencia en el futuro, dile a la IA:
* **Error**: `querySrv ECONNREFUSED`.
* **Contexto**: "DNS SRV filtering en mi red local."
* **Pedido**: "Convertir mi URI de MongoDB Atlas a 'Standard Connection String' identificando los nodos reales."

## 4. Conclusión sobre el Hardware
**¿Cambiar de PC ayuda?** NO. El problema es la red. Si conectas una PC nueva a la misma red, fallará igual. La solución aplicada en tu `.env` es definitiva y te permite trabajar en cualquier red.

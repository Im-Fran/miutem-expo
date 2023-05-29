# Bienvenida
Hola! Esta es mi copia de la App de [MiUTEM](https://github.com/exdevutem/mi-utem) hecha con React Native usando el framework [Expo](https://expo.dev)

# Por que?
Actualmente me gustaría empezar a programar apps mobiles, y me enamoré de react, por lo que ahora intentaré hacer la app de la universidad en react native. Además creo que es 1000% mejor que flutter en terminos
del entorno de desarrollo. Lo unico necesario para ejecutar la app es NodeJS y Yarn. A diferencia de flutter que requiere: React, XCode (iOS), Android Studio (android), java, etc. solo para funcionar, incluso
esto lo he probado y funciona en codespaces, lo cual puede hacerlo mucho más facil de iniciar en su desarrollo (puedes probarlo al hacer run fork, y luego abrir el proyecto en codespaces)

# Será publicada?
Con fecha de 28 de Mayo 2023, he realizado mi postulación al club ExDev hace unas semanas, y si, me gustaría presentar el proyecto al equipo.

# Que licencia tiene?
Actualmente utiliza la licencia de GNU GPL v3. 

# Como puedo compilar el proyecto?
> **INFO**:
> Esto es para sistemas unix
Para el desarrollo solo instala nodejs lts (la actual es v18)
Luego usa el siguiente comando para habilitar yarn:
```sh
corepack enable
```
Luego instala los paquetes requeridos usando:
```sh
yarn
```

Para iniciar el programa solo usa
```sh
yarn expo
````
(Si estas en una red muy ocupada por mucha gente te recomiendo utilizar `yarn expo --tunnel`).

# Como abro la app?
(Debes tener instalada la app Expo GO para [iOS](https://itunes.apple.com/app/apple-store/id982107779) o [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www))
Una vez iniciado el servidor de expo, para iniciar la app en:
- iOS: escanea el QR en consola.
- Android: escanea el codigo QR con la app de Expo GO
- Web: Presiona en consola la letra `w`

Si! Esta app tambien está diseñanada para funcionar en la web. Si todo va bien yo creo que podriamos lanzar una version de escritorio de esta app usando la funcion Web, probablemente (ya que es react native) solo crea un servidor 
local y luego ejecuta react native con la web. No se, pero a futuro sabré el como crear la app para escritorio :)

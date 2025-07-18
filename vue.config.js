module.exports = {
  pwa: {
    name: 'Meine PWA App',
    themeColor: '#42b983',
    msTileColor: '#ffffff',
    manifestOptions: {
      short_name: 'PWA',
    },
    workboxPluginMode: 'GenerateSW', // Automatischer Service Worker
    workboxOptions: {
      // Optional: zusätzliche Einstellungen
    },
  },
}

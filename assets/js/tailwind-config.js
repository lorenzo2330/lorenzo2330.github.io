// Tema scuro di default; ricorda la scelta salvata
try{if(localStorage.theme==='light')document.documentElement.classList.remove('dark')}catch(e){}

tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
            },
            dark: {
              bg: '#09090b',
              card: '#121215',
              border: '#27272a',
              badge: '#1c1c21'
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'monospace']
          }
        }
      }
    }

import { ChakraProvider } from '@chakra-ui/react'
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from './theme/theme';
import { ToastProvider } from './components/default-components/toast/toast.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top-right', isClosable: true, variant: "top-accent" } }}>
    <ThemeEditorProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeEditorProvider>
  </ChakraProvider>
)

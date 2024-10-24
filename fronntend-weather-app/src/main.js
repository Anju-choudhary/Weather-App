import { createApp, provide, h } from 'vue';
import App from './App.vue'
//import router from './router'
import store from './store'
import { ApolloClients } from '@vue/apollo-composable';
import { apolloClient } from './apollo'; // Import Apollo client
import './assets/styles.css'

// createApp(App).use(store).use(router).mount('#app')
const app = createApp({
    setup() {
      provide(ApolloClients, {
        default: apolloClient,
      });
    },
    render: () => h(App),
  });
  
  app.use(store);
  app.mount('#app');

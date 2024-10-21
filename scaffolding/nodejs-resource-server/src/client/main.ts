import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import './assets/main.css'
import { ThemeServiceInit, infinityTheme, galaxyTheme } from 'devui-theme';

// 初始是 infinityTheme 无限主题
const themeService = ThemeServiceInit({ infinityTheme }, 'infinityTheme');

// 可以动态切换成 galaxyTheme 追光主题
themeService?.applyTheme(galaxyTheme);

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router)

app.mount('#app')

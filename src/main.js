import Vue from 'vue'
import App from './App.vue'

import router from './router';

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/ionicons'
import 'quasar-extras/mdi'
import {
  Quasar,
  QBtn,
  QLayout,
  QLayoutHeader,
  QLayoutDrawer,
  QPage,
  QPageContainer,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItemSeparator,
  QItem,
  QItemSide,
  QItemMain,
  QSearch,
  QCard,
  QCardTitle,
  QCardMain,
  QCardMedia,
  QCardSeparator,
  QCardActions,
  QInput,
  QField,
  QAutocomplete,
  QModal,
  QIcon,
  QChip,
  QSlideTransition,
  QFab,
  QFabAction,
  QPageSticky,
  QCollapsible,
  QScrollArea,
  QTooltip,
  QToggle,
  QSelect,
  Notify,
  QBtnDropdown,
  Dialog,
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QPage,
    QPageContainer,
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItemSeparator,
    QItem,
    QItemSide,
    QItemMain,
    QSearch,
    QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QCardSeparator,
    QCardActions,
    QInput,
    QField,
    QAutocomplete,
    QModal,
    QIcon,
    QChip,
    QSlideTransition,
    QFab,
    QFabAction,
    QPageSticky,
    QCollapsible,
    QScrollArea,
    QTooltip,
    QToggle,
    QSelect,
    Notify,
    QBtnDropdown,
    Dialog,
  },
  directives: {},
  plugins: {Notify, Dialog}
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  data: {color: '#673AB7'}
}).$mount('#app')
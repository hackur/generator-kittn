// Main JS File<% if (projectjquery === true) { %>
import $ from 'jquery'<% } if (projectquery === 'ElementQuery') { %>
import eq from 'css-element-queries'<% } else if (projectquery === 'ContainerQuery') { %>
import cq from 'cq-prolyfill'<% } if (projectvue === true ) { %>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'<% } %>
import './partial/kittnad' // Small Advertising for Kittn :)
import modernizrLoad from './partial/modernizer-loader' // eslint-disable-line
import conditionizrInit from './partial/conditionizr-init' // eslint-disable-line <% if (projectvue === true ) { %>
import App from './app.vue'
import store from './store/store'

// Adding Vue Plugins
Vue.use(VueResource)
Vue.use(VueRouter)<% } %><% if (projectquery === 'ContainerQuery') { %>

// Init Container Queries
cq({ postcss: true })<% } if (projectvue === true ) { %>
// Vue App
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')<% } %>

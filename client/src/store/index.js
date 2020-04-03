import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)
import axios from 'axios'
import Swal from 'sweetalert2'

// const url = `http://localhost:3000`
const url = `https://serene-fjord-43137.herokuapp.com`

export default new Vuex.Store({
  state: {
    retry: false
  },
  mutations: {
    ADD_RETRY(state, payload) {
      state.retry = payload
    }
  },
  actions: {
    login({ commit, state, dispatch }, payload) {
      axios({
        method: 'post',
        url: `${url}/users/login`,
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.payload)
          router.push('/otp')
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          })
        })
    },
    register({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${url}/users/register`,
        data: payload
      })
        .then(({ data }) => {
          router.push('/')
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          })
        })
    },
    otpValidation({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${url}/users/validation`,
        data: payload,
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          localStorage.setItem('code', true)
          router.push('/dashboard')
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          localStorage.setItem('retry', true)
          commit('ADD_RETRY', true)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          })
        })
    },
    retryOtp({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${url}/users/token`,
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          })
        })
    },
    changePassword({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${url}/users/changePassword`,
        data: payload,
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          })
        })
    }
  },
  modules: {

  }
})

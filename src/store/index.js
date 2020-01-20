import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const things = {
  state: {
    step: 1
  }
}

// output
// komponen
const dataarsip = {
  state: {
    // seksi_bagian: [
    //   'Statistik Sosial',
    //   'Statistik Produksi',
    //   'Statistik Distribusi',
    //   'Neraca Wilayah dan Analisis Statistik',
    //   'Integrasi Pengolahan dan Diseminasi Statistik',
    //   'Tata Usaha'
    // ],
    seksi_bagian: null,
    output: null,
    komponen: null,
    nama_arsip: null,
    no_rak: null,
    lokasi_rak: null,
    nomor_arsip: null
  }
}

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      dataarsip: dataarsip,
      things: things
    }

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}

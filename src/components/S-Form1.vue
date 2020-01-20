<template>
    <div class="q-pa-md" style="max-width: 400px">
      {{sosial_kegiatan_x}}aaa
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-select clearable filled color="purple-12" v-model="seksi_bagian_x" :options="seksi_bagian" label="Seksi / Bagian" />

       <q-input
        filled
        v-model="nama_arsip_x"
        label="Nama Arsip"
        hint="Nama Arsip"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

       <q-input
        filled
        v-model="lokasi_rak_x"
        label="Lokasi Rak"
        hint="Lokasi Rak"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number"
        v-model="nomor_arsip_x"
        label="Nomor Arsip"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      age: null,
      seksi_bagian: [
        'Statistik Sosial',
        'Statistik Produksi',
        'Statistik Distribusi',
        'Neraca Wilayah dan Analisis Statistik',
        'Integrasi Pengolahan dan Diseminasi Statistik',
        'Tata Usaha'
      ],
      accept: false
    }
  },

  methods: {
    onSubmit () {
      // var user = this.$firebase.auth().currentUser
      // const formData = {
      //   data_id: user.uid,
      //   nama: this.nama_x,
      //   umur: this.umur_x,
      //   jenis_kelamin: this.jenis_kelamin_x,
      //   pendidikan: this.pendidikan_x,
      //   pekerjaan: this.pekerjaan_x,
      //   pekerjaan_lainnya: this.pekerjaan_lainnya_x,
      //   nama_instansi: this.nama_instansi_x,
      //   kategori_instansi: this.kategori_instansi_x,
      //   kategori_instansi_lainnya: this.kategori_instansi_lainnya_x,
      //   pemanfaatan_hasil_kunjungan: this.pemanfaatan_hasil_kunjungan_x,
      //   jenis_layanan: this.jenis_layanan_x,
      //   fasilitas_utama: this.fasilitas_utama_x,
      //   fasilitas_utama_lainnya: this.fasilitas_utama_lainnya_x,
      //   rujukan: this.rujukan_x,
      //   rating: this.rating_x,
      //   feedback: this.feedback_x,
      //   time: new Date()
      // }
      // if (formData.pekerjaan !== 'Lainnya') {
      //   formData.pekerjaan_lainnya = '-'
      // }
      // if (formData.kategori_instansi !== 'Lainnya') {
      //   formData.kategori_instansi_lainnya = '-'
      // }
      // if (formData.fasilitas_utama !== 'Lainnya') {
      //   formData.fasilitas_utama_lainnya = '-'
      // }

      this.$firebase.firestore().collection('data_arsip').doc().set({
        seksi_bagian: this.seksi_bagian_x,
        nama_arsip: this.nama_arsip_x,
        lokasi_rak: this.lokasi_rak_x,
        nomor_arsip: this.nomor_arsip_x
        // user_id: user.uid,
        // nama: this.nama_x,
        // umur: this.umur_x,
        // jenis_kelamin: this.jenis_kelamin_x,
        // pendidikan: this.pendidikan_x,
        // pekerjaan: this.pekerjaan_x,
        // pekerjaan_lainnya: formData.pekerjaan_lainnya,
        // nama_instansi: this.nama_instansi_x,
        // kategori_instansi: this.kategori_instansi_x,
        // kategori_instansi_lainnya: formData.kategori_instansi_lainnya,
        // pemanfaatan_hasil_kunjungan: this.pemanfaatan_hasil_kunjungan_x,
        // jenis_layanan: this.jenis_layanan_x,
        // fasilitas_utama: this.fasilitas_utama_x,
        // fasilitas_utama_lainnya: formData.fasilitas_utama_lainnya,
        // rujukan: this.rujukan_x,
        // rating_kualitas_data: this.rating_kualitas_data_x,
        // rating_akses_data: this.rating_akses_data_x,
        // rating_sarana: this.rating_sarana_x,
        // feedback: this.feedback_x,
        // time: new Date().toISOString()

      })
      // .then(function (docRef) {
      //   console.log('Document written with ID: ', docRef.id)
      // })
      // .catch(function (error) {
      //   console.error('Error adding document: ', error)
      // })
        .then(
          this.$q.notify({
            color: 'green-6',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay Berhasil :)',
            position: 'center',
            timeout: 3000
          })
        ).then(
          this.step_x = 1,
          this.onReset()
        )
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    noArsip () {
      var user = this.$firebase.auth().currentUser
    },
  },
  computed: {
    seksi_bagian_x: {
      set (val) {
        this.$store.state.dataarsip.seksi_bagian = val
      },
      get () {
        return this.$store.state.dataarsip.seksi_bagian
      }
    },
    nama_arsip_x: {
      set (val) {
        this.$store.state.dataarsip.nama_arsip = val
      },
      get () {
        return this.$store.state.dataarsip.nama_arsip
      }
    },
    lokasi_rak_x: {
      set (val) {
        this.$store.state.dataarsip.lokasi_rak = val
      },
      get () {
        return this.$store.state.dataarsip.lokasi_rak
      }
    },
    nomor_arsip_x: {
      set (val) {
        this.$store.state.dataarsip.nomor_arsip = val
      },
      get () {
        return this.$store.state.dataarsip.nomor_arsip
      }
    },
    sosial_kegiatan_x: {
      set (val) {
        this.$store.state.dataarsip.sosial_kegiatan = val
      },
      get () {
        return this.$store.state.dataarsip.sosial_kegiatan
      }
    }

  }
}
</script>

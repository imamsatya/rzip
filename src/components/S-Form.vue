<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
    <!-- <div class="q-pa-md" style="max-width: 400px"> -->
    <div class="q-pa-md ubuntu">
      <div class="row items-start q-col-gutter-x-md justify-around">
        <div class="col-sm-6 ">
          <q-card class="my-card">
            <q-card-section>

              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-select clearable filled color="primary" v-model="seksi_bagian_x" :options="seksi()"
                  label="Seksi / Bagian" hint="Seksi / Bagian" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']"
                  @input="noArsip(seksi_bagian_x)" />

                <q-select clearable filled color="primary" v-model="output_x" :options="output()" label="Output"
                  hint="Output" lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                <q-input v-if="output_x == 'Lainnya'" filled color="primary" v-model="komponen_x" label="Nama Kegiatan"
                  hint="Nama Kegiatan" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                <q-select v-else clearable filled color="primary" v-model="komponen_x" :options="komponen()"
                  label="Nama Kegiatan" hint="Nama Kegiatan " lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                <q-input filled color="primary" v-model="nama_arsip_x" label="Nama Arsip" hint="Nama Arsip" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

                <q-input filled color="primary" type="number" v-model="no_rak_x" label="No Rak" hint="No Rak" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" min=1 />
                <q-input filled color="primary" v-model="lokasi_rak_x" label="Posisi Rak" mask="# - #"
                  hint="Baris - Kolom: # - #" lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :) {Baris - Kolom: # - #}']" />

                <q-input filled color="primary" type="number" v-model="nomor_arsip_x" label="Nomor Arsip" min=1
                  :disable="true" />

                <!-- <q-input filled color="primary" type="number" v-model="nomor_arsip_x" label="File" min=1
                  :disable="true" /> -->

                <!-- kalau mau pake file -->
                <!-- <q-input @input="val => { file = val[0] }" filled type="file" hint="File" @change="uploadImage"  />
                        <q-spinner-facebook
                  color="primary"
                  size="2em"
                  v-if="spinner"
                /> -->
                    <!-- <q-input filled color="primary" v-model="pesan_file" label="File Uploaded?" hint="Nama Arsip" :disable="true"
                      lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']"  /> -->
                    <!-- <img :src="gambar" width="80px"> -->

                <!-- no Arsip : {{this.get_data[0]+1}} -->
                <q-input filled color="primary" v-model="keterangan" type="textarea" label="Keterangan/Catatan" />

                <div>
                  <q-btn label="Submit" type="submit" color="primary" text-color="white" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
                <q-dialog v-model="darkDialog" persistent transition-show="flip-down" transition-hide="flip-up">
                  <q-card class="bg-primary text-white">
                    <q-bar>
                      <!-- <q-icon name="sentiment_very_satisfied" /> -->
                      <!-- <div>Halo ...</div> -->

                      <q-space />

                      <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                      </q-btn>
                    </q-bar>

                    <q-card-section>
                      Yeay berhasil, arsip telah ditambahkan :)
                    </q-card-section>
                    <q-card-section>
                      <div class="column items-center">
                        <q-icon name="sentiment_very_satisfied" class="column items-center" size='xl' />
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <!-- <q-btn flat label="Cancel" color="white" v-close-popup /> -->
                      <q-btn flat persistent type="reset" label="Ok Deh" color="white" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-form>

            </q-card-section>

          </q-card>
        </div>

        <div class="col-sm-3">
          <!-- Sosial -->
          <q-card class="my-card bg-primary" style="height: 150px; ">
            <q-card-section class="bg text-white">
              <div class="text-h2 text-center center">{{countSosialx}}</div>
              <br>
              <div class="text-h6 text-center center">Statistik Sosial</div>
            </q-card-section>
          </q-card>
          <br>

          <!-- Distribusi -->
          <q-card class="my-card bg-primary" style="height: 150px; ">
            <q-card-section class=" text-white">
              <div class="text-h2 text-center center">{{countDistribusix}}</div>
              <br>
              <div class="text-h6 text-center center">Statistik Distribusi</div>
            </q-card-section>
          </q-card>
          <br>
          <q-card class="my-card bg-primary" style="height: 150px; ">
            <q-card-section class=" text-white">
              <div class="text-h2 text-center center">{{countProduksix}}</div>
              <br>
              <div class="text-h6 text-center center">Statistik Produksi</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-sm-3">

          <q-card class="my-card bg-primary" style="height: 150px; ">
            <q-card-section class=" text-white">
              <div class="text-h2 text-center center">{{countIPDSx}}</div>
              <br>
              <div class="text-h6 text-center center">IPDS</div>
            </q-card-section>
          </q-card>
          <br>

          <q-card class="my-card bg-primary" style="height: 150px; ">
            <q-card-section class="bg-primary text-white">
              <div class="text-h2 text-center center">{{countNeracax}}</div>
              <br>
              <div class="text-h6 text-center center">Neraca</div>
            </q-card-section>
          </q-card>
          <br>
          <q-card class="my-card bg-primary" style="height: 150px; ">
            <q-card-section class="bg-primary text-white">
              <div class="text-h2 text-center center">{{countTUx}}</div>
              <br>
              <div class="text-h6 text-center center">Tata Usaha</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      spinner: false,
      keterangan: null,
      countIPDSx: 0,
      countSosialx: 0,
      countDistribusix: 0,
      countNeracax: 0,
      countProduksix: 0,
      countTUx: 0,

      data_noArsip: null,
      seksi_bagian_2: [
        // Statistik Sosial
        {
          seksi: 'Statistik Sosial',
          kegiatan: [{
            output: 'Publikasi/Laporan Kependudukan dan Ketenagakerjaan',
            komponen: [
              'Survei Angkatan Kerja Nasional (SAKERNAS) Semesteran',
              'Survei Angkatan Kerja Nasional(SAKERNAS) Tahunan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Kesejahteraan Rakyat',
            komponen: [
              'Survei Sosial Ekonomi Nasional KOR dan Konsumsi',
              'Susenas Modul Kesehatan dan Perumahan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Ketahanan Sosial',
            komponen: [
              'Penyusunan Statistik Politik Keamanan'
            ]
          },
          {
            output: 'Publikasi/Laporan Pendataan Potensi Desa',
            komponen: [
              'Pendataan Pemutakhiran Data Perkembangan Desa Tahun'
            ]
          }
          ]
        },
        // Statistik Distribusi
        {
          seksi: 'Statistik Distribusi',
          kegiatan: [{
            output: 'Publikasi/Laporan Statistik Distribusi',
            komponen: [
              'Survei Pola Distribusi Barang dan Jasa',
              'Survei Waktu Tunggu (Dwelling Time) Di Pelabuhan',
              'Kompilasi Data Transportasi',
              'Penyusunan Daftar Pelaku Usaha Transportasi Pasca'
            ]
          },
          {
            output: 'Publikasi/Laporan Updating Direktori Pasar dan Pusat',
            komponen: [
              'Penyusunan Direktori Pasar dan Pusat Perdagangan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Harga',
            komponen: [
              'Survei/Statistik Harga Produsen',
              'Survei Harga Perdagangan Besar',
              'Survei Harga Perdesaan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Keuangan, TI, Dan Pariwisata',
            komponen: [
              'Statistik Lembaga Keuangan',
              'Survei Statistik Badan Usaha Dan Pasar Modal',
              'Survei Bidang Jasa Pariwisata'
            ]
          },
          {
            output: 'Publikasi/Laporan Indeks Kemahalan Konstruksi',
            komponen: [
              'Indeks Kemahalan Konstruksi'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Keuangan Pemerintah Daerah',
            komponen: [
              'Survei Statistik Keuangan Pemerintah Daerah'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Wisatawan Nusantara',
            komponen: [
              'Survei Wisatawan Nusantara'
            ]
          }
          ]
        },
        // Statistik Produksi
        {
          seksi: 'Statistik Produksi',
          kegiatan: [{
            output: 'Publikasi/Laporan Statistik Peternakan, Perikanan, Dan ...',
            komponen: [
              'Survei Perusahaan Peternakan Dan RPH/TPH',
              'Survei Perusahaan Perikanan, TPI/PPI/PP',
              'Survei Perusahaan Kehutanan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Industri, Pertambangan, Dan ...',
            komponen: [
              'Survei Industri Besar/Sedang Tahunan',
              'Survei Industri Mikro dan Kecil (VIMK) Tahunan',
              'Survei Industri Mikro dan Kecil (VIMK) Triwulanan',
              'Survei Pertambangan, Energi, Penggalian, Captive Power',
              'Survei Konstruksi'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Tanaman Pangan',
            komponen: [
              'Survei Pertanian Tanaman Pangan/Ubinan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Hortikultura dan Perkebunan',
            komponen: [
              'Survei Hortikultura dan Indikator Pertanian',
              'Pengembangan Data Hortikultura Potensi dengan ...',
              'Survei Perusahaan Perkebunan'
            ]
          },
          {
            output: 'Publikasi/Laporan Statistik Tanaman Pangan Terintegrasi',
            komponen: [
              'Pendataan Statistik Pertanian Tanaman Pangan Terintegrasi'
            ]
          }
          ]
        },
        // IPDS
        {
          seksi: 'Integrasi Pengolahan dan Diseminasi Data Statistik',
          kegiatan: [{
            output: 'Laporan Diseminasi Statistik',
            komponen: [
              'Peningkatan Kualitas dan Layanan Statistik'
            ]
          },
          {
            output: 'Laporan Metadata Statistik',
            komponen: [
              'Peningkatan Pelayanan Metadata Kegiatan Statistik Dasar'
            ]
          },
          {
            output: 'Publikasi/Laporan Sensus Penduduk',
            komponen: [
              'Pemetaan dan Pemutakhiran Muatan Wilayah Kerja Statistik'
            ]
          }
          ]
        },
        // Neraca
        {
          seksi: 'Neraca Wilayah dan Analisis Statistik',
          kegiatan: [{
            output: 'Publikasi/Laporan Neraca Produksi',
            komponen: [
              'Penyusunan Nilai Tambah Lapangan Usaha Barang',
              'Implementasi SEEA Dalam SISNERLING Indonesia',
              'Penyusunan Nilai Tambah Lapangan Usaha Jasa Triwulanan',
              'Penyusunan PDRB Tahunan dan Triwulanan Menurut ... '
            ]
          },
          {
            output: 'Publikasi/Laporan Neraca Pengeluaran',
            komponen: [
              'Penyusunan Komponen Pengeluaran Rumah Tangga dan ...',
              'Penyusunan Neraca Rumah Tangga dan Institusi Nirlaba',
              'Penyusunan Neraca Pemerintah dan Badan Usaha',
              'Penyusunan Komponen Pengeluaran Pemerintah',
              'Penyusunan Komponen PMTB dan Inventori',
              'Penyusunan Konsolidasi PDRB Pengeluaran Triwulanan dan ...'
            ]
          },
          {
            output: 'Publikasi/Laporan Analisis dan Pengembangan Statistik',
            komponen: [
              'Indeks Tendensi Bisnis dan Indeks Tendensi Konsumen'
            ]
          },
          {
            output: 'Publikasi/Laporan PMTB Institusi dan Lapangan Usaha',
            komponen: [
              'Penyusunan Disagregasi PMTB Menurut Institusi dan ...'
            ]
          },
          {
            output: 'Publikasi/Laporan Inter Regional Input Output',
            komponen: [
              'Penyusunan Inter Regional Input Output (IRIO)'
            ]
          }
          ]
        },
        // TU
        {
          seksi: 'Tata Usaha',
          kegiatan: [{
            output: 'Layanan Dukungan Manajemen Satker',
            komponen: [
              'Penyusunan Rencana Program dan Penyusunan Rencana Anggaran',
              'Pelaksanaan Pemantauan dan Evaluasi',
              'Pengelolaan Keuangan dan Perbendaharaan',
              'Pengelolaan Kepegawaian',
              'Pelayanan Umum, Pelayanan Rumah Tangga dan Perlengkapan'
            ]
          },
          {
            output: 'Layanan Perkantoran',
            komponen: [
              'Gaji dan Tunjangan',
              'Operasional dan Pemeliharaan Kantor'
            ]
          },
          {
            output: 'Layanan Sarana dan Prasarana Internal',
            komponen: [
              'Pengadaan Kendaraan Bermotor'
            ]
          },
          {
            output: 'Lainnya',
            komponen: [
              'Lainnya'
            ]
          }
          ]
        }
      ],
      accept: false,
      darkDialog: false,
      get_data: [],
      maxVal: null,
      tes: null,
      tes2: null,
      filex: [
        {
          nama: null,
          url: null
        }
      ],
      pesan_file: null

    }
  },
  firestore () {
    var user = this.$firebase.auth().currentUser
    return {
      data_arsip: {
        // collection reference.
        ref: this.$firebase.firestore().collection('data_arsip'),
        // Bind the collection as an object if you would like to.
        objects: true,
        resolve: (data) => {
          // collection is resolved
        }
        // reject: (err) => {
        //   // collection is rejected
        // }
      },
      data_arsip2: this.$firebase.firestore().collection('data_arsip'),

      user_arsip: this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid)
    }
  },

  methods: {
    uploadImage (e) {
      this.pesan_file = null
      this.spinner = true
      this.pesan_file = 'belum berhasil upload'
      let file = e.target.files[0]
      var storageRef = this.$firebase.storage().ref('files/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // this.image.push(downloadURL)
          this.filex.url = downloadURL
          this.filex.nama = file.name
          // console.log('File available at', downloadURL)
          // console.log(this.gambar)
          if (this.filex.url !== null) {
            this.pesan_file = 'berhasil upload'
            this.spinner = false
          } else {
            this.pesan_file = 'belum berhasil upload'
          }
        })
      })
      // console.log(this.filex)
    },
    submit3 () {
      this.darkDialog = true
      this.onReset()
    },
    noArsip () {
      // let id = uid
      var user = this.$firebase.auth().currentUser
      this.tes = []
      this.tes2 = []
      var tesfirebase
      var tesfirebase2
      // this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==', this.seksi_bagian_x).get().then(function (querySnapshot) {
      //   querySnapshot.forEach(function (doc) {
      //     // doc.data() is never undefined for query doc snapshots
      //     // var data = {
      //     //   nomor_arsip: doc.data().nomor_arsip
      //     // }
      //     console.log(doc.id, ' => ', doc.data().nomor_arsip)
      //     tes.push(parseInt(doc.data().nomor_arsip))
      //   })
      // })

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        this.seksi_bagian_x).orderBy('nomor_arsip', 'desc').limit(1).get().then(querySnapshot => {
        // console.log('size', querySnapshot.size)
        if (querySnapshot.size !== 0) {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // var data = {
            //   nomor_arsip: doc.data().nomor_arsip
            // }

            if (doc.data() === null) {
              // console.log('true, isinya null')
              tesfirebase = 0
              tesfirebase2 = 1
              // console.log('tesfirebase2', tesfirebase2)
              this.nomor_arsip_x = tesfirebase2
              // console.log('tes', this.nomor_arsip_x)
            } else {
              // console.log('false, tidak null')
              // console.log(doc.id, ' => ', doc.data())
              tesfirebase = doc.data().nomor_arsip
              tesfirebase2 = parseInt(tesfirebase) + 1
              // console.log('tes_firebase', tesfirebase, tesfirebase2)
              this.nomor_arsip_x = tesfirebase2
              // this.tes2 = doc.data().nomor_arsip
              // console.log('tes', this.tes2 + 1)
            }
          })
        } else {
          tesfirebase = 0
          tesfirebase2 = 1
          // console.log('tesfirebase2', tesfirebase2)
          this.nomor_arsip_x = tesfirebase2
          // console.log('tes', this.nomor_arsip_x)
          // this.tes2 = 0
          // this.nomor_arsip_x = 1
        }
      })
      // this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==', this.seksi_bagian_x).orderBy('nomor_arsip', 'desc').limit(1).onSnapshot(ref => {
      //   ref.forEach(doc => {
      //     var data = {
      //       user_id: doc.data().user_id,
      //       seksi_bagian: doc.data().seksi_bagian,
      //       output: doc.data().output,
      //       komponen: doc.data().komponen,
      //       nama_arsip: doc.data().nama_arsip,
      //       no_rak: doc.data().no_rak,
      //       lokasi_rak: doc.data().lokasi_rak,
      //       nomor_arsip: doc.data().nomor_arsip,
      //       keterangan: doc.data().keterangan,
      //       time: doc.data().time,
      //       id: doc.id
      //     }
      //     tes.push(data)
      //   })
      // })
      // console.log('ini f', f)
      // this.get_data = this.tes
      // this.data_noArsip.push(this.tes2)
      // this.maxVal = this.get_data
    },
    onSubmit () {
      this.$q.loadingBar.start()
      var user = this.$firebase.auth().currentUser
      // cara 1
      // this.$firebase.firestore().collection('data_arsip').doc().set({
      //   user_id: user.uid,
      //   seksi_bagian: this.seksi_bagian_x,
      //   output: this.output_x,
      //   komponen: this.komponen_x,
      //   nama_arsip: this.nama_arsip_x,
      //   no_rak: this.no_rak_x,
      //   lokasi_rak: this.lokasi_rak_x,
      //   nomor_arsip: this.nomor_arsip_x,
      //   keterangan: this.keterangan,
      //   time: new Date().toISOString()

      // })

      // pake firestore
      this.$firestore.data_arsip2.add({
        user_id: user.uid,
        seksi_bagian: this.seksi_bagian_x,
        output: this.output_x,
        komponen: this.komponen_x,
        nama_arsip: this.nama_arsip_x,
        no_rak: this.no_rak_x,
        lokasi_rak: this.lokasi_rak_x,
        nomor_arsip: this.nomor_arsip_x,
        keterangan: this.keterangan,
        file: this.filex,
        time: new Date().toISOString()
      })

      // pake mongoDB
      this.$axios.post('http://localhost:5000/api/arsips', {
        user_id: user.uid,
        seksi_bagian: this.seksi_bagian_x,
        output: this.output_x,
        komponen: this.komponen_x,
        nama_arsip: this.nama_arsip_x,
        no_rak: this.no_rak_x,
        lokasi_rak: this.lokasi_rak_x,
        nomor_arsip: this.nomor_arsip_x,
        keterangan: this.keterangan,
        file: this.filex,
        time: new Date().toISOString()
      })
        .then(function (response) {
          // console.log(response)
        })
        // .catch(function (error) {
        //   // console.log(error)
        // })
      this.$q.loadingBar.stop()
      // this.get_data = null
      this.countIPDS()
      this.countSosial()
      this.countDistribusi()
      this.countProduksi()
      this.countNeraca()
      this.countTU()
      this.onReset()
      this.submit3()
    },
    seksi () {
      const seksi = []
      for (let index = 0; index < this.seksi_bagian_2.length; index++) {
        // const element = this.sosial_kegiatan[index]
        seksi.push(this.seksi_bagian_2[index].seksi)
      }
      return seksi
    },
    output () {
      const seksi = this.seksi_bagian_x
      var outputx = []
      for (let index = 0; index < this.seksi_bagian_2.length; index++) {
        if (seksi === this.seksi_bagian_2[index].seksi) {
          for (let j = 0; j < this.seksi_bagian_2[index].kegiatan.length; j++) {
            outputx.push(this.seksi_bagian_2[index].kegiatan[j].output)
          }
        }
      }
      return outputx
    },
    komponen () {
      // const b = []
      const seksi = this.seksi_bagian_x
      const outputx = this.output_x
      var komponen = []
      for (let index = 0; index < this.seksi_bagian_2.length; index++) {
        if (seksi === this.seksi_bagian_2[index].seksi) {
          for (let j = 0; j < this.seksi_bagian_2[index].kegiatan.length; j++) {
            if (outputx === this.seksi_bagian_2[index].kegiatan[j].output) {
              komponen = this.seksi_bagian_2[index].kegiatan[j].komponen
            }
          }
        }
      }
      return komponen
    },
    countIPDS () {
      var tes = 0
      var user = this.$firebase.auth().currentUser

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        'Integrasi Pengolahan dan Diseminasi Data Statistik').onSnapshot(ref => {
        ref.forEach(doc => {
          tes++
          // console.log(tes)
          this.countIPDSx = tes
        })
      })
      // console.log(this.countIPDSx)
      // this.countIPDSx = tes

      return this.countIPDSx
    },

    countSosial () {
      var tes = 0
      var user = this.$firebase.auth().currentUser

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        'Statistik Sosial').onSnapshot(ref => {
        ref.forEach(doc => {
          tes++
          // console.log(tes)
          this.countSosialx = tes
        })
      })
      // console.log(this.countSosialx)
      // this.countIPDSx = tes

      return this.countSosialx
    },

    countDistribusi () {
      var tes = 0
      var user = this.$firebase.auth().currentUser

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        'Statistik Distribusi').onSnapshot(ref => {
        ref.forEach(doc => {
          tes++
          // console.log(tes)
          this.countDistribusix = tes
        })
      })

      // this.countIPDSx = tes

      return this.countDistibusix
    },
    countProduksi () {
      var tes = 0
      var user = this.$firebase.auth().currentUser

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        'Statistik Produksi').onSnapshot(ref => {
        ref.forEach(doc => {
          tes++
          // console.log(tes)
          this.countProduksix = tes
        })
      })

      // this.countIPDSx = tes

      return this.countProduksix
    },

    countNeraca () {
      var tes = 0
      var user = this.$firebase.auth().currentUser

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        'Neraca Wilayah dan Analisis Statistik').onSnapshot(ref => {
        ref.forEach(doc => {
          tes++
          // console.log(tes)
          this.countNeracax = tes
        })
      })

      // this.countIPDSx = tes

      return this.countNeracax
    },

    countTU () {
      var tes = 0
      var user = this.$firebase.auth().currentUser

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).where('seksi_bagian', '==',
        'Tata Usaha').onSnapshot(ref => {
        ref.forEach(doc => {
          tes++
          // console.log(tes)
          this.countTUx = tes
        })
      })

      // this.countIPDSx = tes

      return this.countTUx
    },
    onReset () {
      this.seksi_bagian_x = null
      this.output_x = null
      this.komponen_x = null
      this.nama_arsip_x = null
      this.no_rak_x = null
      this.lokasi_rak_x = null
      this.nomor_arsip_x = null
      this.keterangan = null
    }

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
    },
    output_x: {
      set (val) {
        this.$store.state.dataarsip.output = val
      },
      get () {
        return this.$store.state.dataarsip.output
      }
    },
    komponen_x: {
      set (val) {
        this.$store.state.dataarsip.komponen = val
      },
      get () {
        return this.$store.state.dataarsip.komponen
      }
    },
    no_rak_x: {
      set (val) {
        this.$store.state.dataarsip.no_rak = val
      },
      get () {
        return this.$store.state.dataarsip.no_rak
      }
    }

  },
  beforeMount () {
    this.countSosial()
    this.countDistribusi()
    this.countProduksi()
    this.countIPDS()
    this.countNeraca()
    this.countTU()
  }
}

</script>

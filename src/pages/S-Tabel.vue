<template>
  <div>
    <div class="q-pa-md">
      <!-- {{get_data[0]}} {{index}} -->

      <transition appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
        <q-table title="Data Arsip" :data="user_arsip" :columns="columns" row-key="name" :filter="filter"
          :loading="loading" :pagination.sync="pagination" :visible-columns="visibleColumns" no-data-label="I didn't find anything for you"
          class="bg-white text-primary" no-results-label="The filter didn't uncover any results">

          <template v-slot:body="props">
            <q-tr :props="props">

              <q-td key="action">
                <div class=" q-gutter-sm">
                  <q-btn push round color="blue-5" icon="ion-create" size='sm'
                    @click="edit(props, props.row.__index)">
                    <q-tooltip content-class="bg-blue-5" :offset="[10, 10]">
                      Edit!
                    </q-tooltip>
                  </q-btn>

                  <q-btn push round color="red-5" icon="ion-trash" size='sm'
                    @click="delete_dialog(props, props.row.__index)">
                    <q-tooltip content-class="bg-red-5" :offset="[10, 10]">
                      Delete
                    </q-tooltip>
                  </q-btn>

                </div>
              </q-td>

              <q-td key="index" :props="props">
                <q-badge color="primary">
                  {{ props.row.__index+1 }}
                </q-badge>
              </q-td>

              <q-td key="seksi_bagian" :props="props">
                <q-badge color="primary">
                  {{ props.row.seksi_bagian }}
                </q-badge>
              </q-td>

              <q-td key="output" :props="props" >
                <q-badge color="primary">
                  {{ props.row.output }}
                </q-badge>
              </q-td>

              <q-td key="komponen" :props="props">
                <q-badge color="primary">
                  {{ props.row.komponen }}
                </q-badge>
              </q-td>
              <q-td key="nama_arsip" :props="props">
                <q-badge color="primary">
                  {{ props.row.nama_arsip }}
                </q-badge>
              </q-td>
              <q-td key="no_rak" :props="props">
                <q-badge color="primary">
                  {{ props.row.no_rak }}
                </q-badge>
              </q-td>
              <q-td key="lokasi_rak" :props="props">
                <q-badge color="primary">
                  {{ props.row.lokasi_rak }}
                </q-badge>
              </q-td>

              <q-td key="nomor_arsip" :props="props">
                <q-badge color="primary">
                  {{ props.row.nomor_arsip }}
                </q-badge>
              </q-td>

               <q-td key="keterangan" :props="props">
                <q-badge color="primary">
                  {{ props.row.keterangan }}
                </q-badge>
              </q-td>

              <!-- File -->
              <!-- <q-td key="file" :props="props">
                <q-badge color="primary">
                  {{ props.row.file }}
                </q-badge>
              </q-td> -->

              <q-td key="time" :props="props">
                <q-badge color="primary">
                  {{ props.row.time }}
                </q-badge>
              </q-td>
            </q-tr>
          </template>

          <template v-slot:top-right>
            <q-select v-model="visibleColumns" multiple borderless dense options-dense
              :display-value="$q.lang.table.columns" emit-value map-options :options="columns" option-value="name"
              style="min-width: 150px" />

            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <q-space />

              <template v-slot:append>
                <q-icon name="search" />
              </template>

              <template v-slot:no-data="{ icon, message, filter }">
                <div class="full-width row flex-center text-accent q-gutter-sm">
                  <q-icon size="2em" name="sentiment_dissatisfied" />
                  <span>
                    Well this is sad... {{ message }}
                  </span>
                  <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                </div>
              </template>

            </q-input>

          </template>

        </q-table>

      </transition>
      <!-- Edit -->
      <q-dialog v-model="medium">
        <q-card class="text-white bg-primary ">
          <q-bar>

            <div>Edit Data</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>

            <q-form @submit="updateData(id)" @reset="onReset" class="q-gutter-md">
              <q-select clearable filled bg-color="white" color="primary" v-model="edited_data.seksi_bagian"
                :options="seksi()" label="Seksi / Bagian" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

              <q-select clearable filled bg-color="white" color="primary" v-model="edited_data.output"
                :options="output()" label="Output" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

              <q-select clearable filled bg-color="white" color="primary" v-model="edited_data.komponen"
                :options="komponen()" label="Nama Kegiatan" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

              <q-input filled bg-color="white" color="primary" v-model="edited_data.nama_arsip" label="Nama Arsip"
                hint="Nama Arsip" lazy-rules :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" />

              <q-input filled bg-color="white" color="primary" type="number" v-model="edited_data.no_rak"
                label="No Rak" hint="No Rak" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :)']" min=0 />
              <q-input filled bg-color="white" color="primary" v-model="edited_data.lokasi_rak" label="Lokasi Rak"
                mask="# - #" hint="Baris - Kolom: # - #" lazy-rules
                :rules="[ val => val && val.length > 0 || 'Jangan lupa diisi yaa :) {Baris - Kolom: # - #}']" />

              <q-input filled bg-color="white" color="primary" type="number" v-model="edited_data.nomor_arsip"
                label="Nomor Arsip" :disable="true"    />

              <q-input v-model="edited_data.keterangan" filled bg-color="white" type="textarea"
                label="Keterangan/Catatan" />

              <q-card-actions align="right">

                <q-btn label="Reset" type="reset" color="white" text-color="primary" />
                <q-btn label="Update" type="submit" color="white" text-color="primary" class="q-ml-sm"
                  v-close-popup />
              </q-card-actions>
            </q-form>

          </q-card-section>

        </q-card>
      </q-dialog>

      <!-- Delete -->
      <q-dialog v-model="confirm_delete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="ion-trash" color="primary" text-color="white" />
            <span class="q-ml-sm">Kamu akan menghapusnya untuk selama - lamanya ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Ga jadi deh" color="primary" v-close-popup />
            <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="deleteku(id, index)" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5 },
      index: null,
      confirm_delete: null,
      id: null,
      loading: false,
      filter: '',
      rowCount: 10,
      model: 'Google',

      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      columns: [
        // Action
        {
          name: 'action',
          align: 'left',
          label: 'Aksi',
          sortable: true
        },
        // Index
        {
          name: 'index',
          align: 'left',
          label: 'No',
          field: row => row.__index,
          format: val => `${val}`,
          sortable: true
        },
        // Seksi
        {
          name: 'seksi_bagian',
          // required: true,
          label: 'Seksi / Bagian',
          align: 'left',
          field: row => row.seksi_bagian,
          format: val => `${val}`,
          sortable: true
        },
        // Output
        {
          name: 'output',
          align: 'left',
          label: 'Output',
          field: row => row.output,
          format: val => `${val}`,
          sortable: true,
          style: 'width: 50px',
          classes: 'my-special-class',
          headerStyle: 'width: 50px',
          headerClasses: 'my-special-class'
        },
        // Komponen
        {
          name: 'komponen',
          align: 'left',
          label: 'Kegiatan',
          field: row => row.komponen,
          format: val => `${val}`,
          sortable: true
        },
        // Nama Arsip
        {
          name: 'nama_arsip',
          align: 'left',
          label: 'Nama Arsip',
          field: row => row.nama_arsip,
          format: val => `${val}`,
          sortable: true
        },
        // No Rak
        {
          name: 'no_rak',
          label: 'No Rak',
          field: 'no_rak',
          sortable: true
        },
        // Lokasi Rak
        {
          name: 'lokasi_rak',
          label: 'Lokasi Rak',
          field: 'lokasi_rak',
          sortable: true
        },
        // Nomor Arsip
        {
          name: 'nomor_arsip',
          label: 'Nomor Arsip',
          field: 'nomor_arsip',
          sortable: true
        },
        // Keterangan
        {
          name: 'keterangan',
          label: 'Keterangan/Catatan',
          field: 'keterangan',
          sortable: true
        },
        // File
        // {
        //   name: 'file',
        //   label: 'Files',
        //   field: 'file',
        //   sortable: true
        // },
        // Time
        {
          name: 'time',
          label: 'Waktu',
          field: 'time',
          sortable: true
        }
      ],
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
          }
          ]
        }
      ],
      visibleColumns: [
        'action',
        'index',
        'seksi_bagian',
        'output',
        'komponen',
        'nama_arsip',
        'no_rak',
        'lokasi_rak',
        'nomor_arsip',
        'keterangan',
        'file',
        'time'
      ],
      get_data: null,
      medium: false,
      edited_data: {
        seksi_bagian: null,
        output: null,
        komponen: null,
        nama_arsip: null,
        no_rak: null,
        lokasi_rak: null,
        nomor_arsip: null,
        keterangan: null
      }

    }
  },
  created () {
    // var user = this.$firebase.auth().currentUser
    // var tes = []
    // this.$firebase.firestore().collection('responden_datas').where('user_id', '==', user.uid)

    // coba 1
    // this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid)
    //   .onSnapshot(function (snapshot) {
    //     snapshot.docChanges().forEach(function (change) {
    //       if (change.type === 'added') {
    //         console.log('New city: ', change.doc.data())
    //       }
    //       if (change.type === 'modified') {
    //         console.log('Modified city: ', change.doc.data())
    //       }
    //       if (change.type === 'removed') {
    //         console.log('Removed city: ', change.doc.data())
    //       }
    //     })
    //   })

    // coba 2
    // this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).onSnapshot(ref => {
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
    // coba 3
    // this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).get()
    //   .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, ' => ', doc.data())
    //       var data = {
    //         user_id: doc.data().user_id,
    //         seksi_bagian: doc.data().seksi_bagian,
    //         output: doc.data().output,
    //         komponen: doc.data().komponen,
    //         nama_arsip: doc.data().nama_arsip,
    //         no_rak: doc.data().no_rak,
    //         lokasi_rak: doc.data().lokasi_rak,
    //         nomor_arsip: doc.data().nomor_arsip,
    //         keterangan: doc.data().keterangan,
    //         time: doc.data().time,
    //         id: doc.id
    //       }
    //       tes.push(data)
    //     })
    //   })

    // this.get_data = tes
    // this.fetchData2()

    // pake mongodb
    // console.log('mongodb')
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
    delete_dialog (id, index) {
      this.confirm_delete = true
      this.id = id
      this.index = index
      // console.log(this.id.row['.key'], index)
    },
    edit (id, index) {
      this.medium = true
      this.index = index
      this.id = id
      // console.log(this.id.row['.key'], index)
      this.edited_data.seksi_bagian = this.user_arsip[index].seksi_bagian
      this.edited_data.output = this.user_arsip[index].output
      this.edited_data.komponen = this.user_arsip[index].komponen
      this.edited_data.nama_arsip = this.user_arsip[index].nama_arsip
      this.edited_data.no_rak = this.user_arsip[index].no_rak
      this.edited_data.lokasi_rak = this.user_arsip[index].lokasi_rak
      this.edited_data.nomor_arsip = this.user_arsip[index].nomor_arsip
      this.edited_data.keterangan = this.user_arsip[index].keterangan
    },
    watcher () {
      this.$q.loadingBar.start()
      var user = this.$firebase.auth().currentUser
      // let id = uid
      var tes = []

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid)
        .onSnapshot(function (querySnapshot) {
          var dataWatcher = []
          querySnapshot.forEach(function (doc) {
            dataWatcher.push(doc.data().name)
          })
        })
      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).onSnapshot(ref => {
        ref.forEach(doc => {
          var data = {
            user_id: doc.data().user_id,
            seksi_bagian: doc.data().seksi_bagian,
            output: doc.data().output,
            komponen: doc.data().komponen,
            nama_arsip: doc.data().nama_arsip,
            no_rak: doc.data().no_rak,
            lokasi_rak: doc.data().lokasi_rak,
            nomor_arsip: doc.data().nomor_arsip,
            keterangan: doc.data().keterangan,
            time: doc.data().time,
            id: doc.id
          }
          tes.push(data)
        })
      })
      this.get_data = tes

      this.$q.loadingBar.stop()
    },
    updateData (id) {
    //   this.$firestore.persons.doc(person['.key']).update({
    //     name: "Amrani Houssain"
    //     github: "@amranidev"
    // })

      // biasa
      // this.$firebase.firestore().collection('data_arsip').doc(id)
      //   .update({
      //     seksi_bagian: this.edited_data.seksi_bagian,
      //     output: this.edited_data.output,
      //     komponen: this.edited_data.komponen,
      //     nama_arsip: this.edited_data.nama_arsip,
      //     no_rak: this.edited_data.no_rak,
      //     lokasi_rak: this.edited_data.lokasi_rak,
      //     nomor_arsip: this.edited_data.nomor_arsip,
      //     keterangan: this.edited_data.keterangan
      //   }).then(
      //     this.watcher()
      //   )

      // pake vue-firestore
      // console.log(id.row['.key'])
      this.$firebase.firestore().collection('data_arsip').doc(id.row['.key']).update({
        seksi_bagian: this.edited_data.seksi_bagian,
        output: this.edited_data.output,
        komponen: this.edited_data.komponen,
        nama_arsip: this.edited_data.nama_arsip,
        no_rak: this.edited_data.no_rak,
        lokasi_rak: this.edited_data.lokasi_rak,
        nomor_arsip: this.edited_data.nomor_arsip,
        keterangan: this.edited_data.keterangan
      })
        .then(
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay Arsip Berhasil Diupdate :)',
            position: 'center',
            timeout: 5000
          })
        )
      // this.fetchData2()
      // this.get_data = null
      // console.log(this.get_data)
    },
    deleteku (id, index) {
      // this.$firestore.persons.doc(person['.key']).delete()
      // console.log(id, index)
      // this.$firebase.firestore().user_arsip.doc(this.id.row['.key']).delete()
      this.$firebase.firestore().collection('data_arsip').doc(this.id.row['.key']).delete()
      // this.$firebase.firestore().collection('data_arsip').doc(id).delete().then(function () {
      //   // console.log('Document successfully deleted!')

      // })
      // .then(
      //   this.watcher()
      // )
        .then(
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay Arsip Berhasil Didelete :)',
            position: 'center',
            timeout: 5000
          })
        )
      this.fetchData2()
    },
    onSubmit () {
      var user = this.$firebase.auth().currentUser
      this.$firebase.firestore().collection('data_arsip').doc().set({
        user_id: user.uid,
        seksi_bagian: this.seksi_bagian_x,
        output: this.output_x,
        komponen: this.komponen_x,
        nama_arsip: this.nama_arsip_x,
        no_rak: this.no_rak_x,
        lokasi_rak: this.lokasi_rak_x,
        nomor_arsip: this.nomor_arsip_x,
        keterangan: this.keterangan_x,
        time: new Date().toISOString()

      })
      // .then(function (docRef) {
      //   console.log('Document written with ID: ', docRef.id)
      // })
      // .catch(function (error) {
      //   console.error('Error adding document: ', error)
      // })
        .then(
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay Berhasil :)',
            position: 'center',
            timeout: 3000
          })
        )
      this.submit3()
    },
    seksi () {
      const seksi = []
      for (let index = 0; index < this.seksi_bagian_2.length; index++) {
        // const element = this.sosial_kegiatan[index]
        seksi.push(this.seksi_bagian_2[index].seksi)
      }
      // console.log(seksi)
      return seksi
    },
    output () {
      const seksi = this.edited_data.seksi_bagian
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
      const seksi = this.edited_data.seksi_bagian
      const outputx = this.edited_data.output
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
    onReset () {
      this.edited_data.seksi_bagian = ''
      this.edited_data.output = ''
      this.edited_data.komponen = ''
      this.edited_data.nama_arsip = ''
      this.edited_data.no_rak = ''
      this.edited_data.lokasi_rak = ''
      this.edited_data.nomor_arsip = ''
      this.edited_data.keterangan = ''
    },
    fetchData () {
      this.$q.loadingBar.start()
      var user = this.$firebase.auth().currentUser
      // let id = uid
      var tes = []

      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).onSnapshot(ref => {
        ref.forEach(doc => {
          var data = {
            user_id: doc.data().user_id,
            seksi_bagian: doc.data().seksi_bagian,
            output: doc.data().output,
            komponen: doc.data().komponen,
            nama_arsip: doc.data().nama_arsip,
            no_rak: doc.data().no_rak,
            lokasi_rak: doc.data().lokasi_rak,
            nomor_arsip: doc.data().nomor_arsip,
            keterangan: doc.data().keterangan,
            time: doc.data().time,
            id: doc.id
          }
          tes.push(data)
        })
      })
      this.get_data = tes

      this.$q.loadingBar.stop()
    },
    fetchData2 () {
      this.$q.loadingBar.start()
      var user = this.$firebase.auth().currentUser
      // let id = uid
      var tes = []
      this.$firebase.firestore().collection('data_arsip').where('user_id', '==', user.uid).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data())
            var data = {
              user_id: doc.data().user_id,
              seksi_bagian: doc.data().seksi_bagian,
              output: doc.data().output,
              komponen: doc.data().komponen,
              nama_arsip: doc.data().nama_arsip,
              no_rak: doc.data().no_rak,
              lokasi_rak: doc.data().lokasi_rak,
              nomor_arsip: doc.data().nomor_arsip,
              keterangan: doc.data().keterangan,
              time: doc.data().time,
              id: doc.id
            }
            tes.push(data)
          })
        })
      this.get_data = tes
    }
  }
}

</script>

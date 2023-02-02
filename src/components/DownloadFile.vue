<template>
  <v-app>
    <v-toolbar dark src="https://wallpaperaccess.com/full/1153698.jpg">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>İleri Web Programlama Final Projesi</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="pa-1">
      <v-img src="https://wallpaperaccess.com/full/4265263.jpg" height="760px">
        <v-container class="fill-height">
          <v-row no-gutters>
            <v-col cols="12">
              <v-form class="ml-14 mr-16">
                <v-container>
                  <v-row>
                    <v-col class="mb-n5">
                      <v-select
                        :items="sinifListeleri"
                        v-model="selected"
                        @change="currentDataItems"
                        filled
                        label="Verilerini indirmek istediğiniz sınıfı seçin"
                        dense
                        background-color="#FFFFFF"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-row class="center" justify="center">
                <v-btn
                  medium
                  color="success"
                  class="ma-2 white--text"
                  @click="generateExcel"
                >
                  Excel Dosyası Oluştur
                </v-btn>
                <download-excel
                  :data="dataExcel"
                  :fields="fieldsExcel"
                  :name="fileNameExcel"
                  :header="headerExcel"
                >
                  <v-btn medium color="blue-grey" class="ma-2 white--text">
                    İNDİR
                  </v-btn>
                </download-excel>
              </v-row>
              <v-card class="mr-16 ml-16 mt-4" color="white" height="580">
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-card>
                        <v-container
                          class="grey lighten-5 overflow-y-auto"
                          style="max-height: 400px"
                          id="scroll-target"
                        >
                          <v-data-table
                            dense
                            :headers="headers"
                            :items="tableData"
                            :items-per-page="5"
                            class="elevation-1"
                          >
                            >
                            <template>
                              <tbody></tbody>
                            </template>
                          </v-data-table>
                        </v-container>
                      </v-card>
                    </v-col>
                    <v-card-text
                      >Toplam Öğrenci Sayısı : {{ toplamOgr }}</v-card-text
                    >
                    <v-card-text class="mt-n8"
                      >Ders Adı : {{ dersAdi }}</v-card-text
                    >
                    <v-card-text class="mt-n8"
                      >Öğretim Elemanı Adı : {{ ogrElemanAdi }}</v-card-text
                    >
                    <v-card-text class="mt-n8"
                      >Sınav Tipi : {{ sinavTipi }}</v-card-text
                    >
                    <v-card-text class="mt-n8"
                      >Sınav Tarihi : {{ sinavTarihi }}</v-card-text
                    >
                    <v-card-text class="mt-n8"
                      >Sınavın Saati : {{ sinavSaati }}</v-card-text
                    >
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-card>
  </v-app>
</template>

<script>
/* eslint-disable prettier/prettier */
import firebase from "firebase/compat/app";
import "firebase/compat/database";
export default {
  data() {
    return {
      dataFromDB: "",
      sinifListeleri: [],
      tableData: [],
      headers: [
        { text: "Öğrenci No", value: "1" },
        { text: "Adı Soyadı", value: "0" },
      ],
      selected: "",
      toplamOgr: 0,
      dersAdi: "-",
      ogrElemanAdi: "-",
      sinavTipi: "-",
      sinavSaati: "-",
      sinavTarihi: "-",
      headerExcel: "",
      dataExcel: {},
      fieldsExcel: {
        "Sıra No": "no",
        "Adi Soyadi": "adSoyad",
        "Ogrenci No": "ogrNo",
        "Imza": "imza",
      },
      fileNameExcel:"",
    };
  },
  methods: {
    getDataFromDB() {
      const dbRef = firebase.database().ref();
      dbRef
        .child("bilgiler")
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.dataFromDB = snapshot.toJSON();
            for (let obj in this.dataFromDB) {
              if (this.containsNumbers(obj)) {
                this.sinifListeleri.push(obj);
              }
            }
            //console.log(parsedobj[this.sinifListeleri[0]]);
          } else {
            this.$alert(
              "Veritabanında veri yok! Lütfen bu modülü kullanmadan önce bir excel dosyası yükleyin",
              "Hata",
              "warning"
            ).then(() => {
              this.$router.push("/");
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    containsNumbers(str) {
      return /\d/.test(str);
    },
    currentDataItems() {
      if (this.fileNameExcel == ""){
        console.log(this.selected);
        this.tableData = [];
        for (let i in this.dataFromDB[this.selected]) {
          let data = Object.values(this.dataFromDB[this.selected][i]);
          this.tableData.push(data);
        }
        this.dersAdi = this.dataFromDB.dersAdi;
        this.toplamOgr = this.tableData.length;
        this.ogrElemanAdi = this.dataFromDB.ogretimElemanAdi;
        this.sinavTipi = this.dataFromDB.sinavTipi;
        this.sinavTarihi = this.dataFromDB.sinavTarihi;
        this.sinavSaati = this.dataFromDB.sinavSaati;
      }else{
        this.$alert(
          "Bir Excel dosyası oluşturduktan sonra sınıfı değiştiremezsiniz! Başka bir sınıfın Excel dosyasını oluşturmak için lütfen sayfayı yeniden yükleyin.",
          "Hata",
          "warning"
        );
      }

    },
    generateExcel() {
      if (this.tableData.length == 0){
        this.$alert(
          "Excel Dosyasını Oluşturmadan Önce Lütfen Bir Sınıf Seçiniz!",
          "Hata",
          "warning"
        );
      }else{
        let len = this.tableData.length;
        let ogrdata = [];
        for (let j = 0; j < len; j++) {
          var data = this.tableData.shift();
          ogrdata.push({
            no: j + 1,
            adSoyad: data[0],
            ogrNo: data[1],
            imza: "",
          });
          let veri = ({
            adSoyad: data[0],
            ogrNo: data[1],
          });
          let veri2 = Object.values(veri);
          this.tableData.push(veri2);
        }
        this.headerExcel = "Kırklareli Üniversitesi\r\n" + this.dersAdi + " " + this.sinavTipi + "\r\n" + this.sinavTarihi + " " + this.sinavSaati + "\r\n" + this.ogrElemanAdi + "\r\n" + this.selected + " Numaralı Sınıf";
        this.fileNameExcel = this.selected + " Numaralı Sınıf Bilgileri";
        this.dataExcel = ogrdata;
        console.log(this.headerExcel);
        this.$alert(
          "Excel Dosyası Başarıyla Oluşturuldu! Dosyayı İndirmek İçin İndir Butonuna Tıklayabilirsiniz",
          "",
          "success"
        )
      }
    },
  },
  beforeMount() {
    this.getDataFromDB();
  },
};
</script>

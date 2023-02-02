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
                    <v-col cols="11">
                      <v-text-field
                        v-model="searchedItem"
                        label="Öğrenci Numarası"
                        solo
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="indigo"
                        @click="searchItems"
                      >
                        <v-icon dark> mdi-magnify </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <div class="text-right mr-16">
                <v-btn
                  color="blue-grey"
                  class="ma-2 white--text"
                  @click="dosyaIndir"
                >
                  İNDİR
                </v-btn>
              </div>
              <div>
                <v-card
                  class="mt-2 ml-16 mr-16 align-center"
                  color="white"
                  height="400"
                >
                  <v-container class="grey lighten-5" id="cardExam">
                    <v-row no-gutters>
                      <v-col
                        class="mt-4"
                        cols="12"
                        align="center"
                        justify="center"
                      >
                        <v-img
                          src="https://media.neliti.com/media/organisations/logo-None-kirklareli-university.png"
                          max-height="150"
                          max-width="150"
                        ></v-img>
                      </v-col>
                      <v-col
                        class="mt-4"
                        cols="12"
                        align="center"
                        justify="center"
                      >
                        <h2>KİRKLARELİ ÜNİVERSİTESİ</h2>
                      </v-col>
                      <v-col
                        class="mt-4"
                        cols="12"
                        align="center"
                        justify="center"
                      >
                      </v-col>
                      <v-col class="mt-4" cols="12" sm="6">
                        <v-card class="pa-2" outlined tile
                          >Adı Soyadı: {{ adSoyad }}
                        </v-card>
                      </v-col>
                      <v-col class="mt-4" cols="12" sm="6">
                        <v-card class="pa-2" outlined tile
                          >Öğrenci No: {{ ogrNo }}
                        </v-card>
                      </v-col>
                      <v-col class="mt-4" cols="12" sm="6">
                        <v-card class="pa-2" outlined tile
                          >Ders Adı: {{ dersAdi }}
                        </v-card>
                      </v-col>
                      <v-col class="mt-4" cols="12" sm="6">
                        <v-card class="pa-2" outlined tile
                          >Sınav Tipi: {{ sinavTipi }}
                        </v-card>
                      </v-col>
                      <v-col class="mt-4" cols="12" sm="6">
                        <v-card class="pa-2" outlined tile
                          >Sınav Tarih: {{ sinavTarihi }}
                        </v-card>
                      </v-col>
                      <v-col class="mt-4" cols="12" sm="6">
                        <v-card class="pa-2" outlined tile
                          >Sınav Saati: {{ sinavSaati }}
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </div>
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
var htmlToImage = require('html-to-image');
export default {
  data: function () {
    return {
      dataFromDB: "",
      sinifListeleri: [],
      tableData: [],
      ogrVeriler: {},
      search: "",
      dersAdi: "-",
      ogrNo: "-",
      adSoyad: "-",
      sinavTipi: "-",
      sinavSaati: "-",
      sinavTarihi: "-",
      searchedItem:"",
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
            let ogrveri = [];
            for (let x in this.sinifListeleri){
              let classRef = dbRef.child("bilgiler").child(this.sinifListeleri[x]);
              classRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var childData = childSnapshot.val();
                  ogrveri.push({
                    adSoyad : childData.adSoyad,
                    ogrNo : childData.ogrNo
                  })
                });
              });
            }
            console.log(ogrveri);
            this.ogrVeriler = ogrveri;
            console.log(this.ogrVeriler);
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
    searchItems() {
      console.log(this.searchedItem);
      let veri = this.ogrVeriler.find(ogr => ogr.ogrNo === this.searchedItem);
      if (veri != null ){
        this.ogrNo = this.searchedItem;
        this.adSoyad = veri.adSoyad;
        this.dersAdi = this.dataFromDB.dersAdi;
        this.sinavTipi = this.dataFromDB.sinavTipi;
        this.sinavTarihi = this.dataFromDB.sinavTarihi;
        this.sinavSaati = this.dataFromDB.sinavSaati;
      }else{
        this.$alert(
          "Girilen öğrenci numarası veritabanında bulunamadı!",
          "Hata",
          "warning"
        );
      }
    },
    dosyaIndir(){
      if(this.ogrNo != "-" && this.adSoyad != "-"){
        htmlToImage.toJpeg(document.getElementById('cardExam'), { quality: 0.95 })
          .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'yakaKartı.jpeg';
            link.href = dataUrl;
            link.click();
          })
      }else{
        this.$alert(
          "Lütfen dosyayı indirmeden önce öğrenci numarası arayın!",
          "Hata",
          "warning"
        );
      }
    },
  },
  beforeMount() {
    this.getDataFromDB();
  },
};
</script>

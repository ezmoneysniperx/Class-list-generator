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
              <h1 class="white--text text-center font-weight-medium mb-2">
                Import Excel Document
              </h1>
            </v-col>
            <v-col cols="12">
              <div class="ml-16 mr-16">
                <v-file-input
                  color="white"
                  placeholder="Upload your documents"
                  label="File input"
                  prepend-icon="mdi-paperclip"
                  type="file"
                  id="fileUpload"
                  ref="file"
                  accept=".xls, .xlsx, .csv"
                  @change="onFileChange"
                >
                  <template v-slot:selection="{ text }">
                    <v-chip small label color="white">
                      {{ text }}
                    </v-chip>
                  </template>
                </v-file-input>
              </div>

              <v-card class="mr-16 ml-16 mt-2" color="white" height="580">
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="8">
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
                            <tbody>
                              <tr v-for="(item, key) in tableData" :key="key">
                                <td>{{ item[0] }}</td>
                                <td>{{ item[1] }}</td>
                                <td>{{ item[2] }}</td>
                              </tr>
                            </tbody>
                          </v-data-table>
                        </v-container>
                      </v-card>
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
                    </v-col>
                    <v-col cols="3" class="ml-13">
                      <v-card-text>Sınıfların Listesi</v-card-text>
                      <v-card>
                        <v-container
                          class="grey lighten-5 overflow-y-auto"
                          style="max-height: 375px"
                          id="scroll-target"
                        >
                          <v-row no-gutters style="height: 1000px">
                            <v-container
                              fluid
                              v-for="sinif in siniflar"
                              :key="sinif.sinif"
                            >
                              <v-checkbox
                                :label="`${sinif.sinif}, ${sinif.kapasite}`"
                                v-model="secilenSiniflar"
                                :value="sinif"
                                @change="onCheckboxChange"
                              ></v-checkbox>
                            </v-container>
                          </v-row>
                        </v-container>
                      </v-card>
                      <v-card-text
                        >Seçilen Kontenjan : {{ toplamKontenjan }}</v-card-text
                      >
                      <v-btn
                        small
                        color="blue-grey"
                        class="ma-2 white--text mt-n1"
                        height="50"
                        @click="kaydet"
                      >
                        <v-icon left dark> mdi-pencil-box </v-icon>
                        Rastgele Dağıt ve Kaydet
                      </v-btn>
                    </v-col>
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
import * as XLSX from "xlsx";
//import csv2json from "csvjson-csv2json";
//import { Parser } from "json2csv";
//import axios from "axios";
import crud from "../services/CRUD";

export default {
  data: function () {
    return {
      files: "",
      dataExcel: [],
      tableData: [],
      headers: [
        { text: "SN", value: "0" },
        { text: "Öğrenci No", value: "1" },
        { text: "Adı Soyadı", value: "2" },
      ],
      siniflar: [
        {
          sinif: 101,
          kapasite: 38,
        },
        {
          sinif: 102,
          kapasite: 40,
        },
        {
          sinif: 103,
          kapasite: 34,
        },
        {
          sinif: 104,
          kapasite: 30,
        },
        {
          sinif: 105,
          kapasite: 40,
        },
        {
          sinif: 106,
          kapasite: 24,
        },
        {
          sinif: 107,
          kapasite: 24,
        },
        {
          sinif: 108,
          kapasite: 30,
        },
        {
          sinif: 109,
          kapasite: 34,
        },
        {
          sinif: 201,
          kapasite: 38,
        },
        {
          sinif: 202,
          kapasite: 40,
        },
        {
          sinif: 203,
          kapasite: 34,
        },
        {
          sinif: 204,
          kapasite: 20,
        },
        {
          sinif: 205,
          kapasite: 20,
        },
        {
          sinif: 206,
          kapasite: 50,
        },
        {
          sinif: 207,
          kapasite: 44,
        },
        {
          sinif: 208,
          kapasite: 22,
        },
        {
          sinif: 209,
          kapasite: 20,
        },
      ],
      secilenSiniflar: [],
      toplamOgr: 0,
      toplamKontenjan: 0,
      dersAdi: "-",
      ogrElemanAdi: "-",
      sinavTipi: "-",
      sinavSaati: "-",
      sinavTarihi: "-",
    };
  },
  methods: {
    onFileChange() {
      this.file = event.currentTarget.files
        ? event.currentTarget.files[0]
        : null;
      if (this.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {
            type: "binary",
            cellDates: true,
            dateNF: "yyyy/mm/dd;@",
          });
          /* Get worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          this.dataExcel = XLSX.utils.sheet_to_json(ws, { header: 1 });
          this.tableData = XLSX.utils.sheet_to_json(ws, { header: 1 });
          this.tableData.splice(0, 1);
          /*Details*/
          this.toplamOgr = this.tableData.length;
          try {
            this.dersAdi = this.dataExcel[0][6];
            this.ogrElemanAdi = this.dataExcel[1][6];
            this.sinavTipi = this.dataExcel[2][6];
            this.sinavSaati = this.dataExcel[4][6].toLocaleTimeString();
            this.sinavTarihi = this.dataExcel[3][6].toDateString();
          } catch (err) {
            this.tableData = [];
            this.$alert(
              "Yüklenen dosya istenilen biçimde değil!",
              "Hata",
              "warning"
            ).then(() => {
              location.reload();
            });
          }
          console.log(this.tableData);
        };

        reader.readAsBinaryString(this.file);
      }
    },
    onCheckboxChange() {
      this.toplamKontenjan = 0;
      for (var x in this.secilenSiniflar) {
        this.toplamKontenjan += this.secilenSiniflar[x].kapasite;
      }
    },
    kaydet() {
      if (this.toplamOgr > this.toplamKontenjan) {
        this.$alert(
          "Öğrenci sayısı seçilen sınıf kapasitesinin toplamından daha fazladır, lütfen daha fazla sınıf seçin!",
          "Hata",
          "warning"
        );
      } else if (this.tableData.length === 0) {
        this.$alert(
          "Excel verileri bulunamadı! Lütfen bir excel verisi yükleyin",
          "Hata",
          "warning"
        );
      } else {
        var Data = {
          dersAdi: this.dersAdi,
          ogretimElemanAdi: this.ogrElemanAdi,
          sinavTipi: this.sinavTipi,
          sinavTarihi: this.sinavTarihi,
          sinavSaati: this.sinavSaati,
        };

        for (let i = 0; i <= this.secilenSiniflar.length; i++) {
          if (this.tableData.length === 0) {
            break;
          }
          var sinifAdi = [this.secilenSiniflar[i].sinif];
          //eval("var " + sinifAdi + "= " + "[]" + ";");
          this[sinifAdi] = [];
          for (let j = 0; j <= this.secilenSiniflar[i].kapasite; j++) {
            if (this.tableData.length === 0) {
              break;
            }
            var ogrData = this.tableData.shift();
            this[sinifAdi].push({
              adSoyad: ogrData[2],
              ogrNo: ogrData[1],
            });
          }
          Data[sinifAdi] = this[sinifAdi];
        }
        console.log(Data);
        crud
          .create(Data)
          .then(() => {
            this.$alert(
              "Veriler Veritabanına Başarıyla Yüklendi!",
              "",
              "success"
            ).then(() => {
              this.$router.push("/");
            });
            this.secilenSiniflar = [];
            this.dataExcel = [];
            this.toplamOgr = 0;
            this.toplamKontenjan = 0;
            this.dersAdi = "-";
            this.ogrElemanAdi = "-";
            this.sinavTipi = "-";
            this.sinavSaati = "-";
            this.sinavTarihi = "-";
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

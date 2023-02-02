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
    <v-row no-gutters>
      <v-col lg="4">
        <v-card class="pa-1">
          <v-img
            src="https://wallpaperaccess.com/full/4265263.jpg"
            height="755px"
          >
            <v-container class="fill-height">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="ma-2"
                      outlined
                      icon
                      fab
                      dark
                      x-large
                      @click="importExcel()"
                    >
                      <v-icon x-large>mdi-file-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12">
                  <h3
                    class="white--text text-center font-weight-medium font-italic mt-2"
                  >
                    Import Excel Document
                  </h3>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-col>
      <v-col lg="4">
        <v-card class="pa-1">
          <v-img
            src="https://wallpaperaccess.com/full/4265263.jpg"
            height="755px"
          >
            <v-container class="fill-height">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="ma-2"
                      outlined
                      icon
                      fab
                      dark
                      x-large
                      @click="examCard()"
                    >
                      <v-icon x-large>mdi-account-details</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12">
                  <h3
                    class="white--text text-center font-weight-medium font-italic mt-2"
                  >
                    Download Student Exam Card
                  </h3>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-col>
      <v-col lg="4">
        <v-card class="pa-1">
          <v-img
            src="https://wallpaperaccess.com/full/4265263.jpg"
            height="755px"
          >
            <v-container class="fill-height">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-card-actions class="justify-center">
                    <v-btn
                      class="ma-2"
                      outlined
                      icon
                      fab
                      dark
                      x-large
                      @click="fileDownload()"
                    >
                      <v-icon x-large>mdi-file-download</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12">
                  <h3
                    class="white--text text-center font-weight-medium font-italic mt-2"
                  >
                    Download Class List Document
                  </h3>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  name: "App",
  methods: {
    importExcel() {
      this.$router.push("/importexcel");
    },
    fileDownload() {
      this.$router.push("/filedownload");
    },
    examCard() {
      this.$router.push("/examcard");
    },
  },
};
</script>

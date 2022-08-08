var app = new Vue({
  el: "#vuejify",
  mounted() {
    this.webViews = document.getElementsByTagName("webview");
    for (let j = 0; j < this.webViews.length; j++) {
      let ls_link = localStorage.getItem("link" + (j + 1));
      if (ls_link) {
        this.setTLink(j, ls_link);
      }
      this.webViews[j].addEventListener("dom-ready", () => {
        let t_link = this.webViews[j].getURL();
        if (t_link.startsWith("file://")) {
          return;
        }
        this.setTLink(j, t_link);
      });
    }
  },
  data() {
    return {
      webViews: [],
      link1: "https://google.com",
      link2: "https://google.com",
      link3: "https://google.com",
      link4: "https://google.com",
    };
  },
  methods: {
    go_link(num = 1) {
      let t_link = this.getTLink(num);
      if (t_link != "") {
        this.webViews[num - 1].loadURL(t_link);
      }
    },
    save_link(num = 1) {
      let t_link = this.getTLink(num);
      if (t_link != "") {
        localStorage.setItem("link" + num, t_link);
      }
    },
    getTLink(num = 1) {
      let t_link = "";
      switch (num) {
        case 1:
          t_link = this.link1.trim();
          break;
        case 2:
          t_link = this.link2.trim();
          break;
        case 3:
          t_link = this.link3.trim();
          break;
        case 4:
          t_link = this.link4.trim();
          break;
        default:
          break;
      }
      return t_link;
    },
    setTLink(num = 1, val = "") {
      switch (num) {
        case 0:
          this.link1 = val;
          break;
        case 1:
          this.link2 = val;
          break;
        case 2:
          this.link3 = val;
          break;
        case 3:
          this.link4 = val;
          break;
        default:
          break;
      }
    },
    go_back_link(num = 1) {
      if (this.webViews[num - 1].canGoBack()) {
        this.webViews[num - 1].goBack();
      }
    },
  },
});

let listner = null;

export default {
  init(l) {
    listner = l;
  },

  restart() {
    listner();
  }
};

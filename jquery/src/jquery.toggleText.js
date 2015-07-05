jQuery.fn.extend({
  toggleText: function(a, b) {
    var text = this.text();

    if (text !== a && text !== b) {
      this.text(a);
    } else if (text === a) {
      this.text(b);
    } else if (text === b) {
      this.text(a);
    }

    return this;
  }
});

module.exports = jQuery.toggleText;

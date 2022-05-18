//jshint esversion:6


module.exports.getDate = function () {// perintah module untuk memberi tahu ke apps.js file ini

    const today = new Date();

    const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

return today.toLocaleDateString("en-US", options);

}
// penulisan ini sama dengan getdate
//module juga bisa dihapus untuk mempersingkat kode
exports.getDay = getDay;

function getDay(){

    const today = new Date();

    const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);

}

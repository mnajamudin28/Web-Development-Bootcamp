//jshint esversion:6
// perintah module untuk memberi tahu ke apps.js file ini

module.exports.getDate = function(){

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

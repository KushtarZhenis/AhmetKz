document.addEventListener("DOMContentLoaded", function(){
  const lang = document.querySelector("#languages");
  lang.addEventListener("change", function(){
    let selectedValue = this.value;
    

    console.log(selectedValue);
  });
});

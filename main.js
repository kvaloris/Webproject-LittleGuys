
    const button = document.querySelector('.translate');
    const translated_text = document.querySelector('.output > p');
    const bubble = document.querySelector('.bubble');
    const img = document.querySelectorAll('.perso > img');
    const img2 = document.querySelectorAll('.perso2 > img');
    const selected_name = document.querySelector('.selected_name');
    const title = document.querySelector('.title');
    const bottom_box = document.querySelector('.bottom_box');
    const talklike = document.querySelector('.talklike');
    const to_translation = document.querySelector('.to_translation');
    const explanation = document.querySelector('.explanation');
    const band = document.querySelectorAll('.band');
    const perso = document.querySelector('.perso');
    const perso0 = document.querySelector('.perso0');
    const minion = document.querySelector('.minion');
    const minion2 = document.querySelector('.minion2');
    const perso2 = document.querySelector('.perso2');
    //----------------------------------------------------------
    // add a constant value for the banner-div(rotating part)
    // when click on the arrow button
    /*
    const banner = document.querySelector('#banner');
    */
    //add constant values for minion0 groot0 yoda0
    /*
    const minion0 = document.querySelector('.minion0');
    const groot0 = document.querySelector('.groot0');
    const yoda0 = document.querySelector('.yoda0');
    */
    // ----------------------------------------------------------



// SETTINGS FOR THE MAIN PAGE

    bottom_box.style.display = "none";
    talklike.style.display = "none";
    document.body.classList.add("beige");
    bubble.style.display = "none";
    perso.classList.add("no_display");
    perso2.classList.toggle("no_display");

    //----------------------------------------------------------
    //to make the perso0-div invisible when the images rotate
    /*
    minion0.style.display = "none";
    groot0.style.display = "none";
    yoda0.style.display = "none";
    */
    //----------------------------------------------------------




// GO FROM THE MAIN PAGE TO THE TRANSLATION PAGE
// When you click on the arrow button of the main page, it will display the translation page
// I HAVEN'T DONE THE ANIMATION (the function below only display the translation page, there is no animation)
// BUT WE CAN DO AN ANIMATION FOR THE TRANSITION BETWEEN THE 2 PAGES

    function display_translation() {

        title.style.display = "none";
        explanation.style.display = "none";
        to_translation.style.display = "none";
        band.forEach(element=>element.style.display="none");
        document.body.classList.remove("beige");
        document.body.classList.add("jaune");
        perso.classList.toggle("no_display");
        perso.classList.toggle("flex");
        perso0.style.display = "none";
        bottom_box.style.display = "grid";
        talklike.style.display = "flex";
        bubble.style.display = "flex";
        perso2.classList.toggle("no_display");
        perso2.classList.toggle("grid");

        //----------------------------------------------------------
        // add  display:none css to make the banner-div disappear
        // when click on the arrow button
        /*
        banner.classList.add("no_display");
        */
        // ----------------------------------------------------------


    }
    to_translation.addEventListener('click', display_translation);

//CONNECTION TO THE API

    function displayBubble() {
      var intext = document.querySelector('.input').value;
      var selected = document.querySelector('.selected_name').textContent;

      if(selected=="Groot") {
              var url ="https://api.funtranslations.com/translate/groot.json";
          }
      else if(selected=="Yoda") {
              var url = "https://api.funtranslations.com/translate/yoda.json";
          }
      else if(selected=="a Minion") {
              var url = "https://api.funtranslations.com/translate/minion.json";
          }

      $.ajax({
          type:'post',
          url: url,
          data:{
              text:intext

          },
          success: function({contents}){
            var translate = contents["translated"];
            //modify the ID between the parenthesis to put the translate in the right div
            translated_text.innerHTML = translate;

          },


      }).done(function(transl){
            nbOfTries();
      }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
            if(jqXHR.status==429) {
                alert("You have used up all of your tries. Wait 1 hour for 5 new tries.")
            }
        })
    }
    button.addEventListener('click',displayBubble);

// SELECT A CHARACTER (IN MIN-WIDTH = 768px)
// The default selected character is the minion which has the class "selected"

    function selectPerso() {
        let selected = this;
        let listofimg = this.parentNode.children;
        console.log(selected);
        for(i=0;i<3;i++) {

            if(selected==listofimg[i]) {
                if(i==0) {
                    a=1;
                    b=2;
                    selected_name.innerHTML = "a Minion";
                    translated_text.innerHTML = "";
                }
                if(i==1) {
                    a=0;
                    b=2;
                    selected_name.innerHTML = "Yoda";
                    translated_text.innerHTML = "";
                }
                if(i==2) {
                    a=1;
                    b=0;
                    selected_name.innerHTML = "Groot";
                    translated_text.innerHTML = "";
                }
                listofimg[i].classList.add("selected");
                listofimg[a].classList.remove("selected");
                listofimg[b].classList.remove("selected");

            }
        }
    }
    img.forEach(element => element.addEventListener('click', selectPerso));
    img2.forEach(element => element.addEventListener('click', selectPerso));

    function FromImgtoImg2() {
        let selected = this;

        for(i=0;i<3;i++) {

            if(selected==img[i]) {
                if(i==0) {
                    a=1;
                    b=2;
                }
                if(i==1) {
                    a=0;
                    b=2;
                }
                if(i==2) {
                    a=1;
                    b=0;
                }

                img2[i].classList.add("selected");
                img2[a].classList.remove("selected");
                img2[b].classList.remove("selected");
            }
        }
    }
    img.forEach(element => element.addEventListener('click', FromImgtoImg2));

    function FromImg2toImg() {
        let selected = this;
        console.log(selected);
        for(i=0;i<3;i++) {

            if(selected==img2[i]) {
                if(i==0) {
                    a=1;
                    b=2;
                }
                if(i==1) {
                    a=0;
                    b=2;
                }
                if(i==2) {
                    a=1;
                    b=0;
                }
                img[i].classList.add("on");
                img[a].classList.remove("on");
                img[b].classList.remove("on");

            }
        }
    }
    img2.forEach(element => element.addEventListener('click', FromImg2toImg));

// SELECT ANIMATION FOR MAX-WIDTH = 768 px

    function selectAnim2() {

    }
    img2.forEach(element => element.addEventListener('click', selectPerso));

// MANAGE THE NUMBER OF TRIES FOR EACH OF THE 3 CHARACTERS
// When you click on the translate button, one heart disappears
// When all the hearts for one character have been used up, a pop up message will appear

    function nbOfTries() {
        let hearts_parent = document.querySelector(".nb_tries>div");
        let heart = document.querySelector(".nb_tries img");

        hearts_parent.removeChild(heart);
    }

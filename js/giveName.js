var GiveName = (function () {
    // zmienne globalne
    var streetsJSON;
    var streetToGuess = null;

    // obiekt z pathami svg
    var streets = {};

    var basicStyle = {
        //fill: "none",
        stroke: "#000000",
        "stroke-width": 13,
        "stroke-linejoin": "round",
        //cursor: "pointer"
    };
    var pointerStyle = {
        //fill: "none",
        stroke: "#41b51e",
        "stroke-width": 13,
        "stroke-linejoin": "round",
        cursor: "pointer"
    };

    // losuje ulicę z streetsJSON i zapisuje ją do HTMLa na górze
    function setStreet_giveName() {
        var minimum = 0;
        var maximum = streetsJSON.length - 1;
        var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        console.log(streetsJSON[randomNumber]);
        // $('#streetName-label').html(streetsJSON[randomNumber].full_name);    // widok
        // $('#streetName-label').attr('name', streetsJSON[randomNumber].name); // backend
        streetToGuess = streetsJSON[randomNumber];

        // jeżeli wywołano po klinkięciu "Losuj inną" a nie przy inicjalizacji
        if ($('svg').length!=0) {
            // wyczyść wszytkie
            for (var streetName in streets) {
                streets[streetName].attr(basicStyle);
            }

            // pokoloruj losową (streetToGuess ustawiona w setStreet_giveName)
            streets[streetToGuess.name].animate(pointerStyle, 250, function () {
                // callback
            });
        }
    }

    // przygotowuj odpowiedzi
    function prepareAnswers() {

      $('button').removeClass('btn-danger');
      $('button').removeClass('btn-success');

        answers = [];
        for (var i = 0; i < 3; i++) {
            var minimum = 0;
            var maximum = streetsJSON.length - 1;
            var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            if (((i == 0) || (i == 1 && streetsJSON[randomNumber] != answers[i - 1]) || (i == 2 && streetsJSON[randomNumber] != answers[i - 1] && streetsJSON[randomNumber] != answers[i - 2])) && streetsJSON[randomNumber] != streetToGuess) {
              answers[i] = (streetsJSON[randomNumber]);
            } else {
                i--;
                debugger;
            }
        }

        // podmień jedną z odpowiedzi odpowiedzią prawidłową
        var minimum = 0;
        var maximum = 3 - 1;
        var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        answers[randomNumber] = streetToGuess;
       
        var mobileVersion = isMobile();

        $('#1Answer-btn').html(mobileVersion ? answers[0]["simple_name"] : answers[0]["full_name"])
        $('#1Answer-btn').prop('name', answers[0]["name"])
        $('#2Answer-btn').html( mobileVersion ? answers[1]["simple_name"] : answers[1]["full_name"])
        $('#2Answer-btn').prop('name', answers[1]["name"])
        $('#3Answer-btn').html(mobileVersion ? answers[2]["simple_name"] : answers[2]["full_name"])
        $('#3Answer-btn').prop('name', answers[2]["name"])

        $('button.answer').off("click").click(function () {
          if ($(this).prop('name') == streetToGuess.name) {
            $(this).addClass('btn-success');
            setTimeout(function () {
              setStreet_giveName();
              prepareAnswers();
            }, 1250)
          }
          else {
            $(this).addClass('btn-danger');
          }
        });
    }

    // rysuje mapę i ustawia funkcję PAN, ZOOM, CLICK
    function drawMap_giveName() {
        // po imporcie z ReadySetRaphael:
        // (1) zamienić "var [nazwa ulicy]" na tablicowane streets["nazwa ulicy"]
        // (2) zwrócić uwagę na 11 listopada


        // LOADING, RAPHAEL
        var SVG_width = 1550;
        var SVG_height = 1170;
        rsr = Raphael('map-container', SVG_width, SVG_height); layer2 = rsr.set(); streets["sojek"] = rsr.path("m 242.90511,486.45254 -0.60547,3.65234 -3.98047,7.30469 0.27344,3.29297 13.64453,29.51172 26.64453,34.82422 9.41016,13.625 11.35937,16.91015").attr({ id: 'sojek', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sojek'); streets["boleslawa_prusa"] = rsr.path("M 1057.5301,936.08926 994.32311,923.1791").attr({ id: 'boleslawa_prusa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'boleslawa_prusa'); streets["krasek"] = rsr.path("m 270.55745,661.54238 25.44922,-4.84375 4.45313,0.51172 7.86718,2.43359 2.85157,2.22266 33.84372,40.01563").attr({ id: 'krasek', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'krasek'); streets["orla"] = rsr.path("m 457.61997,357.51894 -14.0664,8.5586 -12.5742,6.96094 -15.7735,8.03125 -10.9336,4.48046 -13.4101,5.08204 -20.6446,6.38281 -3.9922,0.1289 -39.0468,-1.875 -8.35159,-1.77343 -12.28515,-2.6211 -27.83985,-4.76172 -5.82031,-0.57421 -5.92969,-0.74219 -24.77343,-6.13281 -42.24219,-9.40625 -16.79688,-4.03125 -19.77734,-4.19532 -92.382815,-21.72656").attr({ id: 'orla', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'orla'); streets["mlochowska"] = rsr.path("m 859.15121,1085.1752 -7.3593,-1.0117 -25.961,0.2656 -41.47654,1.039 -10.5743,1.3946 -4.4257,-0.09 -11.4219,-1.3672 -0.6016,-0.09 -18.7109,0.1836 -30.5508,0.4101 m 296.69923,89.9183 -56.82809,-39.7304 -58.3477,-37.5625 -13.1835,-7.1836 -4.4844,-1.9532 -4.5469,-1.8203 -8.2266,-2.4023").attr({ id: 'mlochowska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'mlochowska'); streets["zygmunta_krasinskiego"] = rsr.path("m 1004.7684,1175.8275 18.6602,-82.1719 13.8437,-61.0038 m 0,0 17.9414,-85.07426 1.2735,-9.60156 1.0429,-1.88672").attr({ id: 'zygmunta_krasinskiego', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'zygmunta_krasinskiego'); streets["grodziska"] = rsr.path("m 204.88948,764.10098 -37.60937,16.85937 -5.76563,3.63281 -4.27734,2.69532 -68.031255,42.51562").attr({ id: 'grodziska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'grodziska'); streets["zamkowa"] = rsr.path("m 1276.4598,561.69473 -16.0429,-69.44532 -1.4024,-13.21484 0.3906,-33.1875 0.1133,-6.69922 1.3242,-30.46094").attr({ id: 'zamkowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'zamkowa'); streets["jeza"] = rsr.path("m 1259.5184,439.14788 75.6797,59.27734 20.1602,15.76563 28.6718,20.98437 5.3125,3.5625 2.7618,0.60547 m 0,0 6.9179,0.082 6.1758,-0.80859 6.6094,-1.44922").attr({ id: 'jeza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jeza'); streets["kolejowa"] = rsr.path("m 1242.5887,575.68691 27.9844,-3.82812 4.8399,0.25 4.5937,1.35156 101.9414,-18.625 32.1485,-6.55859 28.3476,-3.53125 3.9453,-0.58594").attr({ id: 'kolejowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'kolejowa'); streets["wierzbowa"] = rsr.path("m 1378.6942,611.32363 -82.082,13.42188").attr({ id: 'wierzbowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wierzbowa'); streets["bazantow"] = rsr.path("m 190.05745,590.32363 -37.625,0.29297 -27.61328,7.30469 -4.85156,0.76172 -5.58594,0.4414 -6.59375,-0.39062 -7.55859,-0.95703 -19.425785,-5.66407 -6.03125,-1.44921 -5.87891,-0.69141 -44.48047,-0.0898").attr({ id: 'bazantow', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'bazantow'); streets["piastowska"] = rsr.path("m 161.51448,784.59316 17.72657,29.14063 7.10156,13.32031 3.62109,8.79688 4.15625,24.34375 -0.85156,8.98437 -0.29297,14.19922 0.33984,10.01562").attr({ id: 'piastowska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'piastowska'); streets["sokola"] = rsr.path("m 152.31917,411.65176 68.36328,15.04687 51.92188,12.52735 4.63281,1.03515 8.89453,1.62891 31.87109,6.35937 21.92191,1.67578 20.4922,-1.33984 16.4843,-2.33594 9.5,-2.14062 22.8633,-6.46875 22.332,-7.89453 4.461,-1.94532 37.8203,-16.28906 16.7461,-9.05859 m -338.3047,9.19922 -92.238285,-21.19141").attr({ id: 'sokola', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sokola'); streets["warszawska"] = rsr.path("m 463.47937,662.1791 1.7109,-20.46875 4.0078,-21.02734 5.4805,-21.61719 2.0547,-6.75781 2.5234,-8.23047 3.5117,-9.375 6.5664,-13.76563 7.6836,-14.65234 6.3867,-11.21094 18.6407,-25.78515 15.0351,-15.875 11.7149,-12.13672 0.031,0.0391 5.4296,-4.49219 18.6954,-16.1289 14.4062,-10.59375 13.9961,-9.20704 15.6211,-8.3125 18.4102,-8.46875 16.1953,-6.48437 26.1172,-8.98438 13.4921,-2.88281").attr({ id: 'warszawska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'warszawska'); streets["orzechowa"] = rsr.path("m 771.17467,820.72598 1.7461,53.21875").attr({ id: 'orzechowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'orzechowa'); streets["kasztanowa"] = rsr.path("m 895.79191,852.99551 -0.8321,-5.51953 -5.4843,-54.08594 -8.5743,-45.40235 -10.8554,-72.01562").attr({ id: 'kasztanowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'kasztanowa'); streets["brzozowa"] = rsr.path("m 971.33481,650.05019 30.64459,70.25 53.5195,117.61719").attr({ id: 'brzozowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'brzozowa'); streets["modrzewiowa"] = rsr.path("m 764.29577,756.96816 20.1171,1.47266 10.8633,-0.13281 32.63674,-2.6836 21.8907,-1.99218 11.4805,-1.78907 19.6171,-3.85547 55.0274,-12.82812 66.05079,-14.85938 59.5507,-13.13671 81.586,-18.33985 51.8945,-11.51562 67.1055,-15.1836 m -544.00783,88.13672 27.7109,3.84766 18.4766,2.85937 m -46.1875,-6.70703 -2.0625,-0.20312 -7.7188,-1.31641 -12.4492,-2.52344 -10.9375,-4.23437 -8.7031,-4.27735 -5.0586,-4.42187 -5.0039,-5.78906 -2.7735,-4.76172 -2.2343,-6.36719 -0.1485,-8.75781").attr({ id: 'modrzewiowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'modrzewiowa'); streets["akacjowa"] = rsr.path("m 707.66687,691.47207 45.1406,1.28125 12.6523,0.61719 50.0313,-8.22266 54.55474,-9.17578 24.1367,-3.71094 7.9766,-2.26953 4.6914,-2.70703 11.6054,-6.85156 6.1875,-2.0586 7.7735,-1.51562 38.9179,-6.8086 62.47659,-10.67578 80.207,-13.50781 67.0117,-12.11719 67.543,-10.79687 m -594.30473,106.30859 2.832,-0.69531 3.918,-0.95703 49.918,-9.07031 2.5312,-0.46094").attr({ id: 'akacjowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'akacjowa'); streets["cicha"] = rsr.path("m 1351.1005,887.89394 12.0273,-78.73437 4.8906,-30.39063 0.098,-14.30078 -6.6914,-96.66015 m 18.8786,-13.72657 -3.0742,-4.32421 -0.6719,-3.90235 2.1367,-34.53125 3.2539,-56.48828").attr({ id: 'cicha', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'cicha'); streets["podlesna"] = rsr.path("m 1446.3895,544.15957 -7.5078,53.61328 m 0,0 -10.9414,78.86328 -11.4727,70.99219 -23.0273,151.01953").attr({ id: 'podlesna', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'podlesna'); streets["losia"] = rsr.path("m 1528.1786,418.90176 -37.9414,-0.96875 -56.7969,-2.01563 -76.2773,-2.85547 -96.3204,-4.375").attr({ id: 'losia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'losia'); streets["wilcza"] = rsr.path("m 994.05751,498.49551 1.9531,-1.23438 23.28519,-49.14453 22.0078,-43.45703 21.1797,-44.12109").attr({ id: 'wilcza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wilcza'); streets["kukulek"] = rsr.path("m 56.319165,639.58535 30.91016,-0.53516 14.863285,-0.6289 22.17187,-1.74219 9.16016,-1.41406 14.10937,-3.3125 9.14454,-1.96875 8.19921,-1.13672 8.23047,-1.63672 17.14453,-5.47656 10.14844,-6.66406 1.42969,-2.42969 2.04687,-6.47656 2.35157,-4.82813 3.35547,-3.35937 3.48437,-1.80079 1.43359,-0.67578 33.16797,-7.44922 40.6211,-9.38671").attr({ id: 'kukulek', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'kukulek'); streets["wrobla"] = rsr.path("m 318.00276,448.24941 -11.97656,74.78125 0.0742,2.6875 0.95313,1.92969 37.27344,52.73047 7.3281,5.82812 47.2617,32.49219 64.5625,43.48047 3.25,2.19922").attr({ id: 'wrobla', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wrobla'); streets["szpakow"] = rsr.path("m 522.61997,445.19863 -11.3828,9.83594 -35.2305,50.17578 -25.4844,23.00391 -16.3711,20.82422 -6.9297,10.57421 -12.5976,19.06641 -3.3594,7.55859 -2.8125,14.28125 -2.1836,6.46875 -7.3515,11.71094").attr({ id: 'szpakow', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'szpakow'); streets["henryka_sienkiewicza"] = rsr.path("m 703.63167,960.21426 77.9648,16.9414 63.86334,13.80864 64.7539,13.6484 63.4063,13.5937 63.65229,14.4454").attr({ id: 'henryka_sienkiewicza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'henryka_sienkiewicza'); streets["jasminowa"] = rsr.path("m 706.72537,1162.0502 -10.3515,-0.3437 -21.1992,0.4453 -24.9766,1.4648").attr({ id: 'jasminowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jasminowa'); streets["storczykow"] = rsr.path("m 695.79187,1004.7768 -114.086,-37.84379 -68.168,-34.85157 -95.3164,-6.96875 -45.7382,-3.88281 -58.55472,-3.96094 -5.6211,-1.58203 -80,-6.23437").attr({ id: 'storczykow', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'storczykow'); streets["krecia"] = rsr.path("m 1411.8075,537.16738 3.1719,-2.02734 2.8867,-3.78516 15.5742,-115.4375").attr({ id: 'krecia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'krecia'); streets["wiewiorek"] = rsr.path("m 679.88947,194.19473 70.9492,31.10546 146.02354,63.33204 19.0078,7.77734 60.9531,25.87109 26.92969,12.03516 58.7305,26.22266 16.789,7.0664 130.9375,56.82031 M 648.82697,147.3666 l 2.2266,7.08594 11.1836,27.69531 3.1757,4.47656 14.4766,7.57032 m 530.32033,230.23046 49.1953,21.42188 m -49.1953,-21.42188 11.5977,56.14063 13.2344,54.39453 m 0,0 6.1484,33.63672").attr({ id: 'wiewiorek', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wiewiorek'); streets["11_listopada"] = rsr.path("m 1313.3661,694.71816 -3.3867,-28.26953 -3.918,-15.38281 -9.4492,-26.32031 -16.6055,-51.28516 m 17.8516,298.86328 -1.5117,-5.01953 24.2031,-56.38281 1.3281,-7.04297 -8.5117,-109.16016").attr({ id: '11_listopada', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', '11_listopada'); streets["irysowa"] = rsr.path("m 544.45197,1096.726 -50.0156,10.4921 -12.6953,2.1016 -7.3789,0.6914 -8.043,-0.7461 -19.5547,-3.6719 -14.7969,-2.7695 -27.2968,-5.8555").attr({ id: 'irysowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'irysowa'); streets["rozana"] = rsr.path("m 636.76057,1092.6635 -2.4336,1.5078 -1.0937,2.4375 -3.6368,53.6836").attr({ id: 'rozana', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'rozana'); streets["sasanek"] = rsr.path("m 626.30357,910.6166 -44.5977,56.31641 -17.9297,19.02339 -27.2148,22.5899 -9.9492,3.1875 -7.2266,0.8008 -3.6523,-0.3789 -9.9102,-1.2578 -32.8789,-4.9961 -3.5273,-3.6524").attr({ id: 'sasanek', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sasanek'); streets["jaroslawa_iwaszkiewicza"] = rsr.path("m 718.36607,800.6791 -2.6797,-0.75391 -15.6133,-3.98828 -16.1914,-5.72265 -14.3359,-6.24219 -15.7032,-7.42188 -12.4179,-7.08984 -17.5352,-13.55469 -9.6914,-11.85937 -7.4336,-10.95703 -7.4336,-15.64844").attr({ id: 'jaroslawa_iwaszkiewicza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jaroslawa_iwaszkiewicza'); streets["klonowa"] = rsr.path("m 815.49107,685.14785 12.42184,70.47656 0.711,6.25782 -0.711,68.86328 -0.4414,4.49218").attr({ id: 'klonowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'klonowa'); streets["lisia"] = rsr.path("m 1165.7958,550.34707 -9.25,-46.42188 -12.5664,-55.57421").attr({ id: 'lisia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'lisia'); streets["juliana_ejsmonda"] = rsr.path("m 800.47937,894.6166 -4.3008,16.52344 -14.5821,66.01562 -23.664,108.24994").attr({ id: 'juliana_ejsmonda', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'juliana_ejsmonda'); streets["juliusza_slowackiego"] = rsr.path("m 994.32311,923.1791 -20.7031,95.0273 -25.6797,117.8907").attr({ id: 'juliusza_slowackiego', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'juliusza_slowackiego'); streets["sosnowa"] = rsr.path("m 1160.288,862.66348 70.2148,-9.63282 m -241.98829,22.08594 9.3086,4.33594 7.41409,1.72656 11.0508,1.59766 9.6484,-0.35157 134.3516,-19.76171 m 70.2148,-9.63282 35.3047,-4.36718 4.1289,-2.0625 1.7148,-2.67969 18.0899,-49.71485 0.4101,-4.1289 -15.8711,-73.51563 -12.164,-54.4375 -13.543,-59.17187 -4.6992,-21.16797 -1.2852,-6.09766").attr({ id: 'sosnowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sosnowa'); streets["rysia"] = rsr.path("m 905.52621,546.60879 48.1719,-23.33594").attr({ id: 'rysia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'rysia'); streets["wiazowa"] = rsr.path("m 1363.1278,809.15957 -41.25,-5.28125").attr({ id: 'wiazowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wiazowa'); streets["wschodnia"] = rsr.path("m 1177.9051,768.99551 -34.789,-80.17188 -29.0977,-62.95703 -5.7461,-29.39844 -0.3593,-2.05859").attr({ id: 'wschodnia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wschodnia'); streets["jaworowa"] = rsr.path("m 1033.8114,639.37441 27.7187,67.78907 41.2579,104.66015").attr({ id: 'jaworowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jaworowa'); streets["borsucza"] = rsr.path("m 670.24107,254.37051 210.45704,80.99609 160.60549,69.29297 102.6758,43.69141 77.8281,32.21484").attr({ id: 'borsucza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'borsucza'); streets["stanislawa_lilpopa"] = rsr.path("m 717.62387,820.63223 -2.4844,-0.375 -48.6328,-6.0625 -76.3945,-13.01172").attr({ id: 'stanislawa_lilpopa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'stanislawa_lilpopa'); streets["jaskolcza"] = rsr.path("m 344.32697,580.37832 8.3711,-62.14844 7.7188,-69.64453 5.8085,-51.44141 6.7696,-48.52343").attr({ id: 'jaskolcza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jaskolcza'); streets["jastrzebia"] = rsr.path("m 436.05747,427.80019 2.8945,38.23047 1.5117,6.46485 1.9297,3.36328 33.6133,29.35156").attr({ id: 'jastrzebia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jastrzebia'); streets["sarnia"] = rsr.path("m 696.07697,332.09707 -7.2969,1.85156 -5.2148,3.55078 -3.1719,4.46094 m 181.35164,50.37109 -165.66804,-60.23437 -5.9922,-4.90234 -5.2148,-5.33594 -8.6446,-10.79297 m 480.32043,192.85937 -73.3242,-29.86328 -63.9258,-25.94531 -47.06249,-20.20703 -110.4883,-35.57813").attr({ id: 'sarnia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sarnia'); streets["sowia"] = rsr.path("m 223.61214,703.89785 8.13281,36.15625").attr({ id: 'sowia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sowia'); streets["slowicza"] = rsr.path("m 144.35042,720.4291 23.76953,-5.5 55.49219,-11.03125 18.64844,-3.63281 3.70703,-0.71875 37.77734,-7.15235 4.21875,-0.29296 4.17188,0.35546 3.22265,1.35157 16.33203,11.01562 4.67969,2.51953 4.52344,1.59375 4.57418,0.77344 4.1563,-0.0469 4.2773,-1.20313 4.5586,-1.89844 4.3477,-2.80859 2.2148,-1.87109 2.168,-1.86719 22.0039,-20.65235 8.7695,-8.30078 4.6094,-3.32422 1.9063,-1.07031 1.6406,-0.92187 4.0117,-1.48828 m 147.4062,-9.74997 -45.5039,6.28906 -25.3046,3.58203 -24.9336,5.26562 -6.5625,1.38672 m 229.7382,-35.70703 -22.6601,3.21485 -54.7852,8.53515 -49.9883,7.4336 m -147.4062,9.75 3.2734,-0.58985 2.961,0.12891 3.7968,0.50781 20.8672,7.76953 2.7774,0.49219 3.8164,-0.0195 3.8203,-0.72656 3.7891,-0.78907").attr({ id: 'slowicza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'slowicza'); streets["ptasia"] = rsr.path("m 142.10042,464.39394 -0.11719,5.10938 2.19922,3.91797 10.33594,7.01172 22.86328,14.42578 6.41016,5.16797 5.05468,5.22656 2.25391,4.63281 1.30469,3.50391 0.65625,4.27734 -0.59766,5.04688 -4.5664,21.5 -0.26563,1.30078 8.54297,25.77734 0.0586,5.21875 -6.17578,13.8125 -0.41406,1.46875 0.83594,4.02735 11.35156,16.82031 m -1e-5,0 10.28516,14.66406 14.53125,19.94922 4.83984,7.81641 3.6875,7.20312 5.03906,13.81641 3.73438,13.85547 2.01953,9.60156 m -93.64844,-287.89453 11.04297,-50.6211 m -21.26172,103.36328 10.21875,-52.74218").attr({ id: 'ptasia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'ptasia'); streets["szczygla"] = rsr.path("m 35.139475,512.08535 45.36328,8.13672 5.91797,0.61719 5.73438,-0.40235 4.46875,-1.57812 4.054695,-2.11719 5.33593,-4.07422 4.07032,-2.03906 3.71484,-0.94531 3.92969,0.27734 16.85937,6.27734 8.84375,4.46875 7.67969,4.89844 15.09375,11.06641 8.38672,4.80859 5.49609,2.26953 4.58594,0.71485 3.22266,-0.25 8.92578,-1.29297 13.90234,-3.03125 41.51172,-9.67578 11.46484,0.55468 4.57813,-0.54687 8.90234,-1.04688 2.77344,-0.29687 17.04687,0.0859 10.05079,-1.31641 45.64452,-9.41797 44.9336,-21.73828 12.0547,-5.95312 12.2617,-6.63282 9.6641,-5.46093 8.8515,-5.94922 34.543,-24.94141 31.1562,-24.02344").attr({ id: 'szczygla', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'szczygla'); streets["koscielna"] = rsr.path("m 764.29577,756.96816 0.625,-22.15234 -0.074,-18.55859 -0.01,-1.01563 0.6211,-21.87109 m -1.1639,63.59765 -2.711,56.55469").attr({ id: 'koscielna', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'koscielna'); streets["ogrodowa"] = rsr.path("m 597.25277,388.63223 -43.125,32.13671 -26.0234,20.12891 -5.4844,4.30078").attr({ id: 'ogrodowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'ogrodowa'); streets["grabowa"] = rsr.path("m 1230.5028,853.03066 -5.3672,-37.19922 -13.75,-64.67187 -16.375,-73.85156 -13.9805,-63.5586").attr({ id: 'grabowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'grabowa'); streets["bobrowa"] = rsr.path("m 847.72941,434.14004 146.3281,64.35547").attr({ id: 'bobrowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'bobrowa'); streets["krolicza"] = rsr.path("m 1101.6083,564.42129 -7.2578,-39.25781 -11.1289,-51.10157 m 24.6914,120.34766 -6.3047,-29.98828").attr({ id: 'krolicza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'krolicza'); streets["wrzosowa"] = rsr.path("m 380.03007,855.54238 -7.5468,65.6875 -7.6641,65.10942 -4.8867,46.7148").attr({ id: 'wrzosowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wrzosowa'); streets["czeremchowa"] = rsr.path("m 469.41687,1002.2494 -51.1954,-77.13671").attr({ id: 'czeremchowa', parent: 'layer2', fill: 'none', "fill-opacity": '1', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'czeremchowa'); streets["kalinowa"] = rsr.path("m 549.15897,1200.9643 -56.1211,1.625").attr({ id: 'kalinowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'kalinowa'); streets["topolowa"] = rsr.path("m 955.18251,779.60098 34.0391,-15.55469 m 4.8359,108.44531 -23.625,-56.96875 -15.25,-35.92187 -19.2539,-44.44141 -29.0781,-67.875").attr({ id: 'topolowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'topolowa'); streets["konwalii"] = rsr.path("M 310.92073,1010.7846 262.8348,974.06582 m 51.09375,-56.79688 -51.09375,56.79688 -9.61719,10.62498").attr({ id: 'konwalii', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'konwalii'); streets["jalowcowa"] = rsr.path("m 698.04967,1033.1205 -163.6368,10.8828").attr({ id: 'jalowcowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jalowcowa'); streets["bluszczowa"] = rsr.path("m 711.42857,931.12441 -4.7696,-0.17968 -1.4296,-0.0625 -5.9297,-0.7461 -43.1797,-10.85937 -29.8164,-8.66016 -66.2657,-30.10156 -10.0234,-6.47656 -3.4023,-2.72657 -0.961,-2.8125 0.2539,-3.50781").attr({ id: 'bluszczowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'bluszczowa'); streets["stefana_zeromskiego"] = rsr.path("m 863.76841,902.81582 -18.3086,88.14848 -19.6289,93.4648").attr({ id: 'stefana_zeromskiego', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'stefana_zeromskiego'); streets["glogow"] = rsr.path("m 551.72147,1243.8041 -2.5625,-42.8398 -6.0586,-89.6524 0.043,-7.2617 1.3086,-7.3242 0.1133,-1.0704 -10.1523,-51.6523 -7.8008,-32.2695").attr({ id: 'glogow', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'glogow'); streets["adama_mickiewicza"] = rsr.path("m 931.51061,909.74941 -1.3086,1.59375 -19.9883,93.26954 -20.6211,93.9219").attr({ id: 'adama_mickiewicza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'adama_mickiewicza'); streets["jodlowa"] = rsr.path("m 947.20201,898.94082 -35.9297,-8.43359 -53.4531,-9.02344 -34.6211,-5.10938 -14.13674,-1.13281 -26.2539,-0.84375 -9.8867,-0.45312 -57.7891,-3.21875").attr({ id: 'jodlowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jodlowa'); streets["wladyslawa_stanislawa_reymonta"] = rsr.path("m 995.19811,919.03457 -14.0742,-4 -49.6133,-5.28516 m -218.17194,-3.33593 5.3399,-1.24219 64.2617,-8.23047 17.5391,-2.32422 11.0195,-0.9375 h 6.9883 l 20.82424,4.51953 24.457,4.61719 31.6328,4.33594 23.9805,0.48437 12.1289,2.11328").attr({ id: 'wladyslawa_stanislawa_reymonta', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'wladyslawa_stanislawa_reymonta'); streets["dzikow"] = rsr.path("m 1357.163,413.06191 -7.9219,62.60938 -2.461,8.53906 -11.582,14.21484").attr({ id: 'dzikow', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'dzikow'); streets["sepow"] = rsr.path("m 142.10042,464.39394 46.04297,8.92579 52.11328,10.92187 2.64844,2.21094 M 142.10042,464.39394 48.975415,444.92129").attr({ id: 'sepow', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'sepow'); streets["mysliwska"] = rsr.path("m 896.86221,288.63223 -16.1641,46.73437 -18.9531,56.96484 m 0,0 -14.0156,41.8086 -13.6758,39.13672 -4.4141,11.19531 -16.70704,46.89844 -17.8516,50.66797 -17.5312,51.49609").attr({ id: 'mysliwska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'mysliwska'); streets["glowna"] = rsr.path("m 679.88947,194.19473 -9.6484,60.17578 5.9843,56.69531 m 0,0 1.918,17.58203 2.25,13.3125 m 0,0 5.1172,30.28125 5.6797,33.51953 9.7266,62.14844 7.9257,49.14062 4.211,53.04688 13.1289,82.55469").attr({ id: 'glowna', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'glowna'); streets["jelenia"] = rsr.path("m 1235.0419,534.96035 -69.2461,15.38672 -64.1875,14.07422 m 0,0 -91.793,19.85156 -25.36329,5.62109 -53.9101,11.82813 -47.5,9.21094 -52.2813,9.83203 -37.76174,7.40234 -8.0781,2.55078 -7.3711,2.81641").attr({ id: 'jelenia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jelenia'); streets["debowa"] = rsr.path("m 1160.288,862.66348 -0.3047,-18.32813 -1.461,-10.94141 -2.9179,-9.23828 -15.5313,-33.28515").attr({ id: 'debowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'debowa'); streets["blonska"] = rsr.path("m 537.53787,654.50723 -0.4414,-10.01172 3.8594,-20.07422 5.7813,-20.23438 4.207,-11.5 6.2227,-13.52734 11.3593,-19.90625 10.2227,-15.45703 9.5976,-10.80078 3.9649,-4.21485 15.7461,-14.91797 11.7031,-9.65625 15.0742,-10.01171 14.1094,-8.15625 20.5234,-8.51954 13.75,-4.96093 17.6993,-4.64844 24.8945,-3.87891 10.875,-0.74609 15.8125,1.08594 20.2734,2.61718 20.3555,4.91407 15.8086,5.04687 20.70314,7.52344 33.2969,18.92187 14.9375,12.28125 13.6914,13.88282 13.9609,17.05078 10.6602,19.53515 14.3555,35.57813").attr({ id: 'blonska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'blonska'); streets["miejska"] = rsr.path("m 830.76061,620.76504 -7.87894,-12.32422 -7.3242,-9.03125 -10.1406,-9.10547 -10.336,-8.26562 -12.5508,-7.12891 -18.5781,-5.90234 -11.9219,-2.14454 -16.1015,-0.84765 -10.8008,1.26953 -12.0742,2.8125 -11.6289,4.42969 -10.6055,5.05859 -6.8555,4.01172 -7.0625,5.55469 -6.8281,5.80078 -5.3945,5.68359 -9.875,12.57422 -3.2149,3.99219 -9.2773,21.33594").attr({ id: 'miejska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'miejska'); streets["helenowska"] = rsr.path("m 883.04191,610.93301 -4.3828,-10.64453 -5.1524,-10.45704 -8.6055,-11.61718 -9.9414,-11.46094 -12.9609,-12.47656 -19.65634,-16.70313 -9.4101,-6.20312 m -225.4063,115.70312 1.3516,-9.01953 3.7187,-12.07812 6.6133,-17.2461 13.8946,-26.59375 5.375,-9.11328 3.7695,-4.29687 7.832,-8.79688 8.918,-7.78516 12.2461,-9.625 8.2773,-5.74609 8.0547,-4.96875 6.2969,-3.125 11.8945,-5.30469 12.125,-3.76172 10.9492,-2.5625 26.3008,-3.40234 12.5,0.25781 21.5703,3.13282 14.2149,3.35546 19.6875,6.48047 9.8164,4.4961").attr({ id: 'helenowska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'helenowska'); streets["lipowa"] = rsr.path("m 988.51451,875.1166 -3.3828,0.30078 -3.8906,-0.48047 -85.4492,-21.9414 -68.3204,-17.75782 -56.29684,-14.51171 -52.75,-14.04688").attr({ id: 'lipowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'lipowa'); streets["bukowa"] = rsr.path("m 1140.0731,790.87051 37.832,-21.875 m -189.39059,106.12109 5.543,-2.625 5.3008,-2.49219 56.14059,-32.08203 47.2891,-26.09375 37.2851,-20.95312 m 37.832,-21.875 33.4805,-17.83594 62.8945,-34.59766 39.086,-21.84375 48.0586,-26.91015 7.9492,-5.73438 10.9297,-7.99219 58.5781,-56.30859 6.9805,-6.10547 53.2422,-53.22265 3.1367,-2.9375 4.1133,-1.71485 4.6601,-0.86328 3.4336,-1.125 2.8086,-2.76562 m -585.74609,380.71093 15.6914,-10.80859 41.3125,-23.82422").attr({ id: 'bukowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'bukowa'); streets["kwiatowa"] = rsr.path("m 530.89337,864.39004 -17.3555,67.6914 -8.8085,23.64844 -3.2735,7.08203 -4.5781,7.27735 -4.3672,5.79687 -23.0937,26.36327 -3.8633,3.2735 -7.5586,3.9453 -49.5977,24.289 -6.1445,3.1055 -3.7383,0.8633 -38.582,-4.6719 -48.99221,-6.0078 m -78.80859,-242.30861 -10.07031,18.92969 -2.3086,6.32031 0.0703,9.11719 8.48437,90.34766 13.23828,62.74609 2.30469,4.01953 9.36719,8.47264 51.83594,44.2031 m 285.05864,-227.71089 -8.5586,5.24609 -6.6563,4.34766 -13.6953,10.50781 -5.043,3.98437 -7.5156,8.4336 -4.5781,5.97656 -4.6484,7.54297 -4.2735,7.66406 -3.0664,6.89453 -1.1836,2.60938").attr({ id: 'kwiatowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'kwiatowa'); streets["paproci"] = rsr.path("m 186.12776,1149.0932 77.46875,-72.1094 18.98047,-16.5469 4.61719,-4.8281 17.85938,-26.7149 2.99218,-1.4609 2.89453,-0.3867 m -5.88671,1.8476 5.86718,-18.1093 8.9961,-26.8711 3.28125,-2.1719 41.62109,4.5977 39.4219,3.6523 3.9336,2.0156 1.0273,3.3828 -0.8047,38.3672").attr({ id: 'paproci', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'paproci'); streets["brwinowska"] = rsr.path("m 419.53397,306.10488 20.6993,27.72656 m -52.7461,-75.92187 1.5781,4.34766 2.9023,4.94921 13.9844,20.09375 13.582,18.80469 m 20.6993,27.72656 17.3867,23.6875 33.0039,44.9336 15.539,21.07812 16.4571,21.66797 26.207,36.11719 39.5195,51.67969 30.1329,40.02734 33.1093,44.17969 13.3828,18.12109 19.3399,25.32813 m 0,0 3.7969,4.53906 1.6171,1.89844 1.2188,1.6875 1.918,2.30078").attr({ id: 'brwinowska', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'brwinowska'); streets["golebia"] = rsr.path("m 60.080885,390.46035 10.89844,-51.15625 11.16797,-51.85156 m -59.57032,295.28125 -0.35547,-2.375 0.44532,-6.11719 12.47265,-62.15625 10.57032,-51.33984 3.26562,-15.82422 11.10547,-54.46094 m 31.48828,293.68359 21.003915,33.44922 25.60937,42.79297 2.36719,2.35156 m 0,0 1.57812,1.54688 5.65235,5.55469 1.39062,2.29687 0.98047,1.89063 -0.65625,1.90234").attr({ id: 'golebia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'golebia'); streets["jana_pawla_ii"] = rsr.path("m 712.77617,1275.6791 -1.2773,-16.5586 -6.9453,-50.5547 1.9687,-41.7617 0.2031,-4.7539 2.1368,-27.4844 0.5312,-24.2656 0.074,-12.2422 -0.9765,-8.4961 -0.4219,-3.6523 -1.6641,-13.7032 -6.3945,-27.5039 -1.961,-11.582 -2.2578,-28.3437 0.8946,-17.7461 6.9453,-26.81644 m 0,0 7.7969,-29.08985 m -18.5664,-260.04687 14.8047,20.39453 m 3.7617,239.65234 1.25,-13.01172 0.6601,-11.69921 1.75,-34.4961 0.043,-1.1914 2.2383,-47.05079 0.2539,-3.04296 0.8008,-13.95313 -0.07,-1.14062 m 0,0 0.012,-4.85938 -0.2579,-50.41797 0.211,-10.57031 -0.09,-17.57813 -0.2735,-7.29296 -0.3632,-1.76954 -2.2813,-11.01171 -1.8437,-3.96094 -0.7579,-1.36328 -1.8046,-1.89453 -3.2383,-3.34766").attr({ id: 'jana_pawla_ii', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'jana_pawla_ii'); streets["parkowa"] = rsr.path("m 520.00667,863.7416 -6.9492,-0.47656 -34.418,-2.10938 -98.6094,-5.61328 -16.7773,-3.59375 -11.4336,-3.08203 -8.4922,-3.15234 -6.2031,-3.74219 -8.1719,-5.69922 -33.57811,-23.90234 -9.09375,-5.39063 -6.64453,-3.1914 -26.47657,-10.77735 -18.95312,-7.35156 -1.55469,-0.60156 -0.51953,-0.32032 -5.21094,-3.15625 -11.84765,-9.38671 m 500.01559,99.72265 -3.4297,-0.082 -165.7539,-6.84375 -15.0117,-0.60156 m 0,-3e-5 -10.8867,-0.64844 m -304.93359,-91.54687 -10.1836,-8.09375 -1.66797,-1.92969").attr({ id: 'parkowa', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'parkowa'); streets["zachodnia"] = rsr.path("m 144.35042,720.4291 -52.781255,-36.28516 -0.89844,-0.60156 -4.98828,-4.49219 -4.91015,-4.73046 -4.69141,-5.52344 -0.80469,-1.1211 -3.48828,-4.72656 -15.46875,-23.36328 -31.90625,-49.70312 -1.39062,-4.39454 -0.44532,-2.7539 m 180.644535,179.4375 -2.0039,-2.16797 -1.80469,-2.06641 -1.01953,-0.6875 -15.58594,-9.5039 -13.77734,-10.32422 -24.67969,-16.99219").attr({ id: 'zachodnia', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'zachodnia'); streets["lotnicza"] = rsr.path("m 777.54967,633.53457 c 0,0 -6.3799,3.09675 -9.5547,4.67578 -3.5048,1.74314 -6.9795,3.54614 -10.4805,5.29688 -0.7458,0.37296 -1.4736,0.786 -2.2422,1.10937 -2.8054,1.18033 -8.6172,3.01953 -8.6172,3.01953 m 0,0 -20.4726,5.01563 -38.25,7.33984 -3.6211,0.66016").attr({ id: 'lotnicza', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'lotnicza'); streets["lesna"] = rsr.path("m 1393.1445,901.6054 -95.2862,-29.28177").attr({ id: 'lesna', parent: 'layer2', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'lesna'); streets["swierkowa"] = rsr.path("m 654.26837,709.26113 -5.01561,63.02986").attr({ id: 'swierkowa', parent: 'layer2', display: 'inline', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'swierkowa'); streets["borowin"] = rsr.path("m 589.27227,1093.9877 -37.6953,1.9883 m 156.9141,-6.4141 -25.7852,-0.012 -45.9453,3.1133").attr({ id: 'borowin', parent: 'layer2', display: 'inline', fill: 'none', stroke: '#000000', "stroke-width": '9', "stroke-linecap": 'round', "stroke-linejoin": 'round', "stroke-miterlimit": '4', "stroke-dasharray": 'none', "stroke-opacity": '0.99607843' }).transform("t0,-130").data('id', 'borowin'); layer2.attr({ 'id': 'layer2', 'style': 'display:inline', 'name': 'layer2' }); layer2.transform("t0,-130"); rsrGroups = [layer2]; layer2.push(streets["sojek"], streets["boleslawa_prusa"], streets["krasek"], streets["orla"], streets["mlochowska"], streets["zygmunta_krasinskiego"], streets["grodziska"], streets["zamkowa"], streets["jeza"], streets["kolejowa"], streets["wierzbowa"], streets["bazantow"], streets["piastowska"], streets["sokola"], streets["warszawska"], streets["orzechowa"], streets["kasztanowa"], streets["brzozowa"], streets["modrzewiowa"], streets["akacjowa"], streets["cicha"], streets["podlesna"], streets["losia"], streets["wilcza"], streets["kukulek"], streets["wrobla"], streets["szpakow"], streets["henryka_sienkiewicza"], streets["jasminowa"], streets["storczykow"], streets["krecia"], streets["wiewiorek"], streets["11_listopada"], streets["irysowa"], streets["rozana"], streets["sasanek"], streets["jaroslawa_iwaszkiewicza"], streets["klonowa"], streets["lisia"], streets["juliana_ejsmonda"], streets["juliusza_slowackiego"], streets["sosnowa"], streets["rysia"], streets["wiazowa"], streets["wschodnia"], streets["jaworowa"], streets["borsucza"], streets["stanislawa_lilpopa"], streets["jaskolcza"], streets["jastrzebia"], streets["sarnia"], streets["sowia"], streets["slowicza"], streets["ptasia"], streets["szczygla"], streets["koscielna"], streets["ogrodowa"], streets["grabowa"], streets["bobrowa"], streets["krolicza"], streets["wrzosowa"], streets["czeremchowa"], streets["kalinowa"], streets["topolowa"], streets["konwalii"], streets["jalowcowa"], streets["bluszczowa"], streets["stefana_zeromskiego"], streets["glogow"], streets["adama_mickiewicza"], streets["jodlowa"], streets["wladyslawa_stanislawa_reymonta"], streets["dzikow"], streets["sepow"], streets["mysliwska"], streets["glowna"], streets["jelenia"], streets["debowa"], streets["blonska"], streets["miejska"], streets["helenowska"], streets["lipowa"], streets["bukowa"], streets["kwiatowa"], streets["paproci"], streets["brwinowska"], streets["golebia"], streets["jana_pawla_ii"], streets["parkowa"], streets["zachodnia"], streets["lotnicza"], streets["lesna"], streets["swierkowa"], streets["borowin"]);

        var container = $("#map-container");

        var svg = document.querySelector("svg");
        svg.setAttribute("width", container.width());
        svg.setAttribute("height", container.height());

        var beforePan = function (oldPan, newPan) {
            var stopHorizontal = true
              , stopVertical = false
              , gutterWidth = container.width()
              , gutterHeight = container.height()
                // Computed variables
              , sizes = this.getSizes()
              , leftLimit = container.width() - SVG_width * sizes.realZoom > 0 ?
                                    (container.width() - SVG_width * sizes.realZoom + 1 * sizes.viewBox.x * (+(!isVerticalView()))) / 2 :
                                    (container.width() - SVG_width * sizes.realZoom + 1 * sizes.viewBox.x * (+(!isVerticalView())))
              , rightLimit = 0
              , topLimit = container.height() - SVG_height * sizes.realZoom > 0 && isVerticalView() ?
                                    (-((0 + sizes.viewBox.height) * sizes.realZoom) + gutterHeight) / 2 : // sizes.viewBox.y
                                    (-((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight)
              , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

            console.log("###");
            console.log("Grey available area height", container.height())
            console.log("Map height on screen", SVG_height * sizes.realZoom)
            console.log("Init zoom:", initZoom)
            console.log(sizes);
            console.log("Gutter width:", gutterWidth);
            console.log("Gutter height:", gutterHeight);
            console.log("Left limit:", leftLimit);
            console.log("Right limit:", rightLimit);
            console.log("Top limit:", topLimit, sizes.realZoom, sizes.viewBox.y, sizes.viewBox.height, gutterHeight);
            console.log("Bottom limit:", bottomLimit);
            console.log(this);

            customPan = {}
            customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
            customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

            return customPan;
        }

        var beforeZoom = function (oldZoom, newZoom) {

        }

        // PAN ZOOM
        var zoomController = svgPanZoom(svg, {
            minZoom: 1 //0.95
            , maxZoom: !isMobile() ? 3.5 : 5
            //controlIconsEnabled: true,
            , zoomScaleSensitivity: !isMobile() ? 0.2 : 0.4
            , dblClickZoomEnabled: false
            //center: 1,
            //displayFullScreenControl: true
            , zoomEnabled: true
            , controlIconsEnabled: true
            , fit: 1
            , center: 1
            , beforePan: beforePan
            , beforeZoom: beforeZoom
            , customEventsHandler: {
                haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
                , init: function (options) {
                    var instance = options.instance
                        , initialScale = 1
                        , pannedX = 0
                        , pannedY = 0
                    // Init Hammer
                    // Listen only for pointer and touch events
                    this.hammer = Hammer(options.svgElement, {
                        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                    })
                    // Enable pinch
                    this.hammer.get('pinch').set({ enable: true })
                    // Handle double tap
                    this.hammer.on('doubletap', function (ev) {
                        instance.zoomIn()
                    })
                    // Handle pan
                    this.hammer.on('panstart panmove', function (ev) {
                        // On pan start reset panned variables
                        if (ev.type === 'panstart') {
                            pannedX = 0
                            pannedY = 0
                        }
                        // Pan only the difference
                        instance.panBy({ x: ev.deltaX - pannedX, y: ev.deltaY - pannedY })
                        pannedX = ev.deltaX
                        pannedY = ev.deltaY
                    })
                    // Handle pinch
                    this.hammer.on('pinchstart pinchmove', function (ev) {
                        // On pinch start remember initial zoom
                        if (ev.type === 'pinchstart') {
                            initialScale = instance.getZoom()
                            instance.zoom(initialScale * ev.scale)
                        }
                        instance.zoom(initialScale * ev.scale)
                    })
                    // Prevent moving the page on some devices when panning over SVG
                    options.svgElement.addEventListener('touchmove', function (e) { e.preventDefault(); });
                }
                , destroy: function () {
                    this.hammer.destroy()
                }
            }
        });
        var initZoom = zoomController.getSizes().realZoom;

        for (var streetName in streets) {
            streets[streetName].attr(basicStyle);
        }

        var animationSpeed = 0;



        // wyczyść wszytkie
        for (var streetName in streets) {
            streets[streetName].attr(basicStyle);
        }

        // pokoloruj losową (streetToGuess ustawiona w setStreet_giveName)
        streets[streetToGuess.name].animate(pointerStyle, 250, function () {
            // callback
        });

        // powiększenie obszaru roboczego
        $('#hideMenu-btn').click(function () {
            setTimeout(function () {
                $('svg').remove();
                drawMap_giveName();
                //svg.setAttribute("width", container.width());
                //svg.setAttribute("height", container.height());
            }, 300);
        });
   
        // przytrzymanie mapy
        mouse = false;
        $('#map-container').on('mousedown ', function (e) {
            mouse = true;
            callEvent();
        });
        $('#map-container').on('mouseup ', function (e) {
            mouse = false;
            callEvent();
        });
        function callEvent() {
            if (mouse) {
                // do whatever you want
                // it will continue executing until mouse is not released
                $('#map-container').css("cursor", "move");
                setTimeout(function () { callEvent() }, 50);
            }
            else {
                $('#map-container').css("cursor", "default");
            }
            return;
        }

        // kliknięcie "Losuj inną"
        $('#setNewStreetGiveName-btn').off("click").click(function () {
            setStreet_giveName();
            prepareAnswers();
        });
    }

    // przystosowuje urządzenia mobilne
    function mobileAdapt_giveName() {
        $('#hideMenu-btn').html('<>');
        $('#streetName-label-parent')["0"].childNodes["0"].data = ''
        $('#setNewStreetGiveName-btn').html(' <i class="fa fa-refresh fa-1x" aria-hidden="true"></i>');
    }
    // pobiera ulice dla danego id
    function getStreetById(streets, id) {
        var result = null;
        for (var street in streets) {
            if (streets[street].id == id) {
                result = street;
                break;
            }
        }
        return result;
    }



    // load other singletons. Other singleton contain some logic which can be packed, i.e. modal	
    function GiveName() {
        //this.otherSingleton = new OtherSingleton();
    }

    GiveName.prototype.init = function (params) {
        var that = this;
        // ******** ALL ACTION ON SITE GOES HERE *********
        $.getJSON("./data/streets.json", function (data) {
            streetsJSON = data;
            setStreet_giveName();
            drawMap_giveName();
            prepareAnswers();
            if (isMobile()) {
                mobileAdapt_giveName();
            }
          window.addEventListener('resize', function () {
                $('svg').remove();
                drawMap_giveName();
            }, true);
        });
    }
    ///////////////////////////////////////////////////
    // Singleton implementation ///////////////////////
    ///////////////////////////////////////////////////
    var _instance;
    var _static = {
        name: "GiveName",
        getInstance: function () {
            if (_instance === undefined) {
                _instance = new GiveName();
            }
            return _instance;
        }
    }

    return _static;
}());
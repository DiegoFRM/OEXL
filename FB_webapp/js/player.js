var idGame = 'cuestionario';
var firestore = firebase.firestore();
var t1p1,t2p1
var settings = {/* your settings... */ timestampsInSnapshots: true};
var selectAnswer = 0;
var pointsQuestion = 0;
var selectColQuestions = 0;

firestore.settings(settings);    
    

function joinGame(){

     firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
           if(doc.data().team1.p1.name == ""){
            setPlayer1();
            playerNum = 1;
            parent.location.hash = 1;   
            
        }else{
            setPlayer2();
            playerNum = 2;
            parent.location.hash = 2;   
        }
    });
    
     });
    
    $("#textoPlayer").html("<h2>¡Listo! esperando al otro jugador</h2>");
    $("#joinBtn").hide();
    $("#enterName").hide();
}  


function setPlayer1(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
    //var ide = pin.doc("eopUiANzBwYlo8FZYdEO").collection("team1").doc("p1")
        ide.update({
            team1:{
            p1:{
                name:$("#enterName").val()
            }
            }
        });
}
function setPlayer2(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            team2:{
            p1:{
                name:$("#enterName").val()
                } 
            }
        });
}



function timeRedButton(timer){
        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
    var  player = parent.location.hash;
        if(player == "#1"){
            ide.update({
            timep1:
            timer
            
            });
        }else{
            ide.update({
            timep2:
            timer
            
            });  
        }
    
}

function setActivePlayer1(dato){

        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
            ide.update({
            p1active: dato
        });
}

function setActivePlayer2(dato){
        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
            ide.update({
            p2active: dato
        });
}

function reviewTime(){
    var letters = ["a) ","b) " ,"c) "];
         firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var numQuestion = doc.data().QuestionNumber;
        console.log("numQuestion: " + numQuestion);
        console.log("choiceArray: " + doc.data().choiceArray);
        if(doc.data().choiceArray == 1){
                $("#question_text").html(questions_c[numQuestion].question);
                $("#ans1").html(letters[0] + questions_c[numQuestion].answer1);
                $("#ans2").html(letters[1] + questions_c[numQuestion].answer2);
                $("#ans3").html(letters[2] + questions_c[numQuestion].answer3);
                selectAnswer = questions_c[numQuestion].correct;
                pointsQuestion = questions_c[numQuestion].points
           }else{
                $("#question_text").html(questions_i[numQuestion].question);
                $("#ans1").html(letters[0] + questions_i[numQuestion].answer1);
                $("#ans2").html(letters[1] + questions_i[numQuestion].answer2);
                $("#ans3").html(letters[2] + questions_i[numQuestion].answer3);
                selectAnswer = questions_i[numQuestion].correct;
                pointsQuestion = questions_i[numQuestion].points
           }
        
        
        if(doc.data().countTurn == 0){
                if(doc.data().timep1 < doc.data().timep2 ){
                    setActivePlayer1(true)
                    console.log("es el uno")
            
                }else{
                    setActivePlayer2(true)
                    
                    console.log("es el dos")
                }
        }

            if(doc.data().p1active){
                  if(parent.location.hash == "#1"){
                  $("#ButtonStart").hide();
                   $("#Preguntas").show();
                    $("#Cortina").hide();
                }else{
                    $("#Cortina").show();
                }
            }
        
            if(doc.data().p2active){
                if(parent.location.hash == "#2"){
                      $("#ButtonStart").hide();
                       $("#Preguntas").show();
                        $("#Cortina").hide();
                    }else{
                        $("#Cortina").show();
                }
            }
        
        

        
        
    });
    
     });
  
}

function choiceQuestion(question){
    var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
     ide.update({
            QuestionNumber:
            question
            });
}


   var Scorep1 =  0;
   var Scorep2 = 0;

    function sendScore(scoreAnswer){
        
        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
        if(parent.location.hash == "#1"){
            
            $("#scorePoints").html(Scorep1);
            Scorep1 = Scorep1 + scoreAnswer;
            ide.update({
            scorep1:
            Scorep1
            
            });
        }else{
            $("#scorePoints").html(Scorep2);
            Scorep2 = Scorep2 + scoreAnswer;
            ide.update({
            scorep2:
            Scorep2
            });  
        }
        
    }
 
function passTurn(){
    firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => { 
            if(doc.data().countTurn == 0){
                var pin = firestore.collection("26839");
                var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
                ide.update({
                    countTurn:1
                });  
                
                if(parent.location.hash == "#1"){
                        setActivePlayer1(false);
                        setActivePlayer2(true);
                        
                    }else{
                        setActivePlayer2(false);
                        setActivePlayer1(true);
                }    
                $("#popRetro").show();
                $(".windowPop").html("¡Incorrecto!<br>Es el turbo de adversario");
                
            }else{
                setActivePlayer1(false);
                setActivePlayer2(false);
                $("#Cortina").show();
                
                $("#popRetro").show();
                $(".windowPop").html("¡Incorrecto!<br>Ningún jugador acertó");
            }
          
        });
    });
}



var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;

function restartTime () {
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
}

function inicio () {
	control = setInterval(cronometro,10);
}
    

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}
}  


    function startGame(startJeo){
        if(startJeo == 0){
        restartTime();
        $("#texto_empieza").show();    
        $("#Cortina").hide();
        $("#enterGamePlayer").hide();
        $("#ButtonStart").show();
        $("#Preguntas").hide();    
        TweenMax.fromTo($(".text_3"),2,{alpha:1,scale:1},{alpha:0,scale:5,delay:1});
    TweenMax.fromTo($(".text_2"),2,{alpha:1,scale:0},{alpha:0,scale:5,delay:3});
    TweenMax.fromTo($(".text_1"),2,{alpha:1,scale:0},{alpha:0,scale:5,delay:5,onComplete:startButtonRed});
    
    function startButtonRed(){
        $("#buttonRed").show();
         $("#contenedor").show();
         $("#texto_empieza").hide();
        inicio();
    }

    $("#buttonRed").hide();
    $("#contenedor").hide();
            
            $("#enterGamePlayer").hide();
            $("#ButtonStart").show();
            var pin = firestore.collection("26839");
                var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
                ide.update({
             startJeopardy:1
                });    
        }
    }

var realTime  = () => {

    firestore.collection("26839").doc("eopUiANzBwYlo8FZYdEO")
    .onSnapshot(function(doc) {

        if(doc.data().startgame == 1){
            startGame(doc.data().startJeopardy);
        }else if(doc.data().startgame == 2){
                
            $("#enterGamePlayer").hide();
            $("#ButtonStart").hide();
            $("#Cortina").show(); 
            $("#popRetro").hide();
            
        }else{
            if(doc.data().restartGame == true){
            $("#enterGamePlayer").show();
            $("#ButtonStart").hide();
            $("#Preguntas").hide();
            $("#Cortina").hide();
            $("#popRetro").hide();
               $("#textoPlayer").html("<h2>¡Pon tu Nombre para entrar al juego!</h2>");
            $("#joinBtn").show();
            $("#enterName").show();
            $("#enterName").val("");
                var pin = firestore.collection("26839");
                var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
                ide.update({
             restartGame:false
                });
            }
        }
        
        if(doc.data().timep1 != 0 && doc.data().timep2 != 0 ){
           reviewTime();

           }
    });
 
}

realTime();

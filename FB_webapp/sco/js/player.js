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
           if(doc.data().t1p1 == ""){
            setPlayer1()
            playerNum = 1;
            parent.location.hash = 1;   
            
        }else if(doc.data().t1p2 == ""){
            setPlayer2()
            playerNum = 2;
            parent.location.hash = 2;   
        }else if(doc.data().t1p3 == ""){
            setPlayer3()
            playerNum = 3;
            parent.location.hash = 3;   
        }else if(doc.data().t2p1 == ""){
            setPlayer4()
            playerNum = 4;
            parent.location.hash = 4;   
        }else if(doc.data().t2p2 == ""){
            setPlayer5()
            playerNum = 5;
            parent.location.hash = 5;   
        }else if(doc.data().t2p3 == ""){
            setPlayer6()
            playerNum = 6;
            parent.location.hash = 6;   
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
            t1p1:$("#enterName").val()
            
        });
}
function setPlayer2(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            t1p2:$("#enterName").val()
                
        });
}
function setPlayer3(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            t1p3:$("#enterName").val()
                
        });
}

function setPlayer4(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
    //var ide = pin.doc("eopUiANzBwYlo8FZYdEO").collection("team1").doc("p1")
        ide.update({
            t2p1:$("#enterName").val()
            
        });
}
function setPlayer5(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            t2p2:$("#enterName").val()
                
        });
}
function setPlayer6(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            t2p3:$("#enterName").val()
                
        });
}



function timeRedButton(timer){
        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
        var player = parent.location.hash;

    
            switch(player){
                   case "#1" :
                    ide.update({
                        timet1p1: timer
                    }); 
                    break;
                   case "#2" :
                    ide.update({
                        timet1p2: timer
                    }); 
                    break;
                   case "#3" :
                    ide.update({
                        timet1p3: timer
                    }); 
                    break;
                   case "#4" :
                    ide.update({
                        timet2p1: timer
                    }); 
                    break;
                   case "#5" :
                    ide.update({
                        timet2p2: timer
                    }); 
                    break;
                   case "#6" :
                    ide.update({
                        timet2p3: timer
                    }); 
                    break;
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
    var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
           
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
            console.log("Tiempos:");
            var bestTime =  0;
            var playerBest;
            for(var i = 1;i<=2;i++){
                for(var j = 1;j<=3;j++){
                    if(i != 2 && j != 3){
                        if(bestTime != 0){
                             if(doc.data()["timet"+i+"p" + j] < doc.data()["timet"+[i + 1]+"p" + [j + 1]]){
                                if(doc.data()["timet"+i+"p" + j] < bestTime ){
                                bestTime = doc.data()["timet"+i+"p" + j];
                                playerBest =   "timet"+i+"p" + j  
                                    
                                }
                            }else{
                                if(doc.data()["timet"+[i + 1]+"p" + [j + 1]] < bestTime ){
                                    bestTime = doc.data()["timet"+[i + 1]+"p" + [j + 1]];
                                    playerBest = "timet"+[i + 1]+"p" + [j + 1] 
                                }
                            }
                        }else{
                            if(doc.data()["timet"+i+"p" + j] < doc.data()["timet"+[i + 1]+"p" + [j + 1]]){
                                bestTime = doc.data()["timet"+i+"p" + j];
                                playerBest =   "timet"+i+"p" + j   
                            }else{
                                bestTime = doc.data()["timet"+[i + 1]+"p" + [j + 1]];
                                playerBest = "timet"+[i + 1]+"p" + [j + 1] 
                            }
                        }
                       
                }
            }
        }
            
            console.log(bestTime  + " " + playerBest);
            
            
            switch(String(playerBest)){
                   case "timet1p1" :
                    ide.update({
                            p1active: true
                    }); 
                    break;
                   case "timet1p2" :
                    ide.update({
                            p2active: true
                    }); 
                    break;
                   case "timet1p3" :
                    ide.update({
                            p3active: true
                    }); 
                    break;
                   case "timet2p1" :
                    ide.update({
                            p4active: true
                    }); 
                    break;
                   case "timet2p2" :
                    ide.update({
                            p5active: true
                    }); 
                    break;
                   case "timet2p3" :
                    ide.update({
                            p6active: true
                    }); 
                    break;
            }
              
            
        }
        

        for(var p = 1;p<=6;p++){
            if(doc.data()["p" + p + "active"]){
                  if(parent.location.hash == ["#" + p]){
                  $("#ButtonStart").hide();
                   $("#Preguntas").show();
                    $("#Cortina").hide();
                    $("#Cortina2").hide();

                }else{
                    $("#Cortina2").show();
                    $("#ButtonStart").hide();
                }
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
        if(parent.location.hash == "#1" || parent.location.hash == "#2" || parent.location.hash == "#3" ){
            
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
    var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
    firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => { 
            if(doc.data().countTurn == 0){
                
                ide.update({
                    countTurn:1,
                    p1active: false,
                    p2active: false,
                    p3active: false,
                    p4active: false,
                    p5active: false,
                    p6active: false,
                });  
            var player = parent.location.hash;   
            switch(player){
                   case "#1" :
                    $("#Cortina2").hide();
                    ide.update({
                            p4active: true,
                            p1active: false
                    }); 
                    break;
                   case "#2" :
                    $("#Cortina2").hide();
                    ide.update({
                            p4active: true,
                            p2active: false
                    }); 
                    break;
                   case "#3" :
                    $("#Cortina2").hide();
                    ide.update({
                            p4active: true,
                            p3active: false
                    }); 
                    break;
                   case "#4" :
                    $("#Cortina2").hide();
                    ide.update({
                            p1active: true,
                            p4active: false
                    }); 
                    break;
                   case "#5" :
                    $("#Cortina2").hide();
                    ide.update({
                            p1active: true,
                            p5active: false
                    }); 
                    break;
                   case "#6" :
                    $("#Cortina2").hide();
                    ide.update({
                            p1active: true,
                            p6active: false
                    }); 
                    break;
            } 
                $("#popRetro").show();
                TweenMax.fromTo($(".windowPop"),0.5,{scale:0},{scale:1});
                $(".windowPop").html("¡Incorrecto!<br>Es el turno de adversario");
                
            }else{
                ide.update({
                    countTurn:1,
                    p1active: false,
                    p2active: false,
                    p3active: false,
                    p4active: false,
                    p5active: false,
                    p6active: false,
                }); 
                //$("#Cortina").show();
                $("#popRetro").show();
                TweenMax.fromTo($(".windowPop"),0.5,{scale:0},{scale:1});
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
        $("#Cortina2").hide();
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
             $("#Cortina2").hide();
            if(doc.data().restartGame == true){
            $("#enterGamePlayer").show();
            $("#ButtonStart").hide();
            $("#Preguntas").hide();
            $("#Cortina").hide();
            $("#Cortina2").hide();
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
        
        if(doc.data().timet1p1 != 0 && doc.data().timet1p2 != 0 && doc.data().timet1p3 != 0 && doc.data().timet2p1 != 0 && doc.data().timet2p2 != 0 && doc.data().timet2p3 != 0 ){
           reviewTime();

           }
    });
 
}

function completeGame(){
    if(round == totalQuestions){
    setComplete();
    }
}

realTime();
initCourse();
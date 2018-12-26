var idGame = 'cuestionario';
var firestore = firebase.firestore();
var t1p1,t2p1
var settings = {/* your settings... */ timestampsInSnapshots: true};
var selectAnswer = 0;
var pointsQuestion = 0;
var selectColQuestions = 0;

firestore.settings(settings);    
    

var makeid = function() {
		var text = "";
		//var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var possible = "0123456789";
		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	};

function randomNumber(){
    alert(makeid());
}

function createGame(){
    var newGame = makeid();
     firestore.collection(newGame).add({

    team1:{
        p1:"",
        p2:"",
        p3:"",
        timeAnswer:""
    },   
    team2:{
        p1:"",
        p2:"",
        p3:"",
        timeAnswer:""
    }
})
.then(function(docRef) {
        
    console.log("Document written with ID: ", docRef.id);
       idGame = docRef.id;
    
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});   
      
}


function loadData(){
    firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log("ID",doc.id);
        console.log("data",doc.data());
    });
});
    
    

}
/*
var loadData = () => {
    
    firestore.collection("26839").get().then((querySnapshot) => {
        console.log(querySnapshot.data());
    });
}
*/



//firebase.database().ref("26839/eopUiANzBwYlo8FZYdEO").get();


function deleteData(){
         var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            startJeopardy:0,
            restartGame:true,
            QuestionNumber:0,
            scorep1:0,
            scorep2:0,
            timep1:0,
            timep2:0,
            startgame:false,
            team1:{
            p1:{
                name:"",
            }
            }, team2:{
            p1:{
                name:"",
            } 
            }
        });
    
        $("#Iniciar").show();
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

function gotoScene2(){
    
     firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
           if(doc.data().team1.p1.name != "" && doc.data().team2.p1.name != ""){
               TweenMax.to($("#logo"),0.5,{scale:2,alpha:0,ease:Back.easeIn});
               TweenMax.to($("#Iniciar"),0.5,{scale:2,alpha:0,ease:Back.easeIn,delay:0.1});
               TweenMax.to($("#reiniciar"),0.5,{scale:2,alpha:0,ease:Back.easeIn,delay:0.2,onComplete:next1});
               function next1(){
                 $("#Iniciar").hide();
                 $("#Scene1").hide();
                 $("#Scene2").show();                     
               }
               
        
        }else{
            swal("¡Upss!", "¡Aún no están ambos jugadores listos!"); 
        }
    });
    
     });    
    
    

}

function InitGame(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            startgame:
            1,
            startJeopardy:
            0,
            choiceArray:
            selectColQuestions
            
        });
    
    

}


function restartQuestion(){
    //                    var pin = firestore.collection("26839");
//                    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
//                    ide.update({
//                        timep1:0,
//                        timep2:0
//                    });
    
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            startgame:2,
            timep1:0,
            timep2:0
            
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
        
        

           if(doc.data().timep1 < doc.data().timep2 ){
            if(parent.location.hash == "#1"){
              $("#ButtonStart").hide();
               $("#Preguntas").show();
                $("#Cortina").hide();
            }else{
                $("#Cortina").show();
            }
            
        }else{
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
            Scorep1 = Scorep1 + scoreAnswer;
            ide.update({
            scorep1:
            Scorep1
            
            });
        }else{
            Scorep2 = Scorep2 + scoreAnswer;
            ide.update({
            scorep2:
            Scorep2
            });  
        }

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
        console.log("Current data: ", doc.data());
        $("#Scorep1").find("span").html(doc.data().scorep1);
        $("#Scorep2").find("span").html(doc.data().scorep2);
        $("#t1p1").text(doc.data().team1.p1.name);
     
          if(doc.data().team1.p1.name != ""){
            $("#team1").find("h2").html("¡Listo!");
          }else{
             $("#team1").find("h2").html("Oponente 1"); 
          }
        $("#t2p1").html(doc.data().team2.p1.name);
        if(doc.data().team2.p1.name != ""){
            $("#team2").find("h2").html("¡Listo!");
          }else{
             $("#team2").find("h2").html("Oponente 2"); 
          }
        

        
        if(doc.data().startgame == 1){
            startGame(doc.data().startJeopardy);
        }else if(doc.data().startgame == 2){
                
            $("#enterGamePlayer").hide();
            $("#ButtonStart").hide();
            $("#Cortina").show(); 
            
        }else{
            if(doc.data().restartGame == true){
            $("#enterGamePlayer").show();
            $("#ButtonStart").hide();
            $("#Preguntas").hide();
            $("#Cortina").hide();
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

    

   function includeQuestions(contenedor,side,array){
       var letters = ["a) ","b) " ,"c) "];
        
    
        var initValue = 25;
           for(var i = 0;i<=10;i++){
               initValue = initValue + 25
               if(i == 10){
                contenedor.append(
                    `<div id="btn`+side+`_`+i+`" class="questionsBox col-xs-12" points="`+initValue+`" style="width:100%;">`+initValue+`</div>`
                    )
                  }else{
                contenedor.append(
                    `<div id="btn`+side+`_`+i+`" class="questionsBox col-xs-6" points="`+initValue+`">`+initValue+`</div>`
                    )
                  }

               
            $("#btn"+side+"_" + i).attr("index",i);
            $("#btn"+side+"_" + i).attr("enabled",1);   
            $("#btn"+side+"_" + i).click(function(){
                var enabled = $(this).attr("enabled");
                if(enabled == 1){
                    var index = $(this).attr("index");
                    choiceQuestion(index);
                    selectColQuestions = side;
                    $(this).attr('disabled','disabled');
                    $("#questionPop").show();
                    $("#question_text").html(array[index].question);
                    $("#ans1").html(letters[0] + array[index].answer1);
                    $("#ans2").html(letters[1] + array[index].answer2);
                    $("#ans3").html(letters[2] + array[index].answer3);
                    $(this).css("background-color","#717171")
                    $(this).attr("enabled",0);
                }
            });       
               
               
               
    }
       
       
       
   }

    includeQuestions($("#loadQuestions-C"),1,questions_c);
    includeQuestions($("#loadQuestions-I"),2,questions_i);
         $(".questionsBox").mouseover(function(){
         $(this).css("opacity",0.5);
     });
    
     $(".questionsBox").mouseout(function(){
         $(this).css("opacity",1);
     });
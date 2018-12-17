var idGame = 'cuestionario';
var firestore = firebase.firestore();
var t1p1,t2p1
var settings = {/* your settings... */ timestampsInSnapshots: true};
var selectAnswer = 0;
var pointsQuestion = 0;

firestore.settings(settings);    
    

    var questions_c = [
        {
            question:"El vendedor se debe distinguir  principalmente por ser:",
            answer1:"Puntual, disciplinado y apegado a las normas",
            answer2:"Entusiasta, alegre y conversador",
            answer3: "Humilde, responsable y estricto",
            points:50,
            correct:1
        },
        {
            question:"Es la actitud más importante en Grupo Bimbo frente al cliente:",
            answer1:"Actitud de respeto",
            answer2:"Actitud de amabilidad",
            answer3:"Actitud de servicio",
            points:75,
            correct:3
        },
        {
            question:"Son los principales valores de un vendedor:",
            answer1:"Responsable y empático",
            answer2:"Integro y honrado",
            answer3:"Humilde y tolerante",
            points:100,
            correct:2
        },
        {
            question:"Son características del vendedor que le ayudan en su labor de venta:",
            answer1:"Entusiasta, alegre y dinámico",
            answer2:"Sencillo, participativo y humilde",
            answer3:"Prudente, ágil y conversador",
            points:125,
            correct:1
        },
        {
            question:"Para ganarse la confianza del cliente, un vendedor debe ser:",
            answer1:"Dinámico y prudente",
            answer2:"Amable, sencillo y respetuoso",
            answer3:"Ágil y conversador",
            points:150,
            correct:2
        },
        {
            question:"Las habilidades que le ayudan a llevar en orden su ruta a un vendedor son:",
            answer1:"Seguridad y dinamismo",
            answer2:"Amabilidad y coordinación",
            answer3:"Proactividad y autocontrol",
            points:175,
            correct:3
        },
        {
            question:"Las características que le ayudan al vendedor a trabajar mejor con sus compañeros son:",
            answer1:"Facilidad de negociación y argumentación",
            answer2:"Facilidad de palabra e inclusión",
            answer3:"Facilidad para relaciones interpersonales y trabajo en equipo",
            points:200,
            correct:3
        },
        {
            question:"Las habilidades que le ayudan a un vendedor a cerrar una venta son:",
            answer1:"Habilidad de liderazgo y creatividad",
            answer2:"Habilidad para argumentar y negociar",
            answer3:"Habilidad numérica y matemática",
            points:225,
            correct:2
        },
        {
            question:"Una característica que no puede faltar en un vendedor es:",
            answer1:"Capacidad de iderazgo",
            answer2:"Sentido de independencia",
            answer3:"Gusto por la ventas",
            points:250,
            correct:3
        },
        {
            question:"De esta manera, el trabajo del vendedor se más cercano al cliente:",
            answer1:"Ganando la confianza del cliente",
            answer2:"Asignando un horario establecido de visita",
            answer3:"Dándole obsequios y promociones especiales",
            points:275,
            correct:1
        },
        {
            question:"La habilidad que le ayuda al vendedor a  evitar pérdidas es:",
            answer1:"Habilidad numérica",
            answer2:"Habilidad de trabajo en equipo",
            answer3:"Habilidad de palabra",
            points:300,
            correct:4
        }
    ]
    var questions_i = [
        {
            question:"Es la primer manera de presentarte adecuadamente en imagen frente a compañeros y cliente:",
            answer1:"Baño diario y por la mañana",
            answer2:"Producto suficiente",
            answer3: "Vehículo limpio",
            points:50,
            correct:1
        },
        {
            question:"Es como debes llegar cuidando tu imagen como vendedor",
            answer1:"Dinámico y ágil",
            answer2:"Vehículo limpio y en buenas condiciones",
            answer3: "Bien presentable",
            points:75,
            correct:1
        },
        {
            question:"Como vendedores, nuestro cabello debe ir:",
            answer1:"Arreglado, cepillado y teñido",
            answer2:"Peinado, corto o recogido",
            answer3: "Peinado, limpio y largo",
            points:100,
            correct:2
        },
        {
            question:"Es parte del cuidado estético del vendedor:",
            answer1:"Rasurado/bigote recortado en hombres, maquillaje discreto en mujeres.",
            answer2:"Calcetines oscuros en hombres, calcetas oscuras en mujeres.",
            answer3: "Sin tatuajes o perforaciones",
            points:125,
            correct:1
        },
        {
            question:"Es  indispensable en el vendedor en su interacción con el cliente, mantener la limpieza de:",
            answer1:"Manos y dientes",
            answer2:"Cajas y charolas",
            answer3: "Cabello y vehículo",
            points:150,
            correct:1
        },
        {
            question:"Es la manera en que nos distinguimos de otros vendedores:",
            answer1:"Llegando siempre antes que ellos",
            answer2:"Emblema de la marca siempre visible",
            answer3: "Llevando siempre un accesorio de color azul",
            points:175,
            correct:2
        },
        {
            question:"Es una manera de personalizar nuestra presencia frente a clientes y compañeros:",
            answer1:"Con un saludo diferente",
            answer2:"Con un apodo",
            answer3: "Gafete con nombre y departamento",
            points:200,
            correct:3
        },
        {
            question:"Es un elemento esencial en nuestra imagen de vendedores que nos distingue de la competencia:",
            answer1:"Tinas y exhibidores limpios",
            answer2:"Material punto de venta y anuncios",
            answer3: "Uniforme limpio, planchado y completo.",
            points:225,
            correct:3
        },
        {
            question:"Es el accesorio que nos permite darle formalidad a nuestro uniforme:",
            answer1:"Corbata azul",
            answer2:"Cinturón negro",
            answer3: "Lentes oscuros",
            points:250,
            correct:2
        },
        {
            question:"Es un accesorio que nos permite complementar nuestro uniforme correctamente:",
            answer1:"Calcetines o calcetas obscuras",
            answer2:"Cinturón azul",
            answer3: "Gorra roja",
            points:275,
            correct:1
        },
        {
            question:"Es un accesorio en el que recae mucha importancia de nuestra imagen:",
            answer1:"Corbata en hombres, pañuelo en mujeres",
            answer2:"Chamarra azul marino",
            answer3: "Calzado negro y boleado",
            points:300,
            correct:3
        }
    ]


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

function joinGame(){

     firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
           if(doc.data().team1.p1.name == ""){
            setPlayer1();
            playerNum = 1;
            
        }else{
            setPlayer2();
            playerNum = 2;
        }
    });
    
     });
    
    $("#textoPlayer").html("<h2>¡Listo! esperando al otro jugador</h2>");
    $("#joinBtn").hide();
    $("#enterName").hide();
}  

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
            0
            
        });
}


function restartQUestion(){
            var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            startgame:
            2
            
        });
}

function timeRedButton(timer){
        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
        if(playerNum == 1){
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
    
    var count = setTimeout(reviewTime, 3000);

}

function reviewTime(){
    var letters = ["a) ","b) " ,"c) "];
         firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var numQuestion = doc.data().QuestionNumber;
           if(doc.data().timep1 < doc.data().timep2 ){
            if(playerNum == 1){
              $("#ButtonStart").hide();
               $("#Preguntas").show();
            }else{
                $("#Cortina").show();
            }
            
        }else{
            if(playerNum == 2){
              $("#ButtonStart").hide();
               $("#Preguntas").show();
            }else{
                $("#Cortina").show();
            }
            
        }
        
        
                $("#question_text").html(questions_c[numQuestion].question);
                $("#ans1").html(letters[0] + questions_c[numQuestion].answer1);
                $("#ans2").html(letters[1] + questions_c[numQuestion].answer2);
                $("#ans3").html(letters[2] + questions_c[numQuestion].answer3);
                selectAnswer = questions_c[numQuestion].correct;
                pointsQuestion = questions_c[numQuestion].points
        
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
        if(playerNum == 1){
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
        $("#Scorep1").find("span").html(doc.data().scorep1);
        $("#Scorep2").find("span").html(doc.data().scorep2);
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

    });
  
}

realTime();
    includeQuestions($("#loadQuestions-C"),1,questions_c);
    includeQuestions($("#loadQuestions-I"),2,questions_c);
         $(".questionsBox").mouseover(function(){
         $(this).css("opacity",0.5);
     });
    
     $(".questionsBox").mouseout(function(){
         $(this).css("opacity",1);
     });
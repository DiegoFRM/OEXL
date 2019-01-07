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
            countTurn:0,
            p1active:false,
            p2active:false,
            p3active:false,
            p4active:false,
            p5active:false,
            p6active:false,
            startJeopardy:0,
            restartGame:true,
            QuestionNumber:0,
            scorep1:0,
            scorep2:0,
            timet1p1:0,
            timet1p2:0,
            timet1p3:0,
            timet2p1:0,
            timet2p3:0,
            timet2p2:0,
            startgame:false,
            t1p1:"",
            t1p2:"",
            t1p3:"", 
            t2p1:"",
            t2p2:"",
            t2p3:""
            
        });
    
        $("#Iniciar").show();
}


function gotoScene2(){
    
     firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
           if(doc.data().t1p1 != "" && doc.data().t1p2 != "" && doc.data().t1p3 != "" && doc.data().t2p1 != "" && doc.data().t2p2 != "" && doc.data().t2p3 != ""){
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

function restartQuestion(){

     firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        $("#Scorep1").find("span").html(doc.data().scorep1);
        $("#Scorep2").find("span").html(doc.data().scorep2);   
    
    });
    
});

    
    var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            startgame:2,
            startJeopardy:1,
            timet1p1:0,
            timet1p2:0,
            timet1p3:0,
            timet2p1:0,
            timet2p2:0,
            timet2p3:0,
            countTurn:0,
            p1active:false,
            p2active:false,
            p3active:false,
            p4active:false,
            p5active:false,
            p6active:false
            
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


var realTime  = () => {

    firestore.collection("26839").doc("eopUiANzBwYlo8FZYdEO")
    .onSnapshot(function(doc) {
        $("#Scorep1").find("span").html(doc.data().scorep1);
        $("#Scorep2").find("span").html(doc.data().scorep2);   
        $("#t1p1").text(doc.data().t1p1);
        
        $("#t1p2").text(doc.data().t1p2);  
        $("#t1p3").text(doc.data().t1p3); 
        $("#t2p1").text(doc.data().t2p1);  
        $("#t2p2").text(doc.data().t2p2);  
        $("#t2p3").text(doc.data().t2p3);
     
          if(doc.data().t1p1 != "" && doc.data().t1p2 != "" && doc.data().t1p3 != ""){
            $("#team1").find("h2").html("¡Listo!");
            TweenMax.fromTo($("#team1").find("h2"),1,{scale:2.5},{scale:2});
          }else{
             $("#team1").find("h2").html("Equipo 1");
              TweenMax.to($("#team1").find("h2"),1,{scale:1});
          }
        
        
        if(doc.data().t2p1 != "" && doc.data().t2p2 != "" && doc.data().t2p3 != ""){
            $("#team2").find("h2").html("¡Listo!");
            TweenMax.fromTo($("#team2").find("h2"),1,{scale:2.5},{scale:2});
          }else{
             $("#team2").find("h2").html("Equipo 2"); 
              TweenMax.to($("#team2").find("h2"),1,{scale:1});
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
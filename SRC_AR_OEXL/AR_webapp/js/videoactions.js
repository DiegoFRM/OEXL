//Aquí es la función donde detecta si se lee el código QR este hace que el video se reproduzca con el nombre que pusiste en el componente  aquí yo lo nombre "vidhandler" pero puedes ponerle cualquier nombre y no solamente puedes usarla en video, si no cuando se haga la lectura del código QR, solamente debe ser llamado de la siguiente manera 

AFRAME.registerComponent('vidhandler', {
    
    //Se hace el init, y todo lo dentro de init es el estado inicial antes de cualquier lectura del QR es como quieres que este al principio de cargar la página
  init: function () {
      //Le agregamos el parametro de toggle para usarlo posteriormente
    this.toggle = false;
      //en este ejemplo mando a llamar el video y le digo que este en pausa 
    this.vid = document.querySelector("#vid")
    this.vid.pause();
  },
    // El tick es cuando ya se hizo la lectura del código QR 
  tick:function(){
      //>quí hacemos la validación que si visible el elemento 3d
if(this.el.object3D.visible == true){
    //Usando la bandera que creamos anteriormente en el init validamos simplemente si es falso pues que empiece a reproducirlo y lo cambiamos a verdadero para darle el play y pausa cada vez que haga el tick
  if(!this.toggle){
     this.toggle = true;
     this.vid.play();
    }
  }else{
  this.toggle = false;
    this.vid.pause();
    }
  }      
    //se cierra la función
});

//Como en dispositivos móviles no puede hacer una autoreproducción debe darse con un click o evento 
//del usuario, por ello puse un touchstart en toda la pantalla
window.addEventListener("touchstart",function(){
  			document.querySelector("#vid").play();
  		},false)      
  
      
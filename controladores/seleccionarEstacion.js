C_SeleccionarEstacion = new Object();
C_SeleccionarEstacion.tipoSeleccion;
C_SeleccionarEstacion.tipoEstacion;
C_SeleccionarEstacion.idEstacion;

C_SeleccionarEstacion.dispatch = function(tipoSeleccion, tipoEstacion, idEstacion) {
    this.tipoSeleccion = tipoSeleccion;
    this.tipoEstacion = tipoEstacion;
    this.idEstacion = idEstacion;
    
    if(this.tipoSeleccion == "estacionCalcularRuta") { 
        var estacion = metro.buscarEstacion(idEstacion);
        if(this.tipoEstacion == "origen") {
            $("#nombreEstacionOrigen").html('<img src="'+estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estacion.nombre);
            usuario.estacionOrigen = estacion;
            $.mobile.changePage("#calcularRuta", {
                });
        }
        else if(this.tipoEstacion == "destino") {
            $("#nombreEstacionDestino").html('<img src="'+estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estacion.nombre);
            usuario.estacionDestino = estacion;
            $.mobile.changePage("#calcularRuta", {
                });
        }
        
    }
    else if(this.tipoSeleccion == "estacionMasCercana") {
        if(this.tipoEstacion == "origen")
            this.cercanaOrigen();
        else if(this.Estacion == "destino")
            this.cercanaDestino();
        else {
            throw "Opción no existe";
        }
    }
    else {
        throw "Opción no existe";
    }
}

C_SeleccionarEstacion.cercanaOrigen = function cercanaOrigen(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas);
    } else {
        C_SeleccionarEstacion.errorGeolocalizacion();
    }
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        $("#nombreEstacionOrigen").html('<img src="'+estaciones[0].estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estaciones[0].estacion.nombre);
        usuario.estacionOrigen = estaciones[0].estacion;
        $.mobile.changePage("#calcularRuta", {
            transition: "pop"
        });
    }
}
                
C_SeleccionarEstacion.cercanaDestino = function cercanaDestino(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas);
    } else {
        C_SeleccionarEstacion.errorGeolocalizacion();
    }
    function exitoCoordenadas(location) {
        var estaciones = metro.buscarEstacionesCercanas(location.coords.latitude, location.coords.longitude);
        $("#nombreEstacionDestino").html('<img src="'+estaciones[0].estacion.icono+'"/>&nbsp;&nbsp;&nbsp;&nbsp;'+estaciones[0].estacion.nombre);
        usuario.estacionDestino = estaciones[0].estacion;
        $.mobile.changePage("#calcularRuta", {
            transition: "pop"
        });
    }
}
            
C_SeleccionarEstacion.errorCoordenadas = function errorCoordenadas() {
    $("#mensajeError").html("<h4>No se pudo obtener tu ubicación. Intenta nuevamente.</h4>");
    $.mobile.changePage("#error", {
        transition: "pop"
    });
}

C_SeleccionarEstacion.errorGeolocalizacion = function errorGeolocalizacion() {
    $("#mensajeError").html("<h4>No se puedo acceder a mecanismo o dispositivo de geolocalización.</h4>");
    $.mobile.changePage("#error", {
        transition: "pop"
    });
}
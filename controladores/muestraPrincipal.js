C_MuestraPrincipal = new Object();

C_MuestraPrincipal.dispatch = function() {
    // Lista de lineas
    var htmlListaLineas = "";
    for(i=0; i<metro.lineas.length; i++) {
        htmlListaLineas += '<li>';
        htmlListaLineas += '<h4>'+metro.lineas[i].nombre+'</h4>';
        htmlListaLineas += '<img src="'+metro.lineas[i].icono+'" class="ui-li-icon">';
        var estaciones = metro.lineas[i].estaciones;
        htmlListaLineas += '<p>'+estaciones[0].nombre+' - '+estaciones[estaciones.length - 1].nombre+'</p>';
        htmlListaLineas += '<span class="ui-li-count">'+metro.lineas[i].estaciones.length+'</span>';
        htmlListaLineas += '<ul data-role="listview">';
        for(j=0; j<estaciones.length; j++) {
            htmlListaLineas += '<li><a href="#" onclick="C_InfoEstacion.dispatch('+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon"" /><span>'+estaciones[j].nombre+'</span></a></li>';
        }
        htmlListaLineas += '</ul>';
        htmlListaLineas += '</li>';
    }
    $('#listaLineas').append(htmlListaLineas);

    // Lista de estaciones
    var htlmListaEstaciones = "";
    var htlmListaEstacionesOrigen = "";
    var htlmListaEstacionesDestino = "";
    for(i=0; i<metro.lineas.length; i++) {
        htlmListaEstaciones += '<li data-role="list-divider">'+metro.lineas[i].nombre+'</li>';
        estaciones = metro.lineas[i].estaciones;
        for(j=0; j<estaciones.length; j++) {
            htlmListaEstaciones += '<li><a href="#" onclick="C_InfoEstacion.dispatch('+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon" /><span>'+estaciones[j].nombre+'</span></a></li>';
            htlmListaEstacionesOrigen += '<li><a href="#" onClick="C_SeleccionarEstacionCalcularRuta.dispatch(\'origen\', '+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon" /><span>'+estaciones[j].nombre+'</span></a></li>';
            htlmListaEstacionesDestino += '<li><a href="#" onClick="C_SeleccionarEstacionCalcularRuta.dispatch(\'destino\', '+estaciones[j].id+')"><img src="'+estaciones[j].icono+'" class="ui-li-icon" /><span>'+estaciones[j].nombre+'</span></a></li>';
        }
    }
    $('#listaEstaciones').append(htlmListaEstaciones);
    $('#listaEstacionesOrigen').append(htlmListaEstacionesOrigen);
    $('#listaEstacionesDestino').append(htlmListaEstacionesDestino);
}

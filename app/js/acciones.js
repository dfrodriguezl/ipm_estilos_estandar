
import $ from 'jquery';



$(document).ready(function(){

    // $(document).on('click', function(event) {
    //     if (!$(event.target).closest('#modal-content').length) {
    //         closeModal();
    //     }
    // });    
    

    $('#rapida').click(function(){
        $("#guide").toggleClass("tab-visible");
        $("#messages").removeClass("tab-visible");
        $("#settings").removeClass("tab-visible");
        $("#rapida__1").toggleClass("tab-active");
        $("#acerca__1").removeClass("tab-active");
        $("#contacto__1").removeClass("tab-active");
    })

    $('#acerca').click(function(){
        $("#messages").toggleClass("tab-visible");
        $("#guide").removeClass("tab-visible");
        $("#settings").removeClass("tab-visible");
        $("#acerca__1").toggleClass("tab-active");
        $("#rapida__1").removeClass("tab-active");
        $("#contacto__1").removeClass("tab-active");
    })

    $('#contacto').click(function(){
        $("#settings").toggleClass("tab-visible");
        $("#messages").removeClass("tab-visible");
        $("#guide").removeClass("tab-visible");
        $("#contacto__1").toggleClass("tab-active");
        $("#acerca__1").removeClass("tab-active");
        $("#rapida__1").removeClass("tab-active");
    })

    $('#ayuda').click(function(){
        $("#ayuda").toggleClass("container-tool-active");
        $("#mapas-base").removeClass("container-tool-active");
        $("#ubicacion").removeClass("container-tool-active");
        $("#consultas").removeClass("container-tool-active");
        $("#temascapas").removeClass("seccion-active");
        $("#basemaps").removeClass("seccion-active");
        $("#filtroubicacion").removeClass("seccion-active");
        $("#modal1").toggleClass("seccion-active");
        $("#filtroubicacionmunicipio").hide();
    })

    $('#ubicacion').click(function(){
        $("#ubicacion").toggleClass("container-tool-active");
        $("#mapas-base").removeClass("container-tool-active");
        $("#ayuda").removeClass("container-tool-active");
        $("#consultas").removeClass("container-tool-active");
        $("#temascapas").removeClass("seccion-active");
        $("#basemaps").removeClass("seccion-active");
        $("#filtroubicacion").toggleClass("seccion-active");
        $("#modal1").removeClass("seccion-active");
    })

    $('#consultas').click(function(){
        $("#consultas").toggleClass("container-tool-active");
        $("#mapas-base").removeClass("container-tool-active");
        $("#ubicacion").removeClass("container-tool-active");
        $("#ayuda").removeClass("container-tool-active");
        $("#temascapas").toggleClass("seccion-active");
        $("#basemaps").removeClass("seccion-active");
        $("#filtroubicacion").removeClass("seccion-active");
        $("#filtroubicacionmunicipio").hide();
        $("#modal1").removeClass("seccion-active");
    })

    $('#mapas-base').click(function(){
        $("#mapas-base").toggleClass("container-tool-active");
        $("#consultas").removeClass("container-tool-active");
        $("#ubicacion").removeClass("container-tool-active");
        $("#ayuda").removeClass("container-tool-active");
        $("#temascapas").removeClass("seccion-active");
        $("#basemaps").toggleClass("seccion-active");
        $("#descarga").toggleClass("seccion-active");
        $("#filtroubicacion").removeClass("seccion-active");
        $("#filtroubicacionmunicipio").hide();
        $("#modal1").removeClass("seccion-active");
    })
    
    
    

    $('#close1').click(function(){
        $("#modal1").hide();
        $("#modal1").removeClass("seccion-active");
    })

    $("#ver__mas").on("click",function(){        
        $("#ver__mas").toggleClass("temasgeneral_none");
        $("#ver__menos").toggleClass("prueba");
        $('#temascarga').toggleClass("temasgeneral_none");
        $('#ver__menos').removeClass("filter__thematicGroup__more__menos__none");
        $('#temasg').toggleClass("prueba__temas");
        $('#temas1').toggleClass("prueba");
        $('#temas2').toggleClass("prueba");
        $('#temas3').toggleClass("prueba");
        $('#temas4').toggleClass("prueba");
        $('#temas9').toggleClass("prueba");
        $('#temas11').toggleClass("prueba");
    })

    $("#ver__menos").on("click",function(){        
        $("#ver__menos").toggleClass("temasgeneral_none");
        $("#ver__mas").toggleClass("activo-tema");
        $('#ver__menos').removeClass("prueba");
        $('#temascarga').removeClass("temasgeneral_none");
        $('#temasg').removeClass("prueba__temas");
        $('#temas1').removeClass("prueba");
        $('#temas2').removeClass("prueba");
        $('#temas3').removeClass("prueba");
        $('#temas4').removeClass("prueba");
        $('#temas9').removeClass("prueba");
        $('#temas11').removeClass("prueba");
    })

    $("#temas1").on("click",function(){        
        $("#primertema").toggleClass("activo-tema");
        $('#segundotema').removeClass("activo-tema");
        $('#tercerotema').removeClass("activo-tema");
        $('#cuartotema').removeClass("activo-tema");
        $('#novenotema').removeClass("activo-tema");
        $('#oncetema').removeClass("activo-tema");
    })
    $("#temas2").on("click",function(){        
        $("#segundotema").toggleClass("activo-tema");
        $('#primertema').removeClass("activo-tema");
        $('#tercerotema').removeClass("activo-tema");
        $('#cuartotema').removeClass("activo-tema");
        $('#novenotema').removeClass("activo-tema");
        $('#oncetema').removeClass("activo-tema");
    })
    $("#temas3").on("click",function(){        
        $("#tercerotema").toggleClass("activo-tema");
        $('#primertema').removeClass("activo-tema");
        $('#segundotema').removeClass("activo-tema");
        $('#cuartotema').removeClass("activo-tema");
        $('#novenotema').removeClass("activo-tema");
        $('#oncetema').removeClass("activo-tema");
    })
    $("#temas4").on("click",function(){        
        $("#cuartotema").toggleClass("activo-tema");
        $('#primertema').removeClass("activo-tema");
        $('#segundotema').removeClass("activo-tema");
        $('#tercerotema').removeClass("activo-tema");
        $('#novenotema').removeClass("activo-tema");
        $('#oncetema').removeClass("activo-tema");

        $("#ver__menos").toggleClass("basetemas");
        $("#ver__mas").toggleClass("activo-tema");
        $('#ver__menos').removeClass("prueba");
        $('#temascarga').removeClass("temasgeneral_none");
        $('#temasg').removeClass("prueba__temas");
        $('#temas1').removeClass("prueba");
        $('#temas2').removeClass("prueba");
        $('#temas3').removeClass("prueba");
        $('#temas4').removeClass("prueba");
        $('#temas9').removeClass("prueba");
        $('#temas11').removeClass("prueba");
    })
    $("#temas9").on("click",function(){        
        $("#novenotema").toggleClass("activo-tema");
        $('#primertema').removeClass("activo-tema");
        $('#segundotema').removeClass("activo-tema");
        $('#tercerotema').removeClass("activo-tema");
        $('#cuartotema').removeClass("activo-tema");
        $('#oncetema').removeClass("activo-tema");

        $("#ver__menos").toggleClass("basetemas");
        $("#ver__mas").toggleClass("activo-tema");
        $('#ver__menos').removeClass("prueba");
        $('#temascarga').removeClass("temasgeneral_none");
        $('#temasg').removeClass("prueba__temas");
        $('#temas1').removeClass("prueba");
        $('#temas2').removeClass("prueba");
        $('#temas3').removeClass("prueba");
        $('#temas4').removeClass("prueba");
        $('#temas9').removeClass("prueba");
        $('#temas11').removeClass("prueba");
    })
    $("#temas11").on("click",function(){        
        $("#oncetema").toggleClass("activo-tema");
        $('#primertema').removeClass("activo-tema");
        $('#segundotema').removeClass("activo-tema");
        $('#tercerotema').removeClass("activo-tema");
        $('#novenotema').removeClass("activo-tema");
        $('#cuartotema').removeClass("activo-tema");


        $("#ver__menos").toggleClass("basetemas");
        $("#ver__mas").toggleClass("activo-tema");
        $('#ver__menos').removeClass("prueba");
        $('#temascarga').removeClass("temasgeneral_none");
        $('#temasg').removeClass("prueba__temas");
        $('#temas1').removeClass("prueba");
        $('#temas2').removeClass("prueba");
        $('#temas3').removeClass("prueba");
        $('#temas4').removeClass("prueba");
        $('#temas9').removeClass("prueba");
        $('#temas11').removeClass("prueba");
    })
    
    
})

function openModal() {
    var modal = $('#modal1');
    modal.show();
}

function closeModal() {
    var modal = $('#modal1');
    modal.hide();
}
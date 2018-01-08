/*------JQuery-Code----------*/
$( document ).ready(function() {
    $('.hide').click(function(){
        $('.content').toggleClass('active');
    });
    $('.btn').click(function(){
        $('.filter').toggleClass('active'); 
    });
    $('.burger').click(function(){
        $('.burgermenu').toggleClass('active');
    })
});

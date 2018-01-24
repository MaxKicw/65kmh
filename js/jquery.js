/*------JQuery-Code----------*/
$( document ).ready(function() {
    $('.hide').click(function(){
        $('.content').toggleClass('active');
        $('.fa-arrow-down').toggleClass('active');
        $('.search').toggleClass('active');
    });
    $('.btn').click(function(){
        $('.filter').toggleClass('active'); 
    });
    
    $('.burger').click(function(){
        $('.burgermenu').toggleClass('active');
        $('.cross').toggleClass('active');
        $('.bar').toggleClass('deactive');
    })
    $('.bar').click(function(){
      
    });
    $('.cross').click(function(){
        $('.burgermenu').addClass('active');
        $(this).removeClass('deactive');
        $('.cross').removeClass('active');
    });
    $('.fa-heart').click(function(){
        
    });
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log(h);
    var vh = h*0.4;
     $(window).scroll(function(){
       if($(this).scrollTop()>vh){
           $('.search').addClass('fixed');
           $('.branding').addClass('fixed');
           $('.searchbar').addClass('fixed');
       }else{
           $('.search').removeClass('fixed');
           $('.branding').removeClass('fixed');
           $('.searchbar').removeClass('fixed');
           
       }
   });
});

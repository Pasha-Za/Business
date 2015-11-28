$(function () {
	console.log("main.js");
});

//************InViewPort
function inViewport(elemet){
  
  //Element view position
var elementOffset = $(elemet).offset().top;
var elementHeight = $(elemet).height();
var elementView = elementOffset+elementHeight;

  //Window view position
var docHeight = $(window).height();
var spyScroll = $(window).scrollTop();
var documentView = docHeight+spyScroll;

return ((elementView <= documentView) && (elementOffset >= spyScroll));
 }

//Slicky Nav
 $(window).scroll(function () {
   var block =$('nav');
   block.each(function () {
      if (inViewport(this) != true) {
          $(this).addClass('slicky-nav');
          $(this).fadeIn('slow');;
      }
     else if($(this).offset().top<= 118){
       $(this).removeClass('slicky-nav');
     }
     // else{
     //   console.log('see');
     // }
   });
});

//mobile nav
$('.menu').click(function(){
  $('.nav-mob').addClass('nav-mob-active');
  $('.drop-nav-ul ul').addClass('show-nav');
  // $('.drop-nav-ul ul').css({display:'block', left:'100%'});
});
$('.close-nav').click(function(){
  $('.nav-mob').removeClass('nav-mob-active');
  $('.drop-nav-ul ul').addClass('hide-nav');
  // $('.drop-nav-ul ul').css('display','none');
  $('.drop-nav-ul ul').removeClass('ul-active');
});


function desktopVersion(){
      $('.nav-mob .menu-block').removeClass('container-fluid');
      $('.nav-mob .menu-block').addClass('container');
      $('.drop-nav-ul>a').click(function(){
          $(this).parent().find('ul:first').removeClass('ul-active');
          // var link = $(this).attr('href');
          // window.location = link;
          console.log("Я должна перейти по ссылке");
      });
      // console.log('Desktop menu');
  }

function mobVersion(){
        $('.nav-mob .menu-block').removeClass('container');
        $('.nav-mob .menu-block').addClass('container-fluid');
        //Prevent click on mobile
        $('.inner-level-link').click(function(event){
          event.preventDefault();
          $(this).parent().find('ul:first').addClass('ul-active');
          console.log('Я работаю ТОЛЬКО на маленьких экранах но мне ПОХУЙ НА ЭТО');
        });
        // console.log('Mobile menu');
  }

function mobContainer(){
  var browerView = $(window).width();

  if  (browerView<=992){
      mobVersion();
  }
  else if(browerView>992){
      desktopVersion();
  }
}

setInterval( function(){ mobContainer() },50);

$(document).mouseup(function (e) {
        var container = $(".nav-mob");
        if (container.has(e.target).length === 0){
        $('.drop-nav-ul ul').addClass('hide-nav');
        $('.drop-nav-ul ul').removeClass('ul-active');
        $(container).removeClass('nav-mob-active');
        }
    });

// $('.drop-nav-ul').click(function(event){
//   event.preventDefault();
//   $(this).find('ul:first').addClass('ul-active');
// });

$('body').on('click', '.nav-back', function(){
    var back = $(this).parent();
    back.parent().removeClass('ul-active');
});


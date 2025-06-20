// bootstrap first click issue 
$(document).on('click', '[data-toggle="dropdown"]', function () {
  // console.log(this)
  setTimeout(() => {
    $('.dropdown-menu').removeClass('show');
    $(this).next().toggleClass('show');
  },10);
})
$(document).on('click', '.live-search-list li', function () {
  setTimeout(() => {
    $(this).parents('dropdown-menu').removeClass('show');
    $('.cls-notification-bar').removeClass('show')
  },100);
})
$(document).on("click", function(event){
  var $trigger = $(".nav-link[data-toggle='dropdown']");
  if($trigger !== event.target && !$trigger.has(event.target).length){
    $('.dropdown-menu').removeClass('show');
  }            
});
/**
 * Author: Padma Priya 
 * Desc : detect esc on full screen mode
 */
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);
function exitHandler() {
   if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
    $('.cls-fullscreen').removeClass('active-fullscreen');
   }
}  
/**
 * Custom radio icon
 */
$(document).on('click', '.form-group input[type="radio"]', function () {
    var tst = $(this).parent();
    tst.children('em').addClass('icon-7-radio-on');
    tst.siblings().find('em').removeClass('icon-7-radio-on').addClass('icon-6-radio-off');
    tst.addClass('cls-radio-on');
    tst.siblings().removeClass('cls-radio-on');
  });
  $(window).scroll(function() {
    var $el = $('.cls-top');
    
    if($(this).scrollTop() >= 300) $el.addClass('shown');
    else $el.removeClass('shown');
  });
  /**
   * common action button disable
   */
  $(document).on('click', '.cls-btn-login,.cls-btnservicecall', function () {    
    // console.log(this);
    $(this).addClass('cls-disableaction');
    setTimeout(()=>{
      $('.cls-disableaction').removeClass('cls-disableaction');
  },3500)  
  });
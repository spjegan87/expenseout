/************** tab control ********************/
$(document).ready(function() {
    /** To enable accessibility
    when shown all accessibility based function works
    when hidden all acceddibility based function stops
     */
    var accessibility = $('.contrast-col').is(":visible");
    // console.log(accessibility);
      if (accessibility == true)
    {
      var DURATION = 500;
      var ringElem = null;
      var movingId = 0;
      var prevFocused = null;
      var keyDownTime = 0;
      var win = window;
      var doc = document;
      var docElem = doc.documentElement;
      var body = doc.body;
      //var eventList = ["keydown", "click"];
      //for(event of eventList) {
      docElem.addEventListener('keydown', function(event) {
        var code = event.which;
        // Show animation only upon Tab or Arrow keys press.
        if (code === 9 || (code > 36 && code < 41)) {
          keyDownTime = Date.now();
        }
      }, false);
      //}
      docElem.addEventListener('focus', function(event) {
          var target = event.target;
          if (( target).id === 'flying-focus') {
            return;
          }
          var isFirstFocus = false;
          if (!ringElem) {
            isFirstFocus = true;
            initialize();
          }
          
          if($(target).attr('type')=='radio'){
            var ele_parent=$(target).parent();
          }
          var offset = offsetOf(target,ele_parent);
          ringElem.style.left = -2 + offset.left + 'px';
          ringElem.style.top = -2 + offset.top + 'px';
          ringElem.style.width = 4 + ( target).offsetWidth + 'px';
          ringElem.style.height = 4 + ( target).offsetHeight + 'px';
    
          if (isFirstFocus || !isJustPressed()) {
            return;
          }
          onEnd();
          ( target).classList.add('flying-focus_target');
          ( target).classList.add('current-ele');
          ringElem.classList.add('flying-focus_visible');
          //prevFocused = target;
          $(prevFocused).removeClass('current-ele');
          if($('.current-ele').attr('type')=='radio'){
            $('.current-ele').parent().addClass('radio-parent');
          }
          //console.log(prevFocused);
          prevFocused = target;
          //movingId = setTimeout(onEnd, DURATION);
      }, true);
      docElem.addEventListener('blur', function() {
        onEnd();
      }, true);
  
      function initialize() {
        ringElem = doc.createElement('flying-focus');
        ringElem.id = 'flying-focus';
        ringElem.style.transitionDuration = ringElem.style.WebkitTransitionDuration = DURATION / 1000 + 's';
        body.appendChild(ringElem);
      }
      function onEnd() {
        if (!movingId) {
          return;
        }
        clearTimeout(movingId);
        movingId = 0;
        ringElem.classList.remove('flying-focus_visible');
        prevFocused.classList.remove('flying-focus_target');
        prevFocused = null;
      }
      function isJustPressed() {
        return Date.now() - keyDownTime < 42
      }
      function offsetOf(elem,ele_parent) {
      //  if(ele_parent){
      //     var rect_parent = ele_parent.getBoundingClientRect();
      //  }
      //  else{
          var rect = elem.getBoundingClientRect();
      //  }
      
      
        var clientLeft = docElem.clientLeft || body.clientLeft;
        var clientTop = docElem.clientTop || body.clientTop;
        var scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop;
        var left = rect.left + scrollLeft - clientLeft;
        var top = rect.top + scrollTop - clientTop;
        if(ele_parent){
          // console.log(ele_parent)
          // var left = rect_parent.left + scrollLeft - clientLeft;
          // var top = rect_parent.top + scrollTop - clientTop;
          // console.log('radio left:'+left,'radio top:'+top);
      }
      
        // console.log(top,left);
        return {
          top: top || 0,
          left: left || 0
        };
      }
      //To check element length and max tabindex
      $(document.body).keydown(function(e)
      {
        if(e.keyCode == 9)
        {
          var countLength = $("input,a,textarea,select,button").filter( ":visible" ).filter(":not('.skip-tab-index')").length;
          var max = -1;
          $('body [tabindex]').attr('tabindex', function (a, b) {
            max = Math.max(max, parseInt(b));
          });
          //console.log(countLength," != ",max);
          if( countLength != max )
            setTabIndex();
        }
      });
      function setTabIndex() {
        var totalElements = 1;
        $("input,a,textarea,select,button ,.add-tab-index").each(function(a, b) {
          //To skip the tab index
          //console.log(b);
          var iptype=$(b).attr('type');
          //console.log(iptype);
            if($(iptype).is(':radio')){
              //console.log('radio button');
            }
          if ($(b).hasClass("skip-tab-index") || $(".skip-tab-index").find($(b)).length)
            $(b).attr("tabindex",-1);
          //To set the tab index
          //else if ($(b).is(":visible") || $('#groupDiv1').find($(b)).length)
            //$(b).attr("tabindex", totalElements++);
        });
        return totalElements;
      };

      $(document).on('click','.custom-navbar .navbar-nav > li a', function(){
        $(this).next().find('li:first a').focus();
      });
  
      
      /* Focus remove on click */
      $(document).on('click', 'input, body', function() {
        var type_ip=$('#flying-focus').attr('type');
        //console.log(type_ip);
        $('body').find('#flying-focus').css('height','0px').removeClass('flying-focus_visible');// Removes the focus fly when mouse click is used
      });
      
      $(document).on('focus', '.date', function() {
        $(this).parent('p.relative').trigger('click');
        
        
        });
        $(document).on('focus','.dropdown-submenu',function(){
            $(this).children('.dropdown-menu').addClass("show");
            $(this).children('.dropdown-toggle').addClass("open");
          }) 
      /*Form submission when user clicks on enter*/
    
    }
});
/************* tab control **************/
  
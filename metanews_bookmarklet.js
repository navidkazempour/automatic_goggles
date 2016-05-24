// gmail this
javascript:(function(){popw='';Q='';d=document;w=window;if(d.selection){Q=d.selection.createRange().text;}else if(w.getSelection){Q=w.getSelection();}else if(d.getSelection){Q=d.getSelection();}popw=w.open('https://mail.google.com/mail/s?view=cm&fs=1&tf=1&to=&su='+encodeURIComponent(d.title)+'&body='+encodeURIComponent(Q)+escape('%5Cn%5Cn')+encodeURIComponent(d.location)+'&zx=RANDOMCRAP&shva=1&disablechatbrowsercheck=1&ui=1','gmailForm','scrollbars=yes,width=680,height=575,top=175,left=75,status=no,resizable=yes');if(!d.all)setTimeout(function(){popw.focus();},50);})();

// puts in ordinary mail
javascript:location.href='mailto:?SUBJECT='+document.title+'&BODY='+escape(location.href);

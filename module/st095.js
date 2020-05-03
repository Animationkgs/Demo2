

//alert('0st095');

var st095= {};

var lesson_name = function (m) { return m.data.lesson.title; };

var getiframe= function (vid) {
	if (vid) {
   var ret= {};
   ret.youtube_id= vid;
	ret.video= {};
   ret.video.iframe= iframe(vid);
	return ret;
	}
	return null;
};

var constructquestion= function (q) {
	//alert('0question');
   var ret= {};
   ret.alt_text= q.alt_text;
   ret.semantic_type= q.semantic_type;
   ret.image= img('images/'+q.non_google_background_image.split('/').slice(-1,));
	//alert('question');
	return ret;
};

var constructquiz= function (a) {
	//alert('0quiz');
   var ret= {};
   ret.instruction= getiframe(a.instruction.video.youtube_id);
   ret.question= constructquestion(a.question);
   ret.answer= getiframe(a.answer.video.youtube_id);
   ret.userstate= a.user_state.unstructured;
	//alert('quiz');
	return ret;
};

var getnote= function (a) {
	//alert('0note');
   if ( a.hasOwnProperty('instructor_notes') ) return a.instructor_notes;
	   alert('no instructor notes');
	   return null;
};

var getatom= function (c) {
	//alert('0atom');
   if ( c.hasOwnProperty('atoms') ) {
      if (c.atoms.length>1) alert ('>1');
      return c.atoms[0];
   }
   return null;
};

var isVideoAtom= function(a) { return a.semantic_type== 'VideoAtom'; }; 
var isQuizAtom= function(a) { return a.semantic_type== 'QuizAtom'; }; 
var constructatom = function (a) {
	//alert('0constructatom');
	var ret= {};
   var n= getnote(a);
   if (n) ret.instructor_notes= n;
   ret.semantic_type= a.semantic_type;
      if (isVideoAtom(a)) ret.theory= getiframe(a.video.youtube_id);
	else if (isQuizAtom(a)) ret.quiz= constructquiz(a);
	//else alert(ret.semantic_type);
	//alert('atom');
	return ret;
}


var concept= function (c) {
	//alert('0concept');
   var ret= { name: c.title };
   ret.atom= constructatom(getatom(c));
	//alert('concept');
	return ret;
};

var f= function (m) {
	//alert('0f');
	var cx= [];
	var i= 0;
	var a= m.data.lesson.concepts;
	while ( i < a.length ) {
		//alert(i);
		var x= a[i];
		var d= concept(x);
		cx.push(d);
		i++;
	}
	//alert('f');
	return { name : lesson_name(m), concepts: cx };
};

var mx= [m01,m02,m03,m04,m05,m06,m07,m08,m09,
	m10, m11,m12,m13,m14,m15,m16,m17,m18,m19,
	m20, m21,m22,m23,m24,m25,m26,m27,m28,m29,
	m30, m31,m32,m33,m34,m35,m36,m37,m38];

st095.mx= mx;

st095.lesson01= f(m01);
st095.lesson02= f(m02);
st095.lesson03= f(m03);
st095.lesson04= f(m04);
st095.lesson05= f(m05);
st095.lesson06= f(m06);
st095.lesson07= f(m07);
st095.lesson08= f(m08);
st095.lesson09= f(m09);

st095.lesson10= f(m10);
st095.lesson11= f(m11);
st095.lesson12= f(m12);
st095.lesson13= f(m13);
st095.lesson14= f(m14);
st095.lesson15= f(m15);
st095.lesson16= f(m16);
st095.lesson17= f(m17);
st095.lesson18= f(m18);
st095.lesson19= f(m19);

st095.lesson20= f(m20)
st095.lesson21= f(m21);
st095.lesson22= f(m22);
st095.lesson23= f(m23);
st095.lesson24= f(m24);
st095.lesson25= f(m25);
st095.lesson26= f(m26);
st095.lesson27= f(m27);
st095.lesson28= f(m28);
st095.lesson29= f(m29);

st095.lesson30= f(m30);
st095.lesson31= f(m31);
st095.lesson32= f(m32);
st095.lesson33= f(m33);
st095.lesson34= f(m34);
st095.lesson35= f(m35);
st095.lesson36= f(m36);
st095.lesson37= f(m37);
st095.lesson38= f(m38);

//alert('st095');


st095.lesson01.concepts[2].quizanswer= 'blue';
st095.lesson01.concepts[3].quizanswer= null;

var putsrt= function (cx,a,b) {
   var i= -1, count= 0;
   while ( ++i < cx.length ) {
      var x= cx[i];
	   //alert(i);
      if (x.atom.semantic_type=='VideoAtom') {
         //alert(count);
         //alert(a[count]);
         //x.atom.theory.summary= pretty(b[count]);
         x.atom.theory.video.text= pretty(a[count++]);
      }
	   else if (x.atom.semantic_type=='QuizAtom') {
	if (x.atom.quiz.instruction) {
         x.atom.quiz.instruction.summary= pretty(b[count]);
         x.atom.quiz.instruction.video.text= pretty(a[count++]);
	}
	if (x.atom.quiz.answer) {
         x.atom.quiz.answer.summary= pretty(b[count]);
         x.atom.quiz.answer.video.text= pretty(a[count++]);	
	}
      }
   }
};

putsrt(st095.lesson01.concepts, srt01, srtm01);
putsrt(st095.lesson03.concepts, srt03, srtm03);
putsrt(st095.lesson04.concepts, srt04, srtm04);

//alert('0images');
var images= function (mx) {
	var j= -1;
	var ret= [];
   while ( ++j < mx.length ) { 
      var cx= mx[j].data.lesson.concepts;
      var i= -1, count= 0;
   while ( ++i < cx.length ) {
      var a= getatom(cx[i]);
      if (isQuizAtom(a)) ret.push(a.question.non_google_background_image);
   }
	}
	return ret;
};

st095.images= images(st095.mx);

var pad= function (x)   { return x.toString().padStart(2, "0"); };
var subtitles= function (mx) {
	var j= -1;
	var ret= [];
   while ( ++j < mx.length ) { 
      var r= mx[j].data.lesson.resources, fx, uri;
	if (r) fx= r.files;
	   else continue;
	   if (fx && fx.length >= 2) {
		   uri=  fx[1].uri;
		   //alert(uri);
		   st095['lesson'+pad(j+1)].TranscriptsZipFile= uri;
		   ret.push( uri );
	   }
   }
	return ret;
};

st095.subtitles= subtitles(st095.mx);


var notes= function (mx) {
	var j= -1;
	var ret= [];
   while ( ++j < mx.length ) { 
      var cx= mx[j].data.lesson.concepts;
      var i= -1, count= 0;
   while ( ++i < cx.length ) {
      var a= getatom(cx[i]);
	   var n= getnote(a);
      if (n) ret.push('lesson'+pad(j+1)+pad(i+1)+' '+n);
   }
	}
	return ret;
};

st095.instructor_notes= notes(st095.mx);


var links= function (mx) {
   var j= -1;
   var ret= [];
   var par= new DOMParser();
   while ( ++j < mx.length ) { 
      var cx= mx[j].data.lesson.concepts;
      var i= -1, count= 0;
      while ( ++i < cx.length ) {
         var a= getatom(cx[i]);
         var n= getnote(a);
         if (n) {
            var doc= par.parseFromString(n,'text/html');
            var ax= doc.getElementsByTagName('a');
            if (ax.length > 0) {
               var k=-1; while (++k < ax.length) ret.push(ax[k].href);
            }
         }
      }
   }
   return ret;
};

st095.links= links(st095.mx);
//var s= new Set();
//var k=-1; while (++k < st095.links.length) s.add(st095.links[k]);
st095.uniquelinks= Array.from(new Set(st095.links));


YUI.add("gallery-cssmatrix2d",function(e,t){(function(e){"use strict";var t=Math,n=t.PI/180,r=t.cos,i=e.Lang.isUndefined,s=t.sin,o=t.tan,u=function(){};u.prototype={a:1,b:0,c:0,d:1,e:0,f:0,inverse:function(){var e=this,t=e.a,n=e.b,r=e.c,i=e.d,s=e.e,o=e.f,a=t*i-n*r,f=new u;if(!a)throw new Error("Can not be inverted.");return f.a=i/a,f.b=-n/a,f.c=-r/a,f.d=t/a,f.e=(r*o-i*s)/a,f.f=(n*s-t*o)/a,f},multiply:function(e){var t=this,n=t.a,r=t.b,i=t.c,s=t.d,o=e.a,a=e.b,f=e.c,l=e.d,c=e.e,h=e.f,p=new u;return p.a=n*o+i*a,p.b=r*o+s*a,p.c=n*f+i*l,p.d=r*f+s*l,p.e=n*c+i*h+t.e,p.f=r*c+s*h+t.f,p},rotate:function(e){return this.rotateRad(e*n)},rotateRad:function(e){var t=new u;return t.a=r(e),t.b=s(e),t.c=-s(e),t.d=r(e),this.multiply(t)},scale:function(e,t){var n=new u;return n.a=e,n.d=i(t)?e:t,this.multiply(n)},setMatrixValue:function(e){var t=this;return e=e.split(","),e.length<6?t:(t.a=parseFloat(e[0].substr(e[0].lastIndexOf("(")+1)),t.b=parseFloat(e[1]),t.c=parseFloat(e[2]),t.d=parseFloat(e[3]),t.e=parseFloat(e[4]),t.f=parseFloat(e[5]),t)},skewX:function(e){return this.skewXRad(e*n)},skewXRad:function(e){var t=new u;return t.c=o(e),this.multiply(t)},skewY:function(e){return this.skewYRad(e*n)},skewYRad:function(e){var t=new u;return t.b=o(e),this.multiply(t)},toString:function(){var e=this;return"matrix("+e.a+", "+e.b+", "+e.c+", "+e.d+", "+e.e+", "+e.f+")"},translate:function(e,t){var n=new u;return n.e=e,n.f=t,this.multiply(n)}},e.CSSMatrix2d=u})(e)},"gallery-2013.06.05-22-14",{requires:["yui"]});
"use strict";(self.webpackChunkwallet_finance_app=self.webpackChunkwallet_finance_app||[]).push([[340],{8742:function(e,n,r){r.d(n,{db:function(){return u},l:function(){return o},t:function(){return c}});var t=r(4702),a=r(7799),s=r(276),i={apiKey:"AIzaSyBfXAxRJslxqj-AerizfJMYiWw8-rVucBc",authDomain:"users-2b39a.firebaseapp.com",databaseURL:"https://users-2b39a-default-rtdb.europe-west1.firebasedatabase.app",projectId:"users-2b39a",storageBucket:"users-2b39a.appspot.com",messagingSenderId:"164438428254",appId:"1:164438428254:web:8f2e84b8a7579b11df82cf"},o=(0,t.ZF)(i),u=(0,a.ad)(o),c=(0,s.cF)(o)},1340:function(e,n,r){r.r(n),r.d(n,{default:function(){return z}});var t,a,s=r(4165),i=r(5861),o=r(9439),u=r(168),c=r(2791),l=r(1724),d=r(5705),m=r(6598),p=r(890),f=r(8870),h=r(6151),x=r(8789),w=r(9460),g=r(8742),v=r(7689),b=r(4164),j=r(1425),Z=r.n(j),y=r(184),P=document.getElementById("modal-root"),S=function(){var e=(0,c.useState)(!0),n=(0,o.Z)(e,2),r=(n[0],n[1]),t=(0,c.useState)({height:window.innerHeight,width:window.innerWidth}),a=(0,o.Z)(t,2),s=a[0],i=a[1],u=function(){var e;return i({y:null===(e=window)||void 0===e?void 0:e.innerHeight,x:window.innerWidth})};return(0,c.useEffect)((function(){return window.addEventListener("resize",u),function(){return window.removeEventListener("resize",u)}}),[]),(0,c.useEffect)((function(){var e=setTimeout((function(){r(!1)}),1e3);return function(){clearTimeout(e)}}),[]),b.createPortal((0,y.jsx)(y.Fragment,{children:(0,y.jsx)(Z(),{width:s.width,height:s.height,tweenDuration:2e3,onConfettiComplete:function(e){r(!1),null===e||void 0===e||e.reset()}})}),P)},k=r(761),C=r.n(k),B=function(e){var n=e.password,r=C()(n),t=100*r.score/4;console.log("num: ",t);var a=function(){switch(r.score){case 0:return"#828282";case 1:return"#EA1111";case 2:return"#FFAD00";case 3:return"#9bc158";case 4:return"#00b500";default:return"none"}};return(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(f.Z,{sx:{height:"5px",width:"100%",backgroundColor:"#eff0eb"},children:(0,y.jsx)(f.Z,{sx:{width:"".concat(t,"%"),backgroundColor:a(),height:"5px"}})})})},_=l.Ry({name:l.Z_().min(2,"Too Short!").max(50,"Too Long!").required("Please enter your full name"),email:l.Z_().email("Invalid email").required("Please enter your email"),password:l.Z_().required().min(6,"Please enter your password"),confirmPassword:l.Z_().oneOf([l.iH("password"),null],"Passwords must match")}),E=(0,x.ZP)(d.gN)(t||(t=(0,u.Z)(["\n  font-size: 16px;\n  display: block;\n  width: 400px;\n  padding: 10px 10px;\n  margin-bottom: 5px;\n"]))),F=x.ZP.div(a||(a=(0,u.Z)(["\n  color: red;\n  font-size: 14px;\n"]))),I={name:"",email:"",password:"",confirmPassword:""},z=function(){var e=(0,c.useState)(""),n=(0,o.Z)(e,2),r=n[0],t=n[1],a=(0,c.useState)(null),u=(0,o.Z)(a,2),l=(u[0],u[1]),x=(0,c.useState)(!1),b=(0,o.Z)(x,2),j=b[0],Z=b[1],P=(0,v.s0)(),k=(0,w.v0)(g.l),C=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n,r){var t,a;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.resetForm,e.prev=1,e.next=4,(0,w.Xb)(k,n.email,n.password);case 4:a=e.sent,l(a.user),Z(!0),t(),setTimeout((function(){Z(!1),P("/login",{replace:!0})}),3e3),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(n,r){return e.apply(this,arguments)}}();return(0,y.jsxs)(m.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",width:"100vw"},children:[(0,y.jsx)(p.Z,{sx:{mb:2},variant:"h4",children:"Registration"}),(0,y.jsx)(d.J9,{initialValues:I,validationSchema:_,onSubmit:C,children:function(e){var n=e.errors,a=e.touched,s=e.values,i=e.handleChange;return(0,y.jsxs)(d.l0,{autoComplete:"off",children:[(0,y.jsxs)(f.Z,{sx:{marginBottom:"20px"},children:[(0,y.jsx)(E,{type:"text",name:"name",placeholder:"\u0406\u043c'\u044f"}),n.name&&a.name?(0,y.jsx)(F,{children:n.name}):null]}),(0,y.jsxs)(f.Z,{sx:{marginBottom:"20px"},children:[(0,y.jsx)(E,{type:"email",name:"email",placeholder:"Email"}),n.email&&a.email?(0,y.jsx)(F,{children:n.email}):null]}),(0,y.jsxs)(f.Z,{sx:{marginBottom:"20px"},children:[(0,y.jsx)(E,{type:"password",name:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",onChange:function(e){return function(e,n,r){r(e),t(n.password)}(e,s,i)}}),(0,y.jsx)(B,{password:r}),n.password&&a.password?(0,y.jsx)(F,{children:n.password}):null]}),(0,y.jsxs)(f.Z,{sx:{marginBottom:"20px"},children:[(0,y.jsx)(E,{type:"password",name:"confirmPassword",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c"}),n.confirmPassword&&a.confirmPassword?(0,y.jsx)(F,{children:n.confirmPassword}):null]}),(0,y.jsx)(h.Z,{type:"submit",fullWidth:!0,variant:"contained",children:"Submit"})]})}}),j&&(0,y.jsx)(S,{})]})}}}]);
//# sourceMappingURL=340.24b3c9aa.chunk.js.map
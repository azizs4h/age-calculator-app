import{r as w,a as C,o as _,c as D,b as l,w as V,d as p,F as T,e as q,f as N,g as h,h as b,i as U,t as E,u as I}from"./index-4377f135.js";const $={class:"age-app-card"},z={class:"input-section"},H={class:"calculate-section"},L=p("hr",{class:"horizontal-divider"},null,-1),P={class:"calculations-section"},S={__name:"AgeCard",setup(Y){const f=w(),M=new Date().getFullYear(),v={day:[e=>!!e||"This Field Required",e=>K(e)||"Must be valid day"],month:[e=>!!e||"This Field Required",e=>e<13&&e>0||"Must be valid month"],year:[e=>!!e||"This Field Required",e=>e<=M&&e>0||"Must be in past",e=>e>M-130||"Must be valid age range"]},a=w({day:null,month:null,year:null}),d=C({years:null,months:null,days:null}),K=e=>{const{month:t}=a.value;return!!(t===2&&e<30&&e>0||t%2&&e<32&&e>0||0<e&&e<31)},i=()=>{try{if(!f.value.validate())return;const{day:e,month:t,year:o}=a.value,u=new Date(o,t-1,e),{years:c,months:r,days:n}=x(u);d.years=c,d.months=r,d.days=n}catch(e){console.error(e)}};function k(e,t){return new Date(e,t+1,0).getDate()}const x=e=>{const t=new Date,o=e.getFullYear(),u=e.getMonth(),c=e.getDate(),r=t.getFullYear(),n=t.getMonth(),m=t.getDate();let g=r-o,s=n-u,y=m-c;if((s<0||s===0&&y<0)&&(g--,s+=12),y<0){const R=n===0?11:n-1,A=n===0?r-1:r,B=k(A,R);y+=B,s--}return s<0&&(s+=12,g--),{years:g,months:s,days:y}};return(e,t)=>{const o=h("a-input"),u=h("a-form"),c=h("a-btn"),r=h("animated-number");return _(),D("div",$,[l(u,{ref_key:"formRef",ref:f},{default:V(()=>[p("div",z,[l(o,{modelValue:a.value.day,"onUpdate:modelValue":t[0]||(t[0]=n=>a.value.day=n),label:"Day",placeholder:"DD",type:"number",rules:v.day,onKeydown:b(i,["enter"])},null,8,["modelValue","rules","onKeydown"]),l(o,{modelValue:a.value.month,"onUpdate:modelValue":t[1]||(t[1]=n=>a.value.month=n),label:"Month",placeholder:"MM",type:"number",rules:v.month,onKeydown:b(i,["enter"])},null,8,["modelValue","rules","onKeydown"]),l(o,{modelValue:a.value.year,"onUpdate:modelValue":t[2]||(t[2]=n=>a.value.year=n),label:"Year",placeholder:"YYYY",type:"number",rules:v.year,onKeydown:b(i,["enter"])},null,8,["modelValue","rules","onKeydown"])])]),_:1},512),p("div",H,[L,l(c,{onClick:i})]),p("div",P,[(_(!0),D(T,null,q(d,(n,m)=>(_(),N(r,{key:m,number:n},{default:V(()=>[U(E(m),1)]),_:2},1032,["number"]))),128))])])}}},j={class:"container"},J={__name:"HomeView",setup(Y){return(f,F)=>(_(),D("div",j,[l(I(S))]))}};export{J as default};
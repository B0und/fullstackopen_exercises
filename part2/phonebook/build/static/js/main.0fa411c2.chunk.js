(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n(14),a=n.n(r),o=n(3),u=n(0);var i=function(e){var t=e.onFilterChange;return Object(u.jsxs)("div",{children:["search names: ",Object(u.jsx)("input",{onChange:t})]})};var s=function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Add new contact"}),Object(u.jsxs)("form",{onSubmit:e.addNumber,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{onChange:e.onNameChange})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{onChange:e.onNumberChange})]}),Object(u.jsx)("button",{type:"submit",children:"add"})]})]})},d=function(e){var t=e.persons,n=e.deleteHandler;return Object(u.jsx)("div",{children:t.map((function(e){return Object(u.jsxs)("div",{children:[Object(u.jsxs)("p",{children:[e.name," ",e.number]}),Object(u.jsx)("button",{personid:e.id,onClick:n,children:"Delete"})]},e.name)}))})},l=n(4),j=n.n(l),b="https://salty-forest-07666.herokuapp.com/api/persons",f={getAll:function(){return j.a.get(b).then((function(e){return e.data}))},create:function(e){return j.a.post(b,e).then((function(e){return e.data}))},update:function(e,t){return j.a.put("".concat(b,"/").concat(e),t).then((function(e){return e.data}))},deletePerson:function(e){return j.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))}},h=function(e){var t=e.message,n=e.messageStyle;return null===t?null:Object(u.jsx)("div",{style:n,children:t})},m=function(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(""),l=Object(o.a)(a,2),j=l[0],b=l[1],m=Object(c.useState)(""),O=Object(o.a)(m,2),p=O[0],g=O[1],v=Object(c.useState)(!0),x=Object(o.a)(v,2),S=x[0],w=x[1],y=Object(c.useState)(""),C=Object(o.a)(y,2),k=C[0],N=C[1],A=Object(c.useState)(""),D=Object(o.a)(A,2),F=D[0],I=D[1],P=Object(c.useState)({}),z=Object(o.a)(P,2),E=z[0],H=z[1];Object(c.useEffect)((function(){f.getAll().then((function(e){r(e)}))}),[]);var J=S?n:n.filter((function(e){return e.name.toLowerCase().startsWith(k.toLowerCase())})),L={color:"green",fontStyle:"italic",fontSize:22,padding:20},R={color:"red",fontStyle:"bold",fontSize:22,padding:20};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(h,{message:F,messageStyle:E}),Object(u.jsx)(i,{onFilterChange:function(e){N(e.target.value),0!==k.length?w(!0):w(!1)}}),Object(u.jsx)(s,{addNumber:function(e){e.preventDefault();var t,c={name:j,number:p};if(t=j,n.some((function(e){return e.name===t}))){if(window.confirm(" ".concat(j," already in phonebook, replace the old number with a new one?"))){var a=n.find((function(e){return e.name===j})).id;f.update(a,c).then((function(e){r(n.map((function(t){return t.id===a?e:t}))),H(L),I("Replaced number for ".concat(j))})).catch((function(e){I("".concat(j," already deleted from server")),H(R),setTimeout((function(){I(null)}),5e3)}))}return Object(u.jsx)(u.Fragment,{})}f.create(c).then((function(e){b(""),g(""),r(n.concat(e)),H(L),I("Added ".concat(j))}))},onNameChange:function(e){b(e.target.value)},onNumberChange:function(e){g(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(d,{persons:J,deleteHandler:function(e){var t=parseInt(e.target.attributes.getNamedItem("personid").value),c=n.find((function(e){return e.id===t}));window.confirm("Do you really want to delete ".concat(c.name,"?"))&&(f.deletePerson(t),r(n.filter((function(e){return e.id!==t}))),H(L),I("Removed ".concat(c.name)))}})]})};a.a.render(Object(u.jsx)(m,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.0fa411c2.chunk.js.map
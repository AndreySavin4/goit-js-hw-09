const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),end:document.querySelector("button[data-stop]")};let e=0;t.start.addEventListener("click",(function(d){t.start.setAttribute("disabled",!0),t.end.removeAttribute("disabled",!1),e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.end.addEventListener("click",(function(d){t.start.removeAttribute("disabled"),t.end.setAttribute("disabled",!1),clearInterval(e)})),t.end.setAttribute("disabled",!0);
//# sourceMappingURL=01-color-switcher.8c4bf22d.js.map

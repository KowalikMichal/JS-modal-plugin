const style = (function() {
	const style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style;
})();

style.sheet.insertRule(`.modal {display: block;position: fixed;z-index: 1000;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);}`, 0);
style.sheet.insertRule(`.modal-content{display: flex;flex-direction: column;height: 300px;width: 600px;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);box-sizing: border-box;animation-name: animatetop;animation-duration: 0.4s}`, 1);
style.sheet.insertRule(`@keyframes animatetop{from{top:-300px; opacity:0}to {top:0; opacity:1}}`, 2);
style.sheet.insertRule(`.modal-header{flex: 20%;background-color: #003B6F;color: white;padding-left: 20px;}`,3);
style.sheet.insertRule(`.modal-body{flex: 60%;	padding-left: 20px;}`,4);
style.sheet.insertRule(`.modal-footer{color: white;flex: 20%;display: flex;justify-content: space-around;align-items: center;}`,5);
style.sheet.insertRule(`body.modal-open{overflow: hidden;position: fixed;}`,6);
style.sheet.insertRule(`.modal-footer button{box-sizing: border-box;border: none;cursor: pointer;padding: 2px;height: 60%;width: 40%;color: white;border-radius: 2px;transition-duration: 0.4s;}`,7)
style.sheet.insertRule(`.modal-footer button:hover{box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);transform: scale(1.1);}`,8);
style.sheet.insertRule(`.modal-footer button:active{outline: none;}`,9);
style.sheet.insertRule(`.modal-footer button[data-action="Cancel"]{background-color: #e85e6c;}`,10);
style.sheet.insertRule(`.modal-footer button[data-action="Accept"]{background-color: #47c9a2;}`,11);


(function(){
  Object.prototype.modal = function(userConfig){
	const self = this;
	const options = Object.assign({
	  title: "title",
	  text: "text",
	  time: 86400000,
	  destination: self,
	}, userConfig);

	if (options.destination == window){
		document.addEventListener("DOMContentLoaded", function(event) {
			options.destination = document.body;
			document.body.modal(options);
		});
		return null;
	}

	const lastDecision = JSON.parse(localStorage.getItem('modalgdpr'));
	if(options.time !== null && lastDecision !== null && lastDecision.timeAction+lastDecision.time > new Date().getTime()) return null;

	const title = document.createElement("h2");
		  title.textContent = options.title;
	const modalHeader = document.createElement("div");
		  modalHeader.classList.add('modal-header');
		  modalHeader.append(title);
	const modalText = document.createElement("p");
		  modalText.textContent = options.text;
	const modalBody = document.createElement("div");
		  modalBody.classList.add('modal-body');
		  modalBody.append(modalText);
	const buttonConfirm = document.createElement("button");
		  buttonConfirm.classList.add('button-confirm');
		  buttonConfirm.textContent = "Accept";
		  buttonConfirm.dataset.action = "Accept"
	const buttonDecline = document.createElement("button");
		  buttonDecline.classList.add('button-confirm');
		  buttonDecline.textContent = "Cancel";
		  buttonDecline.dataset.action = "Cancel";
	const modalFooter = document.createElement("div");
		  modalFooter.classList.add('modal-footer');
		  modalFooter.append(buttonConfirm);
		  modalFooter.append(buttonDecline);
	const modalContent = document.createElement("div");
		  modalContent.classList.add('modal-content');
		  modalContent.append(modalHeader);
		  if(options.text !== null) modalContent.append(modalBody);
		  modalContent.append(modalFooter);
	const modal = document.createElement("div");
		  modal.classList.add('modal');
		  modal.append(modalContent);

	options.destination.append(modal);
	document.body.classList.add('modal-open');
	modal.addEventListener('click', function(e){
		if (e.target.tagName.toLowerCase() === "button"){
			const modalgdpr = {
				timeAction: new Date().getTime(),
				action: e.target.dataset.action,
				time: options.time,
			}
			localStorage.setItem('modalgdpr',JSON.stringify(modalgdpr));
			this.style.display = "none";
			document.body.classList.remove('modal-open');
		}
	})
  }
}());

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
		options.destination == document.body;
		document.addEventListener("DOMContentLoaded", function(event) {
			document.body.modal()
		});
		return null;
	}


	const lastDecision = JSON.parse(localStorage.getItem('modalgdpr'));
	if(lastDecision !== null && lastDecision.timeAction+lastDecision.time > new Date().getTime()) return null;
	
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
		  buttonConfirm.textContent = "Confirm";
		  buttonConfirm.dataset.action = "confirm"
	const buttonDecline = document.createElement("button");
		  buttonDecline.classList.add('button-confirm');
		  buttonDecline.textContent = "Decline";
		  buttonDecline.dataset.action = "decline";
	const modalFooter = document.createElement("div");
		  modalFooter.classList.add('modal-footer');
		  modalFooter.append(buttonConfirm);
		  modalFooter.append(buttonDecline);
	const modalContent = document.createElement("div");
		  modalContent.classList.add('modal-content');
		  modalContent.append(modalHeader);
		  modalContent.append(modalBody);
		  modalContent.append(modalFooter);
	const modal = document.createElement("div");
		  modal.classList.add('modal');
		  modal.append(modalContent);
		  console.log(options.destination);
	options.destination.append(modal);
	document.body.classList.add('modal-open');
	modal.addEventListener('click', function(e){
		console.log(this)
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

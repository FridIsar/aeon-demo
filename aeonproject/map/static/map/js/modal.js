function prep_modal() {
  console.log("modal")
  // Get the modal
  var modal = document.getElementById("modal");

  // Get the button that opens the modal
  var btn = document.getElementById("btn");

  // Get the <span> element that closes the modal
  var span = document.getElementById("close-modal");
  var arrow = document.getElementById("return-modal");

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  arrow.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function openModal(title, content) {
  var modal = document.getElementById("modal");
  document.getElementById("modal-title").innerHTML = title;
  document.getElementById("modal-body").innerHTML = content;
  modal.style.display = "block";
}
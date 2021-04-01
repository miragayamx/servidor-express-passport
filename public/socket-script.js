const socket = io();
//TABLA EN TIEMPO REAL
const productsList = document.getElementById("datos");
const updateTabla = (data = [], htmlItem) => {
  const template = `
    <h1 class="display-4">Lista de productos</h1>
    {{#if existe}}
    <table class="table table-responsive table-dark table-striped">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody>
            {{#each lista}}
            <tr>
                <td>{{this.title}}</td>
                <td>${"$"}{{this.price}}</td>
                <td><img height="80" src={{this.thumbnail}} alt="#"></td>
            </tr>
            {{/each}}
        </tbody>
    </table>
    {{else}}
    <div class="alert alert-info" role="alert">
        No se encontraron productos
    </div>
    {{/if}}
  `;
  const theTemplate = Handlebars.compile(template);
  htmlItem.innerHTML = theTemplate(data);
};
document.getElementById("product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const { title, price, thumbnail } = event.target;
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("price", price.value);
  formData.append("thumbnail", thumbnail.files[0]);
  fetch("http://localhost:8080/api/productos/guardar/", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      socket.emit("getUpdate");
      title.value = "";
      price.value = "";
      thumbnail.value = "";
    })
    .catch((err) => {
      console.log(err);
      productsList.innerHTML = ` 
            <div class="alert alert-danger" role="alert">
                No se pudo realizar la operación
            </div>`;
    });
});
socket.on("update", (data) => {
  updateTabla(data, productsList);
});

//CHAT
const chatMessages = document.getElementById("chat-messages");
document.getElementById("chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const { email, message } = event.target;
  const chatMessage = {
    email: email.value,
    text: message.value,
  };
  socket.emit("setNewChatMessages", chatMessage);
});
socket.emit("getChatMessages");
socket.on("messages", (messages) => {
  const html = messages
    .map(
      (message) => `
        <div class="row">
            <div class="col">
                <p class="text-success fst-normal">
                    <span class="text-primary fw-bold">${message.email}</span>
                    <small class="fw-normal" style="color: #652A0E;">[${message.date}]</small>
                    : ${message.text}
                </p>
            </div>
        </div>
    `
    )
    .join("");
  chatMessages.innerHTML = html;
});
socket.on("chatInfo", (data) => {
  if (!!data.error) {
    return (chatMessages.innerHTML = ` 
      <div class="alert alert-danger" role="alert">
          ${data.error}
      </div>`);
  }
  chatMessages.innerHTML = ` 
      <div class="alert alert-info" role="alert">
          ${data.info}
      </div>`
});

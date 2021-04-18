const productos = require('./modelo/productosBD');


(async ()=>{
    await productos.createTable();
    // const lista = await productos.getProducts();
    // console.log(lista);
    // const item = await productos.getProduct('2');
    // console.log(item[0].title);
    // const createdItem = await productos.addProduct({
    //     title: 'titulo',
    //     price: 57,
    //     thumbnail: 'foto'
    // });
    // console.log(createdItem);
    // const updatedItem = await productos.updateProduct('15', {
    //     title: 'title',
    //     // price: 100,
    //     // thumbnail: 'foto'
    // });
    // console.log(updatedItem);
    // const deletedItem = await productos.deleteProduct('1');
    // console.log(deletedItem);
})()
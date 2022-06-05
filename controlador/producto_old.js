
//Arreglo para persistencia de datos
//
/* let productos=[
  {
    id:1,
    titulo:'Escuadra',
    precio:20000,
    thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png"
  },
  {
    id:2,
    titulo:'Lapiz',
    precio:50,
    thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png"
  },
  {
    id:3,
    titulo:'Calculadora',
    precio:5000,
    thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png"
  
  }
]
 */
let productos=[]
let prodHay=false

product=()=>productos

let ultId=productos.length



//console.log(`Tamaño del arreglo:${ultId}`)
//console.log(`Tamaño de la funcion arreglo:${product().length}`)

module.exports = {
  //Envia todos los productos
  //
  getProductos: (req, res) => {
    res.json({
      mensage: "Lista de Productos de la BD",
      productos,
     
    });
  },
  //Envia todos los productos a la Grilla
  //motor HandleBar
  getMotorHbsProductos: (req, res) => {

    /* res.json({
      mensage: "Lista de Productos de la BD",
      productos,
    }); */

    product=()=>productos
    
    if (product().length!=0){
      prodHay=true
    }

    res.render('main',
            {titulo:'Renderizado de Productos Usando Motor Handlebars',
             prod:product(),
             prodHay
    })

  },

  //Envia todos los productos a la Grilla
  //motor Pug
  getMotorPugProductos: (req, res) => {

    /* res.json({
      mensage: "Lista de Productos de la BD",
      productos,
    }); */
    
    if (productos.length!=0){
      prodHay=true
    }

    res.render('index',{
      tituloP:"Motor Pug",
      titulo:"Renderizado de Productos Usando Motor Pug",
      cantidad:productos.length,
      produHay:prodHay,
      produ:productos
    })
  },

  //Envia todos los productos a la Grilla
  //motor EJs
  getMotorEjsProductos: (req, res) => {

    /* res.json({
      mensage: "Lista de Productos de la BD",
      productos,
    }); */
    
    if (productos.length!=0){
      prodHay=true
    }

    res.render('index',{
      tituloP:"Motor EJs",
      titulo:"Listado de Productos",
      cantidad:productos.length,
      produHay:prodHay,
      produ:productos
    })
  },

  //Envia un producto por id
  //
  getProducto: (req, res, next) => {
    const { id } = req.params;
    let idS=false

    productos.forEach((producto , i )=>{
      if ( producto.id === Number(id)){
         idS=true
      }              
    });

    if (!idS) {
      const error = new Error(`(get)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;

      return next(error);  
    }
    

    const producto = productos[id-1];
    res.json({
      mensage: `Producto con id:${id}`,
      producto,
    });
  },

  //Agrega un producto
  //
  postProducto: (req, res) => {
    const { titulo, precio, thumbnail } = req.body;

    ultId = ultId + 1;

    let producto = {
      id: ultId,
      titulo,
      precio,
      thumbnail,
    };
    productos.push(producto);
    res.json({
      mensage: `Se agregó el producto con id:${ultId}`,
      producto,
    });
  },

  //Agrega un producto desde un formulario
  //
  postFormProducto: (req, res) => {
    const { titulo, precio, thumbnail } = req.body;
    ultId = ultId + 1;
    let producto = {
      id: ultId,
      titulo,
      precio,
      thumbnail,
    };
    productos.push(producto);
    /* res.json({
      mensage: `Se agregó el producto con id:${ultId} desde un formulario`,
      producto,
    }); */

    res.redirect('/');
  },

  //Modifica un producto
  //
  putProducto: (req, res,next) => {
    const { id } = req.params;
    const { titulo, precio, thumbnail } = req.body;

    let idS=false

    let producto = {
      id: id,
      titulo,
      precio,
      thumbnail,
    };

    productos.forEach((producto , i )=>{
      if ( producto.id === Number(id)){
           productos[i].titulo=titulo
           productos[i].precio=precio
           productos[i].thumbnail=thumbnail
           idS=true
      }              
    });

    if (!idS) {
      const error = new Error(`(put)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se modificó el producto con id:${id}`,
      producto
    });
  },

  //Borrar un producto
  //
  deleteProducto: (req, res,next) => {
    const { id } = req.params;

    let idS=false
   
    let producto
    productos.forEach((prod, i)=>{
      if(prod.id === Number(id)){
        producto = {
          id: id,
          titulo:prod.titulo,
          precio:prod.precio,
          thumbnail:prod.thumbnail
        };
         productos.splice(i,1)
         idS=true
      }
    });

    if (!idS) {
      const error = new Error(`(delete)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se borró el producto con id:${id}`,
      producto
    });
  },

    //métodos para websoket
    //


};
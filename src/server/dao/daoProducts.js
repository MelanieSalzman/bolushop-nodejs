import Product from '../models/Product.js'


function getProductsDAOLocal() {

    async function create(ProductToBeCreated) {

        const ProductCreated = new Product({
            name: ProductToBeCreated.name,
            price: ProductToBeCreated.price,
            description: ProductToBeCreated.description,
            details: ProductToBeCreated.details,
            web: ProductToBeCreated.web,
        })

        return ProductCreated
    }   

  

    async function findAll() {

        const product = Product.find({});
        return product
    }

    async function save(product) {
       console.log('este es el producto que llega a save',product)
        product.save()
    }

    
     async function findById(ProductId) {

        const product = Product.findById(ProductId);
        return product
    }

    async function replaceProduct(id, product){

        const productReplaced = Product.findOneAndUpdate({_id: id}, {
            name: product.name,
            price: product.price,
            description: product.description,
            details: product.details,
            web: product.web,
        });
        return productReplaced
    }


    async function deleteOne(id){
        const product = Product.findOneAndDelete({_id: id});
        return product
    }

    async function deleteAll(){
        const product = Product.deleteMany({})
        return product
    }

    return {
        create,
        findById,
        findAll,
        save,
        replaceProduct,
        deleteOne,
        deleteAll
    }
}

export {
    getProductsDAOLocal
}
















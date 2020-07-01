import Product from '../models/Product.js'


function getProductsDAOLocal() {

    async function create(ProductToBeCreated,userId) {

        const ProductCreated = new Product({
            name: ProductToBeCreated.name,
            price: ProductToBeCreated.price,
            description: ProductToBeCreated.description,
            details: ProductToBeCreated.details,
            web: ProductToBeCreated.web,
            user: userId,
            rating: ProductToBeCreated.rating
            
        })

        return ProductCreated
    }   

  

    async function findAll() {

        const product = Product.find({});
        return product
    }

    async function findProductsByUser(userId) {

        const product = Product.find({ user: userId })
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
            rating : product.rating
           
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

    async function addPositive(id){

        const product = Product.findByIdAndUpdate({_id: id}, {$inc: { rating: 1} });

        
        return product

   }


    return {
        create,
        findById,
        findAll,
        save,
        replaceProduct,
        deleteOne,
        deleteAll,
        findProductsByUser,
        addPositive
    }
}

export {
    getProductsDAOLocal
}
















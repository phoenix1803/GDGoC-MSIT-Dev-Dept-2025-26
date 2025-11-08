class CrudRepository {
    constructor(model){
        this.model = model;
    }
    async create(data){
        console.log(this.model)
        const response = await this.model.create(data);
        return response;
    }
    async getAll(){
        const data = await this.model.findAll();
        return data;
    }
    async destroy(id){
        const response = await this.model.destroy({
            where : {
                id : id
            }
        });
        return response;
    }
    async get(id){
        const response = await this.model.findByPk(id);
        return response;
    }
    async update(id , data){
        const response = await this.model.update(data,{
            where :{
                id : id
            }
        })
        return response;
    }
}

module.exports = CrudRepository;
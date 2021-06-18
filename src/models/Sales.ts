import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { AndressDeliverySales } from './AndressDeliverySales';
import { ProductSale } from './ProductSale';


@Entity('table_store_sales')
class Sales{

    @PrimaryGeneratedColumn('uuid')
    @Generated("uuid")
    id_sales: string;

    @Column({name: 'value_total_sales', type: 'float'})
    value_total_sales: number;

    @Column({name: 'status_sales', type: 'varchar'})
    status_sales: string;

    @Column({name: 'name_client_sales', type: 'varchar'})
    name_client_sales: string;
    
    @Column({name: 'cpf_client_sales', type: 'varchar'})
    cpf_client_sales: string;
    
    @Column({name: 'id_user_sales', type: 'uuid'})
    id_user_sales: string;

    @Column()
    @CreateDateColumn()
    date_of_sales: Date;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => ProductSale, productSale => productSale.sales, {
        cascade: ['insert', 'update',]
    })
    @JoinColumn({name: 'id_sales'})
    productSale: ProductSale[];

    @OneToOne(() => AndressDeliverySales, andressDeliverySales => andressDeliverySales.sales, {
        cascade: ['insert', 'remove']
    })
    andressDeliverySales: AndressDeliverySales;


    constructor(){
        if(!this.id_sales){
            this.id_sales = uuid();
        }
    }
}

export { Sales };
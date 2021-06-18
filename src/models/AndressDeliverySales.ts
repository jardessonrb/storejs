import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Sales } from './Sales';

@Entity('table_andress_delivery_sales')
class AndressDeliverySales{

    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id_andress_delivery_sales: string;

    @Column({name: 'city_delivery_sales', type: 'varchar'})
    city_delivery_sales: string;
    
    @Column({name: 'state_delivery_sales', type: 'varchar'})
    state_delivery_sales: string;
    
    @Column({name: 'street_delivery_sales', type: 'varchar'})
    street_delivery_sales: string;
    
    @Column({name: 'number_house_delivery_sales', type: 'int'})
    number_house_delivery_sales: number;
    
    @Column({name: 'district_delivery_sales', type: 'varchar'})
    district_delivery_sales: string;
    
    @Column({name: 'cep_delivery_sales', type: 'varchar'})
    cep_delivery_sales: string;
    
    @Column({name: 'apartment_delivery_sales', type: 'varchar'})
    apartment_delivery_sales: string;
    
    @Column({name: 'complement_delivery_sales', type: 'varchar'})
    complement_delivery_sales: string;

    @Column({name: 'id_sales', type: 'varchar'})
    id_sales: string;

    @Column({name: 'created_at'})
    @CreateDateColumn()
    created_at: Date;
    
    @OneToOne(() => Sales, sales => sales.andressDeliverySales)
    @JoinColumn({name: 'id_sales'})
    sales: Sales;
    
    constructor(){
        if(!this.id_andress_delivery_sales){
            this.id_andress_delivery_sales = uuid();

        }
    }
}

export { AndressDeliverySales };
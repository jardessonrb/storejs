import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn, 
    Generated, 
    CreateDateColumn 
} from 'typeorm';
import { Product } from './Product';


@Entity('table_images_products')
class ImageProduct{

    @PrimaryGeneratedColumn()
    id_image: number;

    @Column({name: 'path_image', type: 'varchar'})
    path_image: string;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({name: 'id_product'})
    product: Product;

    @Column()
    @CreateDateColumn()
    created_at: Date;
}


export { ImageProduct };
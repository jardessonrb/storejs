import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn } from 'typeorm';

@Entity('table_store_users')
class User{
    
    @PrimaryGeneratedColumn("uuid")
    @Generated("uuid")
    id_user: string;

    @Column()
    name_user: string;

    @Column()
    email_user: string;

    @Column()
    password_user: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

}


export { User };
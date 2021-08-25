import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User>{

  async isExistsEmail(email_user: string): Promise<boolean> {
    try {
      const emailExists = await this.find({select: ["email_user"], where: {email_user: email_user}});
      if(emailExists.length === 0){
        return false;
      }
      return true;

    } catch (error) {
      throw error;
    }

  }
}

export { UserRepository };

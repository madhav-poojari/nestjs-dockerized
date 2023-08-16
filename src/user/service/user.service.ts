import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    add(user: UserI): Observable<UserI> {
        return from(this.userRepository.save(user));
    }
    async hasUserLikedContent(user_id: string, content_id: string): Promise<boolean> {
        const likeEvent = await this.userRepository.findOne({ user_id, content_id });
        return !!likeEvent;
      }
    findAll(): Observable<UserI[]> {
        return from(this.userRepository.find());
    }

}

import { CustomRepository } from '../common/decorators/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Mentions } from '../entities/Mentions';

@CustomRepository(Mentions)
export class MentionsRepository extends Repository<Mentions> {
  async createMention(
    category: 'chat' | 'dm' | 'system',
    WorkspaceId: number,
    ChatId: number,
    SenderId: number,
    ReceiverId: number,
  ) {
    const mention = this.create({
      category,
      WorkspaceId,
      ChatId,
      SenderId,
      ReceiverId,
    });
    return await this.save(mention);
  }
}

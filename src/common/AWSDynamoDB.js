import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

// Use region specified in environment or default to ap-northeast-1
const REGION = process.env.AWS_REGION || 'ap-northeast-1';

export default class AWSDynamoDB {
  // singleton
  constructor(dbClient) {
    this.region = REGION;
    this.dbClient = dbClient;
  }

  static getInstance() {
    return this.instance || new this(new DynamoDB({ region: REGION }));
  }

  static destroyInstance() {
    delete this.instance;
  }

  async putItem(tableName, item) {
    await this.dbClient.putItem({
      TableName: tableName,
      Item: marshall(item),
    });
  }
}

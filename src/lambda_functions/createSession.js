import AWSDynamoDB from '../common/AWSDynamoDB';
import UserSession from '../common/UserSession';

const TABLE_NAME = 'UserSessions';

// eslint-disable-next-line import/prefer-default-export
export const lambdaHandler = async (event) => {
  // The input to the lambda function is the user event
  const sessionInfo = new UserSession(event.id, event).generateSessionInfo();
  const dbClient = AWSDynamoDB.getInstance();
  await dbClient.putItem(TABLE_NAME, sessionInfo);
  return sessionInfo;
};

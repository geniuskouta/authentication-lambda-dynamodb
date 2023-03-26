import AWSDynamoDB from '../common/AWSDynamoDB';

const TABLE_NAME = 'UserSessions';

// eslint-disable-next-line import/prefer-default-export
export const lambdaHandler = async (event) => {
  // The input to the lambda function is the user event
  const currentTime = Date.now();
  const key = { sessionId: event.sessionId };
  const dbClient = AWSDynamoDB.getInstance();

  const session = await dbClient.getItem(
    TABLE_NAME,
    key,
  );

  if (currentTime >= session.expires) {
    if (session.isActive) {
      // invalidate session if session is active and it is expired
      dbClient.updateItem(
        TABLE_NAME,
        key,
        {
          updateExpression: 'SET isActive = :isActive',
          expressionAttributeValues: {
            ':isActive': false,
          },
        },
      );

      // return update session info
      return { ...session, isActive: false };
    }
    return session;
  }

  const newExpires = currentTime + 1000 * 60 * 60 * 24 * 14; // 14 days from now
  // extend session
  dbClient.updateItem(
    TABLE_NAME,
    key,
    {
      updateExpression: 'SET expires = :expires',
      expressionAttributeValues: {
        ':expires': newExpires,
      },
    },
  );

  // return session info with new expiry date
  return { ...session, expires: newExpires };
};

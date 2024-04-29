import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { AppConfig, AppConfigKey } from './app-config';
import { S3Client } from '@aws-sdk/client-s3';
import OpenAI from 'openai';

export class ThirdPartyApps {
  private static instance: ThirdPartyApps | null = null;
  public readonly ddbClient: DynamoDBClient;
  public readonly s3Client: S3Client;
  public readonly openAI: OpenAI;
  public readonly generatedImageBucketName: string = 'client-image-bucket-id';
  public readonly clientImageBucketName: string = 'client-image-bucket-id';

  private constructor() {
    const region = AppConfig.getInstance().getValue(AppConfigKey.AWS_REGION);
    this.ddbClient = new DynamoDBClient({ region });
    this.s3Client = new S3Client({ region });
    this.openAI = new OpenAI(); // Assuming OpenAI class has its own initialization logic
  }

  public static getInstance(): ThirdPartyApps {
    if (!ThirdPartyApps.instance) {
      ThirdPartyApps.instance = new ThirdPartyApps();
    }
    return ThirdPartyApps.instance;
  }
}

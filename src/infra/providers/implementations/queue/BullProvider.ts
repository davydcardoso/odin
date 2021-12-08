import { Queue, Worker, Processor, QueueScheduler } from "bullmq";

import { redisConnection } from "../../../redis/connection";
import { IDeliverMessageJob } from "../../../../module/broadcasting/jobs/IDeliverMessageJob";

import { IMailQueueProvider } from "../../models/IMailQueueProviders";

export class BullProvider implements IMailQueueProvider {
  private queue: Queue;

  constructor() {
    this.queue = new Queue("odin.mail-queue", {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 50000,
        },
      },
    });
  }

  async addManyJobs(jobs: IDeliverMessageJob[]): Promise<void> {
    const parsedJobs = jobs.map((jobData) => {
      return { name: "message", data: jobData };
    });

    await this.queue.addBulk(parsedJobs);
  }

  async addJob(job: IDeliverMessageJob): Promise<void> {
    await this.queue.add("message", job);
  }

  process(processFunction: Processor<IDeliverMessageJob>): void {
    new Worker("odin.mail-queue", processFunction, {
      connection: redisConnection,
      concurrency: 100,
      limiter: {
        max: 400,
        duration: 1000,
      },
    });

    new QueueScheduler("odin.mail-queue", {
      connection: redisConnection,
    });
  }
}

import { IDeliverMessageJob } from "../../../../module/broadcasting/jobs/IDeliverMessageJob";
import { IMailQueueProvider, Job } from "../../models/IMailQueueProviders";

export class SyncQueueProviders implements IMailQueueProvider {
  public jobs: IDeliverMessageJob[] = [];

  constructor() {}

  async addManyJobs(jobs: IDeliverMessageJob[]): Promise<void> {
    this.jobs.push(...jobs);
  }

  async addJob(job: IDeliverMessageJob): Promise<void> {
    this.jobs.push(job);
  }

  process(processFunction: (job: Job) => Promise<void>): void {
    this.jobs.map((job, index) => {
      processFunction({ data: job });
      this.jobs.splice(index, 1);
    });
  }
}

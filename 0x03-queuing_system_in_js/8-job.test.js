import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './createPushNotificationsJobs';

describe('createPushNotificationsJobs', () => {
    let queue;

    beforeEach(() => {
        // Initialize the queue in test mode
        queue = kue.createQueue();
        queue.testMode.enter(); // Enable test mode to inspect job queue
    });

    afterEach(() => {
        // Clear queue and exit test mode
        queue.testMode.clear();
        queue.testMode.exit();
    });

    it('should display an error message if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs('not an array', queue)).to.throw(
            'Jobs is not an array'
        );
    });

    it('should create two new jobs in the queue', () => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'Hello World 1' },
            { phoneNumber: '0987654321', message: 'Hello World 2' },
        ];

        createPushNotificationsJobs(jobs, queue);

        // Assert job creation
        expect(queue.testMode.jobs.length).to.equal(2);

        // Validate individual job data
        const [job1, job2] = queue.testMode.jobs;
        expect(job1.type).to.equal('push_notification_code_3');
        expect(job1.data).to.deep.equal(jobs[0]);
        expect(job2.type).to.equal('push_notification_code_3');
        expect(job2.data).to.deep.equal(jobs[1]);
    });
});


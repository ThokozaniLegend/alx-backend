import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Define the job data
const jobData = {
  phoneNumber: '123-456-7890',
  message: 'This is a test notification message',
};

// Create a job in the 'push_notification_code' queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.log('Notification job failed to be created');
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Add event listeners for job completion and failure
job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});

